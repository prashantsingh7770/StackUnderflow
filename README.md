# 🛒 E-Commerce Website

This is a full-stack **E-Commerce Web Application** built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js).

---
## 🔧 Quick summary

- **Frontend:** React + Vite (in `client/`)

- **Backend:** Node.js + Express (in `server/`)

- **Database:** MongoDB (local or Atlas)

---
## 📌 Requirements

- Node.js >= 18 (includes npm)
- MongoDB (local installation or MongoDB Atlas)


## ⚙️ Backend Setup (Server)

(Mandatory step) Open a terminal and go to the server folder:
```bash
cd server
npm install
npm start
```

## 🗄️ MongoDB Compass Setup (Database)

### ⚙️ Step 1: Create Database and Collection
1. Open **MongoDB Compass**.
2. Connect to your local MongoDB instance.
3. Create a new **database** named `ecommdb`.
4. Inside `ecommdb`, create a **collection** named `products`.

### 📥 Step 2: Import Sample Data
1. Open the `products` collection.
2. Click on **"Add Data" → "Import JSON File"**.
3. Select and import the file **`mockdata_verified.json`**.

✅ **Note:** These steps are **mandatory** for the application to run correctly, as the backend relies on the `products` collection.


## 🎨 Frontend Setup (Client)

(Optional) Proxy config in the client folder inside `vite.config.js` add
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server:{
    proxy: {
      "/api":"http://localhost:3000",
    },
  },
})
```



(Mandatory step) Open a terminal and go to client folder
```bash
cd client
npm install
npm run dev
```
By default, it runs on http://localhost:5173


---

**Basic Project Folder structure**
```
project/
 ├─ client/   # frontend (React + Vite)
 ├─ server/   # backend (Node + Express + MongoDB)
 └─ README.md
```

