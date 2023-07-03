import logo from './logo.svg';
import './App.css';
import { Routes, Route, useNavigate, Link } from 'react-router-dom'
import Landing from './Pages/Landing/Landing';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Bookmark from './Pages/Bookmark/Bookmark';
import PostDetails from './Pages/PostDetails/PostDetails';
import Profile from './Pages/Profile/Profile';
import Explore from './Pages/Explore/Explore';
import CreatePost from './Pages/CreatePost/CreatePost';
import RequireAuth from './Pages/Auth/RequireAuth';
import { useContext } from 'react';
import { AppContext } from '.';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function App() {

  const { state, dispatch } = useContext(AppContext)

  const navigate = useNavigate()

  const logoutHandler = () => {
    dispatch({ type: "UPDATE_USER_LOGGEDIN", payload: false });
    dispatch({
      type: "UPDATE_USER_DATA",
      payload: {},
    });

    toast.success("Logged Out Successfully!", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
    navigate("/login")
  }

  return (
    <div className="App">
      <div className="app-top-bar">
        <Link to='/' className='link'>
          <h1 className="app-heading-small">
            <span>Socio</span>court
          </h1>
        </Link>
        <div className="log-out-tag">
          <i className="fa-solid fa-right-from-bracket" onClick={logoutHandler}></i>
        </div>

      </div>
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
      <ToastContainer />
    </div>
  );
}

export default App;
