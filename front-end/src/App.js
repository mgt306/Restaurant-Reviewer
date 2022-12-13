import Navbar from './components/Navbar';
import AboutUs from './Pages/About/AboutUs';
import Home from './Pages/Home/Home';
import Explore from './Pages/Explore/Explore';
import { Route, Routes, Navigate } from 'react-router-dom';
import GenericReview from './Pages/Register/GenericReview';
import ViewResto from './Pages/ViewResto/viewResto';

function App() {  
  
  
  return (
    <div>
      <Navbar/>
        <main>
          <Routes>
            <Route path ='/' element={<Home/>}/>
            <Route path ='/about' element={<AboutUs/>}/>
            <Route path ='/explore' element={<Explore/>}/>
            <Route path ='*' element={ <Navigate to ='/'/> } />
            <Route path = '/review/:RestaurantId' element={<GenericReview/>}/>
            <Route path = '/viewResto/:RestaurantId' element={<ViewResto/>}/>
          </Routes>
        </main>
    </div>
  );
}

export default App;
