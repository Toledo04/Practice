# Jaarvi Learning App

A small web app that grows alongside the [learning roadmap](LEARNING_ROADMAP.md).

## Run locally

Create your local environment file from the safe template:

```bash
cp .env.example .env
```

Put real credentials only in `.env`; Git ignores that file. `.env.example` is safe to commit and documents the variable names.

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

Open the Vite address shown in the terminal, usually `http://localhost:5173`. The page calls FastAPI through Vite's `/api` proxy. The health endpoint is `http://localhost:8000/health`; recipe generation is `POST http://localhost:8000/recipes/generate`. The API reads `OPENAI_API_KEY` and optional `OPENAI_MODEL` from the environment. `MODEL_NAME` is also accepted as a model-name fallback for an existing local setup.

## Recipe feature architecture

The React form sends a validated JSON request to FastAPI. The route calls a lazily created Deep Agent, which uses OpenAI's built-in web-search tool to research a recipe and returns data shaped by a Pydantic schema. Deep Agents supplies the agent harness and builds its runnable as a LangGraph graph; LangChain's OpenAI integration supplies the model. FastAPI calculates the displayed percentage of each daily macro target from the agent's estimated macros, so the percentage math is deterministic even though nutrition estimates are approximate.

Macro inputs are daily gram targets. The generated recipe is one serving and should contribute a reasonable portion of those goals, roughly one third as a starting point. It does not promise exact nutrition values.

## Run tests

```bash
python -m pytest
```

GitHub Actions runs the Python tests and checks and builds the frontend on every push and pull request.
