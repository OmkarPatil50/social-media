import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Landing from './Pages/Landing/Landing';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Bookmark from './Pages/Bookmark/Bookmark';
import PostDetails from './Pages/PostDetails/PostDetails';
import Profile from './Pages/Profile/Profile';
import Explore from './Pages/Explore/Explore';
import CreatePost from './Pages/CreatePost/CreatePost';

function App() {
  return (
    <div className="App">
      <h1 className="app-heading-small">
        <span>Socio</span>court
      </h1>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/bookmark' element={<Bookmark />} />
        <Route path='/posts/:postID' element={<PostDetails />} />
        <Route path='/users/:userId' element={<Profile />} />
        <Route path='/explore' element={<Explore />} />
        <Route path='/createpost' element={<CreatePost />} />




      </Routes>
    </div>
  );
}

export default App;
