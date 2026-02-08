import React from 'react';
import HomeAboutSection from './HomeAboutSection';
import WhUs from './Testimonials';
import Welcome from './Welcome';
import '../styles/home.css';
// import PastEvents from './PastEvents';
import RecentCourses from './RecentCourses';
import SchoolCalendar from './SchoolCalendar';
import NewsScroll from './NewsScroll';

const Home = () => (
  <div>
    <Welcome />
    <NewsScroll />
    <HomeAboutSection />
    <RecentCourses />
    <WhUs />
    {/* <PastEvents /> */}
    <SchoolCalendar />
  </div>
);

export default Home;
