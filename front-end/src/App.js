import './App.css';
import Navbar from './components/Navbar';
import About from './Pages/About/About';
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import Explore from './Pages/Explore/Explore';
import { Route, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path ='/' element={<Home/>}/>
        <Route path ='/about' element={<About/>}/>
        <Route path ='/profile' element={<Profile/>}/>
        <Route path ='/explore' element={<Explore/>}/>
        <Route path ='*' element={ <Navigate to ='/'/> } />
      </Routes>
    </div>
  );
}

export default App;