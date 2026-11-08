"""HTTP application entry point."""

from fastapi import FastAPI, HTTPException, Query

from app.recipes import RecipeNotConfigured, RecipeRequest, RecipeResponse, generate_recipe

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


@app.post("/recipes/generate", response_model=RecipeResponse)
def create_recipe(request: RecipeRequest) -> RecipeResponse:
    """Research and adapt a one-serving recipe to the user's daily macro goals."""
    try:
        return generate_recipe(request)
    except RecipeNotConfigured as error:
        raise HTTPException(
            status_code=503,
            detail="Recipe generation is not configured on the server.",
        ) from error
    except Exception as error:
        raise HTTPException(
            status_code=502,
            detail="Recipe generation failed. Please try again later.",
        ) from error
