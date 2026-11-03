# Jaarvi Learning App

A small web app that grows alongside the [learning roadmap](LEARNING_ROADMAP.md).

## Run locally

```bash
pipx install poetry
poetry install --with test
poetry run uvicorn jaarvi_app.main:app --reload
```

The health endpoint is available at `http://127.0.0.1:8000/health` and returns `{"status":"ok"}`.

## Run tests

```bash
poetry run python -m pytest --cov=jaarvi_app --cov-report=term-missing --cov-report=html
```

The terminal shows the coverage percentage and any uncovered lines. The detailed HTML report is at `htmlcov/index.html`.

GitHub Actions runs the tests with coverage on every push and pull request, then uploads the HTML report as a `coverage-report` artifact. Open the workflow run in the **Actions** tab, download that artifact, unzip it, and open the report's `index.html`.
