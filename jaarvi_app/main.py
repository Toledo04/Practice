"""HTTP application entry point."""

from fastapi import FastAPI

app = FastAPI(title="Jaarvi Learning App")


@app.get("/health")
def health_check() -> dict[str, str]:
    """Report whether the service can answer requests."""
    return {"status": "ok"}
