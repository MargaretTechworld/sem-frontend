import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import About from './components/pages/About';
import ContactUs from './components/pages/ContactUs';
import Admission from './components/pages/Admission';
import NewsEvents from './components/pages/NewsEvents';
import Navigation from './components/pages/Navigation';
import Footer from './components/pages/Footer';

function App() {
  return (
    <div className="app-container">
      <Navigation />
      <div className="content-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/admission" element={<Admission />} />
          <Route path="/news-events" element={<NewsEvents />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
