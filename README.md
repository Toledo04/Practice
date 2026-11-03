# Jaarvi Learning App

A small web app that grows alongside the [learning roadmap](LEARNING_ROADMAP.md).

## Run locally

```bash
python -m pip install -e ".[test]"
uvicorn jaarvi_app.main:app --reload
```

The health endpoint is available at `http://127.0.0.1:8000/health` and returns `{"status":"ok"}`.

## Run tests

```bash
python -m pytest
```

GitHub Actions runs this test suite on every push and pull request.
