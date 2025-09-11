
---

## 🟢 2. `mmdb/README.md` (Movie Database project)

```markdown
# MMDB – Movie Database API

A simple serverless API to manage movies.  
Built with **AWS Lambda + API Gateway + Serverless Framework** and validated using **Middy**.

## Features
- `GET /api/movies` → Fetch all movies
- `GET /api/keys` → Get an API key
- `POST /api/movies?key=yourKey` → Add a new movie (with schema validation)

## Movie Schema
```json
{
  "title": "string",
  "year": "integer (>=1888, <= current year)",
  "director": "string",
  "genre": "string",
  "length": "integer (minutes)"
}
