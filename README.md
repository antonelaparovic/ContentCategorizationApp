# ContentCategorizationApp

## Table of Contents

1. [Features](#features)  
2. [Tech Stack](#tech-stack)  
3. [Prerequisites](#prerequisites)  
4. [Installation](#installation)  
5. [Configuration](#configuration)  
6. [Running Locally](#running-locally)

---

## Features

- **Categorization** of content  
- **Sentiment analysis** (positive, neutral, negative)  
- **Keyword analysis** (exactly three terms)  
- **Rate limiting** to prevent abuse 
- **CORS** configured for dev & prod  
- **Error handling** and input length validation to prevent token abuse

---

## Tech Stack

- **Backend**: NestJS, TypeScript, OpenAI API  
- **Frontend**: Angular (standalone components, Reactive Forms), TypeScript  

---

## Prerequisites

- **Node.js**  
- **npm**

---

## Installation

### Clone repo
```
git clone https://github.com/antonelaparovic/ContentCategorizationApp.git
cd ContentCategorizationApp
```

### Open Terminal, navigate to backend folder, install backend dependencies
```
cd backend
npm install
```

### Open new Terminal, navigate to frontend folder (from root folder), install frontend dependencies
```
cd frontend/content-categorization-fe`
npm install
```

---

## Configuration

open .env.example file in backend folder, enter valid OPENAI_API_KEY, rename file to .env (check if ignored for git)

---

## Running locally

### Backend
```
cd backend
npm run start:dev
```

### Frontend
```
cd frontend/content-categorization-fe
npm run build
ng serve
```

Open http://localhost:4200, enter text, click Analyze


