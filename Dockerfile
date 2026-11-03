FROM python:3.12-slim

WORKDIR /app

# Install runtime dependencies before copying source. Docker can reuse this
# layer as long as these requirements do not change.
RUN pip install --no-cache-dir "fastapi>=0.110,<1.0" "uvicorn[standard]>=0.27,<1.0"

# Copy application source only after dependencies are installed so source edits
# do not invalidate the dependency layer.
COPY jaarvi_app ./jaarvi_app

EXPOSE 8000

CMD ["uvicorn", "jaarvi_app.main:app", "--host", "0.0.0.0", "--port", "8000"]
