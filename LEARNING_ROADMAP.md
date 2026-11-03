# Jaarvi Learning Roadmap

Use this project to build intuition by developing an app from the ground up. Learn each topic by applying it to a useful project change, understanding the tradeoffs, and practicing how to explain the result in an interview.

## Topics to learn

- **APIs:** HTTP methods, status codes, request validation, authentication, pagination, and API design.
- **Databases:** SQL, schema design, indexes, transactions, and migrations. Practice by persisting conversations or user preferences. For the first persistence feature, use Redis and learn its key-value model, persistence options, and tradeoffs; keep SQL as a separate topic to learn afterward.
- **Testing:** Unit tests, integration tests, mocking external services, and understanding what each test protects.
- **Git and code review:** Branches, small commits, pull requests, resolving conflicts, and explaining tradeoffs.
- **Docker and deployment:** Build an image, configure environment variables and secrets, and deploy a small service.
- **Observability and debugging:** Read logs, trace a request across components, identify failures, and explain how to fix them.
- **Security basics:** Protect secrets, validate input, handle authentication, and avoid exposing sensitive user data in logs.
- **System design:** Reason about scaling an API, reliable data storage, retries, and background work.
- **AI-specific topics:** Tool calling, structured outputs, retrieval augmented generation, evaluations, prompt injection risks, and latency and cost.
- **Everyday engineering workflows:** Run the app locally, inspect and debug a Docker container, read logs, use Git branches and small commits, review changes, and explain how you investigated a problem.

## Project learning order

1. **Tests and CI**
2. **Redis and persistence**
3. **Docker and deployment**
4. **Logging and security**
5. **AI evaluations**

APIs, testing, Git, and code review are ongoing foundations throughout these steps. Learn system design as the app grows. Docker comes before Kubernetes; Kubernetes can follow once deploying a container feels familiar.

### Step 1 guide

Use [CoGuard's CI/CD pipeline guide](https://www.coguard.io/post/ci-cd-pipeline) as a reference for gradually expanding automated checks. Its examples cover tests and coverage, formatting and linting, static analysis, Docker, secrets, and infrastructure scanning. Adapt the ideas to this project's Python/FastAPI stack and add them in roadmap order instead of copying the entire pipeline at once. Coverage is a signal about which code ran during tests; the tests still need to check meaningful behavior.

## Hands-on interview practice

Turn each topic into a concrete experience by making a project change, investigating at least one failure or tradeoff, and practicing a concise explanation of what you did and why. For example, practice checking running containers with `docker ps`, opening a shell with `docker exec -it <container> sh` (or `bash` when available), inspecting logs, and exiting the container. Also practice describing Git branches, small commits, code review, and how you traced a bug from symptom to fix.

## Goal

Build a feature end to end and be ready to explain your choices, tradeoffs, failures, debugging, and what you’d improve next.

When helping with this project, use this roadmap to guide the work: connect changes to the relevant learning topic, explain the reasoning and tradeoffs in clear terms, and include interview-style practice when useful.
