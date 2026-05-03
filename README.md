# VOTEमित्र Election Navigator

A premium, interactive single-page application built to act as a civic decision engine for Indian elections. It guides users through voter journeys using personalized decision flows.

---

## Live Application

Cloud Run URL:  
https://votemitra-22184785390.asia-south1.run.app

---

## Setup Steps

1. Install Dependencies:
npm install

2. Run Locally:
npm start

The application will be available at:
http://localhost:8080

---

## Docker Deployment (Local)

docker build -t votemitra .
docker run -p 8080:8080 votemitra

---

## Deploy to Google Cloud Run

gcloud run deploy votemitra --source . --port 8080 --region asia-south1 --allow-unauthenticated

---

## Prompt Engineering Logic

This project leverages agentic AI reasoning to rapidly prototype and deploy a fully functional web application.

Core implementation includes:

1. Translating UI concepts (glassmorphism, interactive voting flows) into HTML, CSS, and JavaScript
2. Creating a lightweight Node.js and Express server for production hosting
3. Writing a Dockerfile optimized for Google Cloud Run (port 8080, lightweight image)
4. Automating deployment using gcloud CLI

---

## Key Features

- Interactive voter decision flow  
- Clean and modern UI  
- Lightweight and fast deployment  
- Cloud-native architecture  

---

## Tech Stack

Frontend: HTML, CSS, JavaScript  
Backend: Node.js, Express  
Deployment: Google Cloud Run  
