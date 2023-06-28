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
import RequireAuth from './Pages/Auth/RequireAuth';

function App() {
  return (
    <div className="App">
      <h1 className="app-heading-small">
        <span>Socio</span>court
      </h1>
      <Routes>
        <Route path='/signup' element={<Landing />} />
        <Route path='/' element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        } />
        <Route path='/login' element={<Login />} />
        <Route path='/bookmark' element={
          <RequireAuth>
            <Bookmark />
          </RequireAuth>
        } />
        <Route path='/posts/:postID' element={<RequireAuth>
          <PostDetails />
        </RequireAuth>} />
        <Route path='/users/:userId' element={<RequireAuth><Profile /></RequireAuth>} />
        <Route path='/explore' element={<RequireAuth><Explore /></RequireAuth>} />
        <Route path='/createpost' element={<RequireAuth><CreatePost /></RequireAuth>} />




      </Routes>
    </div>
  );
}

export default App;
