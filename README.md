
# TEAM TASK MANAGER APPLICATION

## 📌 Project Overview

I developed this Team Task Manager application from scratch as a full-stack project to manage team workflows efficiently. The application allows users to create projects, assign tasks, and track progress in a structured way.

The system is built using a modern tech stack with a separate frontend and backend, connected via REST APIs.

---

## 🚀 Features

* User Registration and Login
* JWT-based Authentication & Authorization
* Create, Update, and Delete Projects
* Task Assignment and Status Tracking
* Protected API Endpoints
* Admin Panel for backend management

---

## 🛠️ Tech Stack

### Frontend

* Next.js
* React.js
* Axios
* Deployed on Vercel

### Backend

* Django
* Django REST Framework
* JWT Authentication (SimpleJWT)

### Database

* MySQL (Cloud hosted)

---

## 🌐 Deployment

* Frontend deployed on Vercel
* Backend deployed on Railway
* MySQL database hosted on Railway (cloud)

---

## 🔗 Live Application

Frontend:
https://your-frontend.vercel.app

Backend:
https://your-backend.railway.app

Admin Panel:
https://your-backend.railway.app/admin/

---

## 🔐 Authentication (JWT)

The application uses JSON Web Token (JWT) authentication:

1. User logs in with credentials

2. Backend returns:

   * Access Token
   * Refresh Token

3. Access token is stored on frontend

4. Token is sent in headers for protected routes:

   Authorization: Bearer <access_token>

5. Unauthorized requests are blocked

---

## 📂 Project Structure

### Backend (Django)

* task_management/ (main project)
* users/ (authentication & user management)
* projects/ (project & task logic)

### Frontend (Next.js)

* pages/
* components/
* services/ (API calls)

---

## ⚙️ Local Setup Instructions

### Backend Setup

1. Create virtual environment
2. Install dependencies:
   pip install -r requirements.txt
3. Apply migrations:
   python manage.py migrate
4. Run server:
   python manage.py runserver

---

### Frontend Setup

1. Install dependencies:
   npm install
2. Run development server:
   npm run dev

---

## ☁️ Deployment Details

* Environment variables are used for secure configuration
* DATABASE_URL is used to connect to cloud MySQL
* Backend APIs are consumed by frontend using base URL
* CORS is configured to allow frontend requests

---

## 🎥 Demo Functionality

The application demonstrates:

* JWT authentication flow
* Secure API communication
* CRUD operations for projects and tasks
* Full cloud deployment (frontend + backend + database)

---

## 👨‍💻 Author

[Mohammad Anas]

---

## 📌 Additional Notes

* Application is built from scratch without using templates
* Follows REST API architecture
* Designed for scalability and real-world usage
* DEBUG is disabled in production environment

---

