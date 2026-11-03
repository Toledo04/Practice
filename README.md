# Jaarvi Learning App

A small web app that grows alongside the [learning roadmap](LEARNING_ROADMAP.md).

## Run locally

Start the API in one terminal:

```bash
python -m pip install -e ".[test]"
uvicorn jaarvi_app.main:app --reload --host 0.0.0.0 --port 8000
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
