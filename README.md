# Jaarvi Learning App

A small web app that grows alongside the [learning roadmap](LEARNING_ROADMAP.md).

## Run locally

Create your local environment file from the safe template:

```bash
cp .env.example .env
```

Put real credentials only in `.env`; Git ignores that file. `.env.example` is safe to commit and documents the variable names. The current health-check app does not use `OPENAI_API_KEY` yet.

Start the API in one terminal:

```bash
python -m pip install -e ".[test]"
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 --env-file .env
```

To pass those variables to the Docker container, add `--env-file .env` when creating it:

```bash
docker run --name jaarvi-api --env-file .env -p 8000:8000 jaarvi-api
```

Start the React view in a second terminal (Node.js 24 or newer):

```bash
cd frontend
npm ci
npm run dev
```

Open the Vite address shown in the terminal, usually `http://localhost:5173`. The page calls FastAPI through Vite's `/api` proxy; the API endpoint is `http://localhost:8000/health`. Redis is not needed for this health check. Run both processes at once while developing.

## Run tests

```bash
python -m pytest
```

GitHub Actions runs the Python tests and checks and builds the frontend on every push and pull request.
