#  Blog Website (MERN Stack)

A full-stack blog website built with **MongoDB**, **Express.js**, **React**, and **Node.js (MERN)**.  
Users can register/login, create blogs, and manage posts securely.



##  Features

 User Authentication with JWT  
 Create, Read, Update, Delete (CRUD) blog posts  
 Protected routes for authenticated users  
 React frontend with Axios API integration  
 Production-ready setup (frontend served via Express in production)



## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/PriyatoshKumarShahi/Blog_Website.git

Backend Setup:

cd backend
npm install

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
PORT=5000

Run backend :  npm run dev


Frontend Setup :

cd ../frontend
npm install
npm start


For Production , run in frontend : npm run build


