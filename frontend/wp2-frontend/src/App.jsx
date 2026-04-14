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

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/game/:id' element={<Game />}/>
        <Route path='/register' element={<Register />}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App
