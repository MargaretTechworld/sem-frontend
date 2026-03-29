import React from 'react';
import { motion } from 'framer-motion';
import HomeAboutSection from './HomeAboutSection';
import WhUs from './Testimonials';
import Welcome from './Welcome';
import '../styles/home.css';
// import PastEvents from './PastEvents';
import RecentCourses from './RecentCourses';
import SchoolCalendar from './SchoolCalendar';
import NewsScroll from './NewsScroll';

const Home = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <Welcome />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <NewsScroll />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <HomeAboutSection />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <RecentCourses />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <WhUs />
      </motion.div>

      {/* <PastEvents /> */}

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <SchoolCalendar />
      </motion.div>
    </div>
  );
};

export default Home;
