require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const UserController = require("./controllers/UserController.js");
const { signupValidate, postValidate, profileValidate, updatePostValidate } = require('./validators/validators.js');
const cookie_parser = require('cookie-parser');
const { con } = require('./utils/dbConnection.js');
const { authMiddleware } = require('./middlewares/authMiddleware.js');
const PostController = require("./controllers/PostController.js");
const { uploadThumb } = require('./utils/uploadThumb.js');
const { uploadProfile } = require('./utils/uploadProfile.js')


// middlewares
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(express.json()) // for reading body data
app.use(cookie_parser());
app.use('/uploads', express.static(__dirname + '/uploads'))

// DB connection
con().catch(err => console.log(err));


// endpoints for user
app.post('/signup', signupValidate, UserController.createUser);
app.post('/login', UserController.loginUser);
app.get('/auth', UserController.authUser)
app.get('/logout', UserController.logoutUser)
app.get('/api/user', UserController.getLoggedUser)
app.post('/api/updateprofile', uploadProfile(), profileValidate, authMiddleware, UserController.updateUser)
app.get('/api/getauthor/:name', UserController.getAuthor)




// endpoints for post
app.post('/api/create', uploadThumb(), authMiddleware, postValidate, PostController.createPost)
app.get('/api/getpostsbyauthor', authMiddleware, PostController.getPostsByAuthor)
app.get('/api/posts', PostController.getAllPosts)
app.post('/api/updatepost/:postId', uploadThumb(), authMiddleware, updatePostValidate, PostController.updatePost)
app.get('/api/getpost/:id', PostController.getPost)
app.post('/api/delete', authMiddleware, PostController.deletePost)


app.listen(8080, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("Server Started")
    }
})