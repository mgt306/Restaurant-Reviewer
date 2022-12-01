import './App.css';
import Navbar from './components/Navbar';
import AboutUs from './Pages/About/AboutUs';
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import Explore from './Pages/Explore/Explore';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './Pages/Login and Register/Login';
import Register from './Pages/Login and Register/Register';
import GenericReview from './Pages/Register/GenericReview';
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";


function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:3000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  
  return (
    <div>
      <Navbar/>
        <main>
          <Routes>
            <Route path ='/' element={<Home/>}/>
            <Route path ='/about' element={<AboutUs/>}/>
            <Route path ='/profile' element={<Profile/>}/>
            <Route path ='/explore' element={<Explore/>}/>
            <Route path ='*' element={ <Navigate to ='/'/> } />
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
            <Route path = '/login' element={<Login/>}/>
            <Route path = '/register' element={<Register/>}/>
            <Route path = '/review' element={<GenericReview/>}/>
          </Routes>
        </main>
    </div>
  );
}

export default App;