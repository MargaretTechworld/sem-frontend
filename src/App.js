import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import Home from './components/Home';
import About from './components/About';
import ContactUs from './components/ContactUs';
import Admission from './components/Admission';
import SupportUs from './components/SupportUs';
import NewsEvents from './components/NewsEvents';

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/admission" element={<Admission />} />
        <Route path="/support-us" element={<SupportUs />} />
        <Route path="/news-events" element={<NewsEvents />} />
      </Routes>
    </div>
  );
}

export default App;
