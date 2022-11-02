/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import { ToastContainer } from "react-toastify"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { lazy, Suspense, useEffect } from 'react';
import { setUser } from './redux/features/authSlice';
import Footer from './components/Footer';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import "react-toastify/dist/ReactToastify.css"
import ScrollToTop from './components/ScrollToTop';
import Spinner from './components/Spinner';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import AddEditTour from './pages/AddEditTour';
// import SingleTour from './pages/SingleTour';
// import Dashboard from './pages/Dashboard';
// import NotFound from './pages/NotFound';
// import TagTours from './pages/TagTours';

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
  }, [])
  return (
    <Suspense fallback={<div></div>}>
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
            <Route path='/tours/tag/:tag' element={<TagTours />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/addTour' element={<PrivateRoute><AddEditTour /></PrivateRoute>} />
            <Route path='/editTour/:id' element={<PrivateRoute><AddEditTour /></PrivateRoute>} />
            <Route path='/tour/:id' element={<SingleTour />} />
            <Route path='/deshboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            {/* <Route path='/comment' element={<CommentForm />} /> */}
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
