import './App.css';
import { ToastContainer } from "react-toastify"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { lazy, Suspense, useEffect } from 'react';
import "react-toastify/dist/ReactToastify.css"
import { useDispatch } from 'react-redux';
import { setUser } from './redux/features/authSlice';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Spinner from './components/Spinner';
import Profile from './pages/Profile';
import Category from './pages/Category';
import Tours from './pages/Tours';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import AddEditTour from './pages/AddEditTour';
// import SingleTour from './pages/SingleTour';
// import Dashboard from './pages/Dashboard';
// import NotFound from './pages/NotFound';
// import TagTours from './pages/TagTours';

// import Coockies from './pages/Cookie';
// import CommentForm from './comments/CommentForm';


const Home = lazy(() => import(/* webpackChunkName: "Home"*/ './pages/Home'))
const Login = lazy(() => import(/* webpackChunkName: "Login"*/ './pages/Login'))
const Register = lazy(() => import(/* webpackChunkName: "Register"*/ './pages/Register'))
const AddEditTour = lazy(() => import(/* webpackChunkName: "AddEditTour"*/ './pages/AddEditTour'))
const SingleTour = lazy(() => import(/* webpackChunkName: "SingleTour"*/ './pages/SingleTour'))
const Dashboard = lazy(() => import(/* webpackChunkName: "Dashboard"*/ './pages/Dashboard'))
const NotFound = lazy(() => import(/* webpackChunkName: "NotFound"*/ './pages/NotFound'))
const TagTours = lazy(() => import(/* webpackChunkName: "TagTours"*/ './pages/TagTours'))


function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    dispatch(setUser(user));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Suspense fallback={<div><Spinner /></div>}>
      <BrowserRouter>
        {/* <Coockies /> */}
        <div className="App">
          <Header />

          <ToastContainer />
          <ScrollToTop />

          <Routes>
            <Route path='*' element={<NotFound />} />
            <Route exact path='/' element={<Home />} />
            <Route exact path='/tours/search' element={<Home />} />
            <Route path="/tours" element={<Tours />} />
            <Route path='/tours/tag/:tag' element={<TagTours />} />
            <Route path="/tours/category/:category" element={<Category />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/addTour' element={<PrivateRoute><AddEditTour /></PrivateRoute>} />
            <Route path='/editTour/:id' element={<PrivateRoute><AddEditTour /></PrivateRoute>} />
            <Route path='/tour/:id' element={<SingleTour />} />
            <Route path='/deshboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route
              path="/profile/:_id"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            {/* <Route path='/comment' element={<CommentForm />} /> */}
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
