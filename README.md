# hello-cloudrun

Small Node.js HTTP service for the Ruph GCP Cloud Run deployment proof and the
RU-45 failover test.

- `GET /` (HTML page), `/assets/app.js`, `/health`, `/api/version`, `/readyz` return HTTP 200.
- All other paths return HTTP 404.
- There is no database: `/readyz` is a stand-in for the database check.
