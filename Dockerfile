FROM python:3.12-slim

WORKDIR /backendapp

# Install runtime dependencies before copying source. Docker can reuse this
# layer as long as these requirements do not change.
RUN pip install --no-cache-dir \
    "deepagents>=0.7,<0.8" \
    "fastapi>=0.110,<1.0" \
    "langchain-openai>=1.7,<2.0" \
    "python-dotenv>=1.0,<2.0" \
    "uvicorn[standard]>=0.27,<1.0"

# Copy application source only after dependencies are installed so source edits
# do not invalidate the dependency layer.
COPY app ./app

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
