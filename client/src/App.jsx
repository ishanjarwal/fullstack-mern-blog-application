import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MainLayout from './MainLayout';
import Homepage from './pages/Homepage';
import './App.css'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Post from './pages/Post';
import PanelLayout from './adminpanel/PanelLayout';
import AllPosts from './adminpanel/AllPosts';
import CreatePost from './adminpanel/CreatePost';
import EditProfile from './adminpanel/EditProfile';
import Saved from './adminpanel/Saved';
import InternalServerError from './pages/InternalServerError';
import Category from './pages/Category';
import Author from './pages/Author';
import EditPost from './adminpanel/EditPost';

function App() {
  return (
    <Router>
      <Routes>
        <Route path={'/'} element={<MainLayout />}>
          <Route index element={<Homepage />}></Route>
          <Route path={'/post/:id'} element={<Post />}></Route>
          <Route path={'/category/:name'} element={<Category />}></Route>
          <Route path={'/author/:name'} element={<Author />}></Route>
        </Route>
        <Route path={'/login'} element={<Login />}></Route>
        <Route path={'/signup'} element={<Signup />}></Route>
        <Route path={'account'} element={<PanelLayout />}>
          <Route index element={<AllPosts />}></Route>
          <Route path={'create'} element={<CreatePost />}></Route>
          <Route path={'update/:postId'} element={<EditPost />}></Route>
          <Route path={'profile'} element={<EditProfile />}></Route>
          <Route path={'saved'} element={<Saved />}></Route>
        </Route>
        <Route path='502' element={<InternalServerError />}></Route>
      </Routes>
    </Router>
  )
}

export default App;