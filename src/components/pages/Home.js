import React from 'react';
import HomeAboutSection from './HomeAboutSection';
import WhUs from './Testimonials';
import NewsLetter from './SchoolCalendar';
import Welcome from './Welcome';
import '../styles/home.css';
import PastEvents from './PastEvents';

const Home = () => (
  <div>
    <Welcome />
    <HomeAboutSection />
    <WhUs />
    <NewsLetter />
    <PastEvents />
  </div>
);

export default Home;
