# Group N - Notes Management App

## 📌 Project Overview
Group N Notes is a **React-based note management application** that allows users to create, update, delete, and categorize notes. It features **Firebase authentication** and **state management** with React hooks and local storage.

## 🚀 Features
- 🔐 **User Authentication** (Firebase Authentication)
- 📝 **Create, Read, Update, and Delete (CRUD) Notes**
- 🏷 **Tagging System** for easy categorization
- 🔍 **Search & Filter Notes**
- 📦 **Persistent Storage** using LocalStorage
- 🎨 **Responsive UI** built with Bootstrap

## 🛠 Tech Stack
- **Frontend**: React, TypeScript, Bootstrap
- **State Management**: React Hooks (useState, useMemo)
- **Authentication**: Firebase Authentication
- **Database & Storage**: Firestore & Firebase Storage
- **Routing**: React Router

## 🏗 Project Setup

### Prerequisites
- Node.js & npm installed
- Firebase project set up

### Installation
```sh
# Clone the repository
git clone https://github.com/your-repo/group-n-notes.git
cd group-n-notes

# Install dependencies
npm install
```

### Environment Variables
Create a `.env` file in the root directory and add the following:
```env
VITE_APP_FIREBASE_API_KEY=your-api-key
VITE_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_APP_FIREBASE_PROJECT_ID=your-project-id
VITE_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_APP_FIREBASE_APP_ID=your-app-id
```

### Running the App
```sh
npm start
```

## 🔑 Authentication (Firebase Setup)
We used Firebase Authentication for user login/signup. The setup includes:
- **Email & Password Authentication**
- **Firebase Firestore for user data storage**
- **Firebase Storage for storing media files**

### Firebase Configuration
```js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
```

## 🏆 Contributors
| Name | Matric Number | Department |
|-----------------------------|-----------------|------------------------------|
| **Aribatise John Olugbadeleke** | LCU/UG/21/20560 | Software Engineering |
| **Adeniran Adekola Michael** | LCU/UG/22/24851 | Computer Science Education |
| **Salami Olaoluwa** | LCU/UG/22/22567 | Computer Science with Economics |
| **Akinleye Feranmi Daniel** (Group Leader) | LCU/UG/21/20119 | Computer Science |
| **Ezeliora Ifeoma Perpetual** | LCU/UG/22/24176 | Computer Science |
| **Oluwashola Samuel Beloved** | LCU/UG/22/22404 | Computer Science |
| **Bamigbade Temiloluwa Benard** | LCU/UG/22/23055 | Computer Science |

## 🎖 Acknowledgments
Special thanks to **John Aribatise** (Senior Developer) for guidance and mentorship throughout the project.

---
📌 *This project is maintained by Group N from LCU's Computer Science Department.*


