# cloakbrowser-fly 🚀

Self-hosted **cloakbrowser** on [Fly.io](https://fly.io) — fully automatic via GitHub Actions.

No manual steps after setup. Push → Deploy.

## ✨ Features

- 🛰️ Auto-deploy on every `git push` to `main`
- 🛡️ No auto-suspend (24/7 uptime)
- 🔐 Secret env vars via Fly.io + GitHub
- 📦 Optimized Docker image (Node.js 20 + Chrome)
- 🪶 Lightweight: 1 shared CPU, 256MB RAM

## 🚀 One-time setup

1. **Get Fly.io token** (already configured for `SINSQQ`)
2. **Push to main** — GitHub Action handles everything
3. Visit `https://cloakbrowser-fly.fly.dev`

## 📁 Project structure

```
cloakbrowser-fly/
├── fly.toml              # Fly.io config (no suspend)
├── Dockerfile            # Container build
├── .dockerignore
├── package.json          # cloakbrowser + ws server
├── server.js             # WS / HTTP server
├── start.sh              # Launch script
└── .github/workflows/
    └── deploy.yml        # CI/CD
```

## 🔧 Endpoints

- `GET  /`            — health check
- `GET  /health`      — `{status: "ok", uptime: N}`
- `WS   /ws`          — control channel (TODO)
- `GET  /browse?url=` — browse once (TODO)

## 📜 License

MIT
