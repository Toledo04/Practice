"""HTTP application entry point."""

from fastapi import FastAPI, Query

app = FastAPI(title="Jaarvi Learning App")


@app.get("/health")
def health_check() -> dict[str, str]:
    """Report whether the service can answer requests."""
    return {"status": "ok"}


@app.get("/greeting")
def get_greeting(
    name: str = Query(default="there", min_length=1, max_length=50),
) -> dict[str, str]:
    """Return a greeting, optionally personalized with a name."""
    return {"message": f"Hello, {name}!"}
