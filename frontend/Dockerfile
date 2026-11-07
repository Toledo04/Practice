FROM node:22-slim

WORKDIR /frontendapp

# Copy dependency manifests first so source edits do not invalidate npm install.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
