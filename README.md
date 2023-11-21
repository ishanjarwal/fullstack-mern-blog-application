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
- User Authentication: Users can sign up, log in, and log out using JWT. Only authenticated users can create, edit, or delete blog posts.
- Create and Edit Posts: Authenticated users can create new blog posts and edit their existing posts.
- Delete Posts: Users can delete their own blog posts.
- Responsive Design: The application is designed to be responsive and accessible on various devices.
- File Uploads: Users can upload their display pictures and thumbnails. (to a limited size which can be set).

## 🌐Technologies Used:
- MongoDB: NoSQL database for storing blog post data.
- Express.js: Web application framework for building the server.
- ReactJS: JavaScript library for building the user interface.
- Node.js: JavaScript runtime for server-side development.
- JWT Authentication: JSON Web Tokens are used for user authentication.
- bcrypt.js: Library for hashing user passwords.
- Axios: HTTP client for making requests to the server.
- date-fns: for formatting dates.
- multer: for form data uploads.
- TailwindCSS: for reusable classnames.

## 📷Snapshots of the Project :
1. SignUp Screen
![3](https://github.com/ishanjarwal/fullstack-mern-blog-application/assets/129817762/d82f02ef-e82b-49cb-8e42-99b7cde9cf5a)
2. Login Screen
![1](https://github.com/ishanjarwal/fullstack-mern-blog-application/assets/129817762/28d7a0ca-ed06-445f-a198-35c42a54c43b)
3. Homepage
![Screenshot 2023-11-21 215941](https://github.com/ishanjarwal/fullstack-mern-blog-application/assets/129817762/3e289a1a-55c3-45b6-92aa-8df4e1f3dbe3)
4. BlogPost Page
![Screenshot 2023-11-21 220352](https://github.com/ishanjarwal/fullstack-mern-blog-application/assets/129817762/3194aa22-a7c3-46e5-85a3-670c737c79af)
5. Profile Page
![Screenshot 2023-11-21 220025](https://github.com/ishanjarwal/fullstack-mern-blog-application/assets/129817762/c9289f2a-1c4b-4368-b578-b26dc44ae418)
6. Your Posts Page
![Screenshot 2023-11-21 220054](https://github.com/ishanjarwal/fullstack-mern-blog-application/assets/129817762/ea374cd7-6a54-4e34-bc5f-5b0b2903083a)
7. Write a New blog page
![Screenshot 2023-11-21 220137](https://github.com/ishanjarwal/fullstack-mern-blog-application/assets/129817762/75cf6e1d-567b-46dc-9c4e-4af4a0a7ef1d)
8. Validations on Blog page
![Screenshot 2023-11-21 220200](https://github.com/ishanjarwal/fullstack-mern-blog-application/assets/129817762/485e8152-20bd-4117-b84c-787071873f91)
9. Edit Post page
![Screenshot 2023-11-21 220246](https://github.com/ishanjarwal/fullstack-mern-blog-application/assets/129817762/c875ef04-01ca-41ef-a837-92d80bd52f1a)
