// Kick popout chat over cacheable HTTP polling (the H3-poll comparison path).
// Instead of a push transport, the worker batches chat into wall-clock-aligned
// 2s buckets served at /chat/{slug}/{bucket}/br (brotli, immutable) — a
// deterministic URL every viewer shares, so a CDN collapses the fan-out. The
// open bucket streams events live (NDJSON + per-event brotli flush), so a message
// renders within ~RTT of ingest while the URL scheme stays CDN-cacheable.
// Channel metadata + history still come from Kick's REST API.

const KICK_API = 'https://kick.com/api/v2';
const MAX_MESSAGES = 200;

const messagesEl = document.getElementById('messages');
const pausedBtn = document.getElementById('scroll-paused');
const statusDot = document.getElementById('status-dot');
const statusText = document.getElementById('status-text');
const pinnedBar = document.getElementById('pinned-bar');
const pinnedContent = document.getElementById('pinned-content');
const chatInput = document.getElementById('chat-input');

let subscriberBadges = [];
let autoScroll = true;
const seenIds = new Set();

/* ---------------- helpers ---------------- */

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const BUILTIN_BADGES = {
  broadcaster:
    '<svg class="badge" viewBox="0 0 16 16"><rect width="16" height="16" rx="3" fill="#e0453a"/><path d="M8 3l1.4 2.8L12.5 6l-2.2 2.2.5 3.1L8 9.9l-2.8 1.4.5-3.1L3.5 6l3.1-.2L8 3z" fill="#fff"/></svg>',
  moderator:
    '<svg class="badge" viewBox="0 0 16 16"><rect width="16" height="16" rx="3" fill="#00c7b1"/><path d="M11.5 3.5L8.8 6.2l-.7-.7L5 8.6l2.4 2.4 3.1-3.1-.7-.7 2.7-2.7-1-1zM4.5 10.5l1 1L4 13l-1-1 1.5-1.5z" fill="#fff"/></svg>',
  vip: '<svg class="badge" viewBox="0 0 16 16"><rect width="16" height="16" rx="3" fill="#ff6bd6"/><path d="M3 5l2.5 2L8 4l2.5 3L13 5l-1 7H4L3 5z" fill="#fff"/></svg>',
  og: '<svg class="badge" viewBox="0 0 16 16"><rect width="16" height="16" rx="3" fill="#8a2be2"/><text x="8" y="11.5" font-size="8" font-weight="bold" text-anchor="middle" fill="#fff" font-family="Arial">OG</text></svg>',
  founder:
    '<svg class="badge" viewBox="0 0 16 16"><rect width="16" height="16" rx="3" fill="#f6b23c"/><path d="M8 2.5l1.8 3.6 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4L2.2 6.7l4-.6L8 2.5z" fill="#fff"/></svg>',
  verified:
    '<svg class="badge" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" fill="#53fc18"/><path d="M4.5 8.2l2.3 2.3 4.7-4.7-1.2-1.2-3.5 3.5-1.1-1.1-1.2 1.2z" fill="#000"/></svg>',
  staff:
    '<svg class="badge" viewBox="0 0 16 16"><rect width="16" height="16" rx="3" fill="#53fc18"/><text x="8" y="12" font-size="9" font-weight="bold" text-anchor="middle" fill="#000" font-family="Arial">K</text></svg>',
  sub_gifter:
    '<svg class="badge" viewBox="0 0 16 16"><rect width="16" height="16" rx="3" fill="#1475e1"/><path d="M3 7h10v2H3V7zm1 3h8v3.5H4V10zM3 5.5h10V7H3V5.5zM8 5.5v8" stroke="#fff" fill="#5aa0ff"/><path d="M7.5 5.5h1V13h-1z" fill="#fff"/></svg>',
};

