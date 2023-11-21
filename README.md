# Full Stack MERN Blog App
## 🔎Overview
This is a blog application built using the MERN stack (MongoDB, Express.js, React, and Node.js) with Vite. The application allows users to create their accounts and manage their profiles (including display picture) and further lets them create, edit, and delete blog posts. The login system is built using the JWT (jsonwebtokens). The application uses react-router-dom for routing without refreshing the page. At the backend, robust api's have been written including data limits, proper form validations using express-validator and limited access is made sure using authentication middlewares. The styling is done with TailwindCSS.
## Pre-requisites
To use this project, make sure you have installed mongodb and nodejs on your system.

## ⚒️Using this project
To get started, you will have to install all the dependencies, set up the .env variables and set up a mongodb database either locally or on mongo atlas.
1. Clone this Repo with the following command in git bash:
  ```
  git clone https://github.com/ishanjarwal/fullstack-mern-blog-application.git
  ```
2. Head into the api folder and install the dependencies at the backend
   ```cd api```
   ```npm install```
3. In the client directory, install the frontend dependencies
   ```cd client```
   ```npm install```
4. Create a .env file and paste the following details
   
   ```
   MONGO_URI='Your mongodb url'
   JWT_SECRET='your secret key(can be anything doesn't matter'
   ```
5. Withing the api folder, run
   
   ```
   npm start
   ```
6. Then in the client folder,

   ```
   npm run dev -- --host
   ```
And you are good to use it😊

## 🎨Features :
-User Authentication: Users can sign up, log in, and log out using JWT. Only authenticated users can create, edit, or delete blog posts.
-Create and Edit Posts: Authenticated users can create new blog posts and edit their existing posts.
-Delete Posts: Users can delete their own blog posts.
-Responsive Design: The application is designed to be responsive and accessible on various devices.
-File Uploads: Users can upload their display pictures and thumbnails. (to a limited size which can be set).

## Technologies Used:
-MongoDB: NoSQL database for storing blog post data.
-Express.js: Web application framework for building the server.
-ReactJS: JavaScript library for building the user interface.
-Node.js: JavaScript runtime for server-side development.
-JWT Authentication: JSON Web Tokens are used for user authentication.
-bcrypt.js: Library for hashing user passwords.
-Axios: HTTP client for making requests to the server.
-date-fns: for formatting dates.
-multer: for form data uploads.
-TailwindCSS: for reusable classnames.

## 📷Snapshots of the Project :
1. SignUp Screen
2. Login Screen
3. Homepage
4. Profile Page
5. Your Posts Page
6. Validation Errors on Profile page
7. Write a New blog page
8. Validations on Blog page
9. Saved Posts Page
10. Edit Post page
11. BlogPost page
