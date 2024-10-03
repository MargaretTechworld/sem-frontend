import React from 'react';
import '../styles/staff.css';
import team from '../../images/staff.jpeg';

const Staff = () => (
  <div className="staff-section">
    <h2>Meet our team</h2>
    <p>
      Our teachers are not just educators;
      they are mentors, motivators, and role models who go above and
      beyond to ignite a love for learning within our students.
      With their unwavering commitment and
      innovative teaching methods, they ensure
      that every child receives an engaging and enriching educational experience
    </p>
    <img className="staff-img" src={team} alt="img2" />

  </div>
);

export default Staff;
