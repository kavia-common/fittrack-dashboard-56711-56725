# FitTrack Dashboard (fitness_frontend)

Modern fitness dashboard UI with sidebar navigation, top info bar, main content for workout plans, logging, and analytics. Includes onboarding and chat modals.

## Requirements
- Node.js 18+
- npm 10+

## Environment variables
This app expects these variables (already provided in `.env` for the container environment):

- `REACT_APP_API_BASE`
- `REACT_APP_BACKEND_URL`
- `REACT_APP_FRONTEND_URL`
- `REACT_APP_WS_URL`
- `REACT_APP_NODE_ENV`
- `REACT_APP_NEXT_TELEMETRY_DISABLED`
- `REACT_APP_ENABLE_SOURCE_MAPS`
- `REACT_APP_PORT`
- `REACT_APP_TRUST_PROXY`
- `REACT_APP_LOG_LEVEL`
- `REACT_APP_HEALTHCHECK_PATH`
- `REACT_APP_FEATURE_FLAGS`
- `REACT_APP_EXPERIMENTS_ENABLED`

## Local development
```bash
npm install
npm start
```

Then open http://localhost:3000

## Scripts
- `npm start`: run dev server
- `npm run build`: build for production
- `npm test`: run tests
