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
import Search from './components/Search';
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider>
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
            <Route path = '/review' element={<GenericReview/>}/>
            <Route path = '/search' element={<Search/>}/>
          </Routes>
        </main>
    </div>
    </ChakraProvider>
  );
}

export default App;