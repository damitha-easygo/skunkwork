# Kick Chat over MoQ — viewer

Static viewer that subscribes to live Kick chat delivered (end-to-end encrypted) over a
Cloudflare Media-over-QUIC relay. Open with `?channel=<slug>` (e.g. `?channel=deenthegreat`).

Live messages only appear while the publisher worker is bridging that channel; chat history
always loads from Kick's API. The embedded relay token is **subscribe-only** (read-only) and
the shared key is intentionally public (viewers decrypt; the relay only sees ciphertext).
