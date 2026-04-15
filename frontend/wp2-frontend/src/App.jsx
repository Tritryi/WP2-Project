import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Game from './pages/Game'
import Footer from './assets/Footer/Footer';
import Register from './pages/Register';
import Login from './pages/Login'
import Profil from './pages/Profil';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <div className='d-flex flex-column min-vh-100'>
      <Navbar />
      <main className='flex-grow-1'>
        <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/game/:id' element={<Game />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/profile' element={<Profil />} />
      </Routes>
      </main>
      <Footer />
    </div>
      
    </BrowserRouter>
  );
}

export default App
