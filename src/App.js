import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './components/pages/LoginPage';
import Home from './components/pages/Home';
import About from './components/pages/About';
import ContactUs from './components/pages/ContactUs';
import Admission from './components/pages/Admission';
import NewsEvents from './components/pages/NewsEvents';
import Navigation from './components/pages/Navigation';
import Footer from './components/pages/Footer';

function App() {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <div className="app-container">
      <Routes>
        <Route path="/login-page" element={<LoginPage />} />
        <Route
          path="/*"
          element={(
            <>
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
            </>
          )}
        />
      </Routes>
    </div>
  );
}

export default App;
