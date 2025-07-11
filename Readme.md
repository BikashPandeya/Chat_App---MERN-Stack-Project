# 💬 Chatty

A modern, full-stack real-time chat application for seamless conversations, built with the latest web technologies.

---

## 🚀 Features

- **Real-Time Messaging:** Instant chat powered by Socket.IO.
- **Authentication:** Secure signup, login, and JWT-based session management.
- **Profile Management:** Upload and update your profile picture, view others’ profiles.
- **Image Sharing:** Send and receive images in chat.
- **Online Status:** See who is online in real time.
- **Theme Switcher:** Choose your favorite chat theme.
- **Responsive UI:** Mobile-friendly and desktop-ready.
- **Protected Routes:** Only authenticated users can access chat and profile pages.

---

## 🛠️ Tech Stack

**Frontend**
- React + Vite
- Zustand (state management)
- React Router
- Tailwind CSS + DaisyUI
- Axios
- React Hot Toast
- Socket.IO Client

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- Socket.IO
- JWT (authentication)
- Multer (image uploads)
- Cloudinary (image hosting)

---

## 📦 Folder Structure

```
Chatty/
├── backend/
│   ├── .env
│   ├── package.json
│   └── src/
│       ├── controllers/
│       │   ├── auth.controller.js
│       │   └── message.controller.js
│       ├── lib/
│       │   ├── cloudinary.js
│       │   ├── db.js
│       │   ├── socket.js
│       │   └── utils.js
│       ├── middleware/
│       │   └── auth.middleware.js
│       ├── models/
│       │   ├── message.model.js
│       │   └── user.model.js
│       ├── routes/
│       │   ├── auth.route.js
│       │   └── message.route.js
│       └── index.js
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   ├── constants/
│   │   │   └── index.js
│   │   ├── lib/
│   │   │   ├── axios.js
│   │   │   └── utils.js
│   │   ├── store/
│   │   │   ├── useAuthStore.js
│   │   │   ├── useChatStore.js
│   │   │   └── useThemeStore.js
│   │   ├── components/
│   │   │   ├── AuthImagePattern.jsx
│   │   │   ├── ChatContainer.jsx
│   │   │   ├── ChatHeader.jsx
│   │   │   ├── MessageInput.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── NoChatSelected.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── skeletons/
│   │   │       ├── MessageSkeleton.jsx
│   │   │       └── SidebarSkeleton.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   ├── SettingsPage.jsx
│   │   │   └── SignUpPage.jsx
│   │   └── public/
│   │       ├── avatar.png
│   │       └── vite.svg
└── README.md
```

---

## ⚙️ Getting Started

1. **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/chatty.git
    cd chatty
    ```

2. **Install dependencies**
    ```bash
    cd backend
    npm install
    cd ../frontend
    npm install
    ```

3. **Set up environment variables**
    - Create `.env` files in both `backend` and `frontend` as needed (see `.env.example`).

4. **Start the servers**
    ```bash
    # In backend/
    npm run dev

    # In frontend/
    npm run dev
    ```

---

## 🌐 Live Demo

Try the deployed app here:  
**[https://chat-app-mern-stack-project.onrender.com/](https://chat-app-mern-stack-project.onrender.com/)**

---

## 📸 Screenshots

_Add screenshots of your app here!_

---

## 🙏 Credits

- [React](https://react.dev/)
- [Socket.IO](https://socket.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [MongoDB](https://www.mongodb.com/)
- And all open-source contributors!

---

## 📄 License

This project is licensed under the MIT License.

---

**Happy chatting! 🚀**