function badgeHtml(sender) {
  const identity = sender.identity || {};
  const parts = [];
  const seen = new Set();
  for (const b of identity.badges_v2 || []) {
    if (b.image_url) {
      parts.push(`<img class="badge" src="${esc(b.image_url)}" alt="${esc(b.name || '')}" title="${esc(b.name || '')}">`);
      seen.add(b.name);
    }
  }
  for (const b of identity.badges || []) {
    if (seen.has(b.type)) continue;
    if (b.type === 'subscriber' && subscriberBadges.length) {
      let img = subscriberBadges[0];
      for (const sb of subscriberBadges) if ((b.count || 1) >= sb.months) img = sb;
      parts.push(`<img class="badge" src="${esc(img.badge_image.src)}" alt="Subscriber" title="${esc(b.text || 'Subscriber')} (${b.count || 1} months)">`);
    } else if (BUILTIN_BADGES[b.type]) {
      parts.push(BUILTIN_BADGES[b.type].replace('<svg', `<svg title="${esc(b.text || b.type)}"`));
    }
  }
  return parts.join('');
}

function contentHtml(content) {
  let html = '';
  let last = 0;
  const re = /\[emote:(\d+):([^\]]*)\]/g;
  let m;
  while ((m = re.exec(content))) {
    html += textHtml(content.slice(last, m.index));
    html += `<img class="emote" src="https://files.kick.com/emotes/${m[1]}/fullsize" alt="${esc(m[2])}" title="${esc(m[2])}">`;
    last = m.index + m[0].length;
  }
  html += textHtml(content.slice(last));
  return html;
}

function textHtml(text) {
  if (!text) return '';
  let html = esc(text);
  html = html.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
  html = html.replace(/(^|\s)(@[A-Za-z0-9_]+)/g, '$1<span class="mention">$2</span>');
  return html;
}

/* ---------------- rendering ---------------- */

