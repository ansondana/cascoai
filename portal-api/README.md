# Casco AI Portal API

FastAPI backend for the Casco AI Client Agent Portal.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration values.

4. Run the server:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

## API Documentation

Once the server is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Environment Variables

- `VAPI_API_KEY`: Your Vapi API key for voice agent integration
- `VAPI_BASE_URL`: Vapi API base URL (default: https://api.vapi.ai)
- `DATABASE_URL`: PostgreSQL connection string (if using database)
- `ALLOWED_ORIGINS`: Comma-separated list of allowed CORS origins
- `AUTH0_DOMAIN`: Your Auth0 domain for token verification
- `AUTH0_AUDIENCE`: Your Auth0 API identifier

## Development

For development with hot reload:
```bash
uvicorn main:app --reload
```

## Production

For production deployment:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

