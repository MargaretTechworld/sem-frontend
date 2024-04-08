import React from 'react';
import HomeAboutSection from './HomeAboutSection';
import Testimonials from './Testimonials';
import NewsLetter from './SchoolCalendar';
import Welcome from './Welcome';
import '../styles/home.css';
import PastEvents from './PastEvents';
import NewsScroll from './NewsScroll';

const Home = () => (
  <div>
    <Welcome />
    <div>
      <NewsScroll />
    </div>
    <HomeAboutSection />
    <Testimonials />
    <NewsLetter />
    <PastEvents />
  </div>
);

export default Home;