function isAtBottom() {
  return messagesEl.scrollHeight - messagesEl.scrollTop - messagesEl.clientHeight < 40;
}
function scrollToBottom() {
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function renderMessage(msg) {
  const div = document.createElement('div');
  div.className = 'msg';
  div.dataset.id = msg.id;
  div.dataset.userId = msg.sender?.id ?? '';

  let html = '';
  const meta = typeof msg.metadata === 'string' ? safeParse(msg.metadata) : msg.metadata;
  const orig = meta?.original_message;
  if (orig?.content) {
    const origSender = meta.original_sender?.username || '';
    html +=
      `<div class="reply-line">` +
      `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M10 9V5l-7 7 7 7v-4c5 0 8.5 1.6 11 5-1-5-4-10-11-11Z"/></svg>` +
      `<span>Replying to ${esc(origSender)}: ${esc(orig.content.replace(/\[emote:\d+:([^\]]*)\]/g, '$1'))}</span></div>`;
  }

  const sender = msg.sender || {};
  const color = sender.identity?.color || '#a8a8a8';
  html += badgeHtml(sender);
  html += `<span class="uname" style="color:${esc(color)}">${esc(sender.username || '?')}</span>`;
  html += `<span>: </span><span class="body-text">${contentHtml(msg.content || '')}</span>`;

  div.innerHTML = html;
  return div;
}

function safeParse(s) {
  try { return JSON.parse(s); } catch { return null; }
}

function appendMessage(msg) {
  if (msg.id) {
    if (seenIds.has(msg.id)) return;
    seenIds.add(msg.id);
    if (seenIds.size > 2000) for (const id of [...seenIds].slice(0, 1000)) seenIds.delete(id);
  }
  const stick = autoScroll && isAtBottom();
  messagesEl.appendChild(renderMessage(msg));
  while (messagesEl.children.length > MAX_MESSAGES) messagesEl.firstChild.remove();
  if (stick || autoScroll) scrollToBottom();
}

function appendSystem(text) {
  const div = document.createElement('div');
  div.className = 'msg system';
  div.textContent = text;
  messagesEl.appendChild(div);
  if (autoScroll) scrollToBottom();
}

function setStatus(state, text) {
  statusDot.className = state;
  statusText.textContent = text;
}

/* ---------------- scroll pause ---------------- */

messagesEl.addEventListener('scroll', () => {
  if (isAtBottom()) {
    autoScroll = true;
    pausedBtn.classList.add('hidden');
  } else {
    autoScroll = false;
    pausedBtn.classList.remove('hidden');
  }
});

pausedBtn.addEventListener('click', () => {
  autoScroll = true;
  pausedBtn.classList.add('hidden');
  scrollToBottom();
});

/* ---------------- pinned message ---------------- */

function showPinned(pin) {
  const msg = pin?.message || pin;
  if (!msg?.content) return;
  pinnedContent.innerHTML =
    `<span class="u" style="color:${esc(msg.sender?.identity?.color || '#a8a8a8')}">${esc(msg.sender?.username || '')}</span>: ` +
    contentHtml(msg.content);
  pinnedBar.classList.remove('hidden');
}

document.getElementById('pinned-close').addEventListener('click', () => pinnedBar.classList.add('hidden'));

/* ---------------- pusher event dispatch (same shapes as the WS version) ---------------- */

function handlePusherFrame(frame) {
  const data = typeof frame.data === 'string' ? safeParse(frame.data) : frame.data;
  switch (frame.event) {
    case 'App\\Events\\ChatMessageEvent':
      appendMessage(data);
      break;
    case 'App\\Events\\MessageDeletedEvent': {
      const el = messagesEl.querySelector(`[data-id="${CSS.escape(data?.message?.id || '')}"]`);
      if (el) el.classList.add('deleted');
      break;
    }
    case 'App\\Events\\UserBannedEvent': {
      for (const el of messagesEl.querySelectorAll(`[data-user-id="${CSS.escape(String(data?.user?.id ?? ''))}"]`)) {
        el.classList.add('deleted');
      }
      break;
    }
    case 'App\\Events\\ChatroomClearEvent':
      messagesEl.innerHTML = '';
      appendSystem('Chat was cleared by a moderator');
      break;
    case 'App\\Events\\PinnedMessageCreatedEvent':
      showPinned(data);
      break;
    case 'App\\Events\\PinnedMessageDeletedEvent':
      pinnedBar.classList.add('hidden');
      break;
  }
}

/* ---------------- poll loop ---------------- */

// Ingest→render latency over the last 100 events (worker stamps `t` at ingest).
const latencies = [];
function noteLatency(ms) {
  latencies.push(ms);
  if (latencies.length > 100) latencies.shift();
  const sorted = [...latencies].sort((a, b) => a - b);
  const avg = Math.round(latencies.reduce((s, v) => s + v, 0) / latencies.length);
  const p95 = Math.round(sorted[Math.floor(sorted.length * 0.95)] ?? sorted[sorted.length - 1]);
  setStatus('live', `Live via poll — avg ${avg}ms / p95 ${p95}ms ingest→render (n=${latencies.length})`);
}

async function syncClock(base) {
  // Sample 3x and keep the min-RTT estimate: the first request pays the
  // DNS/QUIC/TLS handshake, which skews the midpoint method by ~half the
  // handshake time; warm-connection samples are accurate.
  let best = null;
  let batchMs = 500;
  for (let i = 0; i < 3; i++) {
    const t0 = Date.now();
    const ep = await fetch(`${base}/chat/epoch`).then((r) => r.json());
    const t1 = Date.now();
    batchMs = ep.batchMs;
    if (!best || t1 - t0 < best.rtt) best = { rtt: t1 - t0, offset: ep.now - (t0 + t1) / 2 };
  }
  return { offset: best.offset, batchMs };
}

async function runPoll(base, slug) {
  for (;;) {
    // (Re)sync loop — only re-runs on repeated failures.
    try {
      setStatus('', 'Syncing clock…');
      const { offset, batchMs } = await syncClock(base);
      const nowBucket = () => Math.floor((Date.now() + offset) / batchMs);
      let bucket = nowBucket(); // start on the open bucket — the server long-polls it
      let gotAny = false;
      let failures = 0;
      setStatus('', 'Polling…');

      for (;;) {
        const url = `${base}/chat/${slug}/${bucket}/br`;
        let res;
        try {
          res = await fetch(url);
        } catch {
          if (++failures >= 3) throw new Error('poll transport failing');
          setStatus('dead', 'Poll failed, retrying…');
          await new Promise((r) => setTimeout(r, 1000));
          continue;
        }
        failures = 0;
        if (res.status === 410) { bucket = nowBucket(); continue; } // fell behind, resync
        if (res.status === 425) { await new Promise((r) => setTimeout(r, 300)); continue; } // ran ahead
        if (!res.ok) { await new Promise((r) => setTimeout(r, 1000)); continue; }
        if (!gotAny) { gotAny = true; setStatus('live', 'Live via poll'); }
        // NDJSON stream: the open bucket delivers each event the moment it arrives
        // (the browser decompresses `content-encoding: br` progressively), so render
        // per line instead of waiting for the response to finish.
        const handleLine = (line) => {
          if (!line.trim()) return;
          const ev = safeParse(line);
          if (!ev) return;
          const parsed = safeParse(ev.e);
          if (parsed) handlePusherFrame(parsed);
          noteLatency(Date.now() + offset - ev.t);
        };
        const reader = res.body.getReader();
        const dec = new TextDecoder();
        let leftover = '';
        for (;;) {
          const { done, value } = await reader.read();
          if (value) {
            leftover += dec.decode(value, { stream: true });
            let nl;
            while ((nl = leftover.indexOf('\n')) >= 0) {
              handleLine(leftover.slice(0, nl));
              leftover = leftover.slice(nl + 1);
            }
          }
          if (done) break;
        }
        handleLine(leftover);
        bucket++;
        // Sealed backlog drains instantly; the open bucket streams until its boundary.
      }
    } catch (e) {
      console.warn('poll loop failed', String(e).slice(0, 120));
      setStatus('dead', 'Poll reconnecting…');
      await new Promise((r) => setTimeout(r, 1500));
    }
  }
}

/* ---------------- send box (read-only) ---------------- */

function sendAttempt() {
  if (!chatInput.value.trim()) return;
  appendSystem('This is a read-only replica — sending messages requires signing in on kick.com.');
  chatInput.value = '';
}
document.getElementById('send-btn').addEventListener('click', sendAttempt);
chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') sendAttempt();
});

