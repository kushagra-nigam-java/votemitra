# VOTEमित्र Election Navigator

A premium, interactive single-page application built to act as a civic decision engine for Indian elections. It guides users through voter journeys using personalized decision flows.

## Live Application
**Cloud Run URL**: [To be updated after deployment]

## Setup Steps

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Locally**:
   ```bash
   npm start
   ```
   The application will be available at `http://localhost:8080`.

3. **Docker Deployment (Local)**:
   ```bash
   docker build -t votemitra .
   docker run -p 8080:8080 votemitra
   ```

4. **Deploy to Google Cloud Run**:
   ```bash
   gcloud run deploy votemitra --source . --port 8080 --region asia-south1 --allow-unauthenticated
   ```

## Prompt Engineering Logic

This project leverages agentic AI reasoning to rapidly prototype and deploy a fully functional web application. The core logic involved:
1. Translating conceptual UI requirements (glassmorphism, interactive voting flows) into static HTML/CSS/JS.
2. Generating a local Node.js/Express server to host the static assets in a production environment.
3. Writing Docker configuration explicitly designed for Google Cloud Run (exposing port 8080, utilizing a lightweight Alpine Node.js image).
4. Automating the local testing and remote deployment pipeline using gcloud CLI.
