# 🏥 Prescripto — Doctor Appointment Booking Platform

Prescripto is a full-stack doctor appointment booking platform that allows users to browse doctors, view profiles, and book appointments online.  
The platform also includes an Admin Dashboard to manage doctors, availability, and appointments.

This project is built using the MERN stack and deployed on modern cloud platforms.

# 🚀 Live Demo

🌐 **User Website**  
https://prescripto-peach.vercel.app/

⚙️ **Backend API**  
https://prescripto-wqj7.onrender.com

🛠 **Admin Dashboard**  
https://prescripto-cojy.vercel.app/

# ✨ Features

## 👨‍⚕️ User Features
- Browse doctors by specialization
- View detailed doctor profiles
- Book appointments
- Secure online payments using Razorpay
- User authentication and profile management
- Responsive UI for all devices

## 🛠 Admin Features
- Add and manage doctors
- Control doctor availability
- View and manage appointments
- Manage doctor profiles
- Admin authentication

# 🧰 Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas

### Integrations
- Cloudinary (Image Storage)
- Razorpay (Payment Gateway)

### Deployment
- Vercel (Frontend + Admin)
- Render (Backend)

# ⚙️ System Architecture
```
          ┌────────────────────────────┐
          │        User Website        │
          │      React + Vite          │
          │        (Vercel)            │
          └─────────────┬──────────────┘
                        │
                        │ API Requests
                        ▼
            ┌──────────────────────────┐
            │       Backend API        │
            │     Node.js + Express    │
            │        (Render)          │
            └─────────────┬────────────┘
                          │
                          │ Database Queries
                          ▼
            ┌──────────────────────────┐
            │        MongoDB Atlas     │
            │         Database         │
            └──────────────────────────┘
                          ▲
                          │
                          │ API Requests
        ┌─────────────────┴─────────────────┐
        │           Admin Panel             │
        │        React + Vite (Vercel)      │
        └───────────────────────────────────┘
        ```

# 📂 Project Structure

prescripto │ ├── frontend        # User website ├── admin           # Admin dashboard ├── backend         # Node.js API │ └── README.md

# 🌐 Deployment

| Component | Platform |
|--------|--------|
Frontend | Vercel |
Admin Panel | Vercel |
Backend | Render |
Database | MongoDB Atlas |
Image Storage | Cloudinary |
Payments | Razorpay |