/* ---------------- boot ---------------- */

async function boot() {
  const params = new URLSearchParams(location.search);
  const slug = (params.get('channel') || location.hash.replace(/^#/, '') || '').trim().toLowerCase();
  if (!slug) {
    appendSystem('No channel slug. Use ?channel={slug} or #{slug}');
    return;
  }
  document.title = `${slug} — Chat (Poll)`;

  // Poll base: ?poll= param overrides the worker-shared config (GitHub Pages build).
  let config = {};
  try {
    config = await fetch('./moq-config.json', { cache: 'no-store' }).then((r) => (r.ok ? r.json() : {}));
  } catch {}
  const base = (params.get('poll') || config.poll_base || '').replace(/\/$/, '');
  if (!base) {
    setStatus('dead', 'Missing poll config');
    appendSystem('Missing poll endpoint — set poll_base in moq-config.json or pass ?poll=');
    return;
  }

  // Channel metadata + history straight from Kick (the poll path only carries live messages).
  try {
    const res = await fetch(`${KICK_API}/channels/${encodeURIComponent(slug)}`);
    if (res.ok) {
      const channel = await res.json();
      document.title = `${channel.user?.username || slug} — Chat (Poll)`;
      subscriberBadges = (channel.subscriber_badges || []).slice().sort((a, b) => a.months - b.months);
      const hist = await fetch(`${KICK_API}/channels/${channel.id}/messages`).then((r) => r.json());
      const msgs = (hist.data?.messages || []).slice().reverse();
      for (const m of msgs) {
        if (m.id) seenIds.add(m.id);
        messagesEl.appendChild(renderMessage(m));
      }
      scrollToBottom();
      if (hist.data?.pinned_message) showPinned(hist.data.pinned_message);
    }
  } catch {
    appendSystem('Could not load channel metadata/history from kick.com (live poll feed unaffected).');
  }

  runPoll(base, slug);
}

boot();
