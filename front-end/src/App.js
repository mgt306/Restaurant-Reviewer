import './App.css';
import Navbar from './components/Navbar';
import AboutUs from './Pages/About/AboutUs';
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import Explore from './Pages/Explore/Explore';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './Pages/Login and Register/Login';
import Register from './Pages/Login and Register/Register';

function App() {
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
            <Route path = '/login' element={<Login/>}/>
            <Route path = '/register' element={<Register/>}/>
          </Routes>
        </main>
    </div>
  );
}

export default App;