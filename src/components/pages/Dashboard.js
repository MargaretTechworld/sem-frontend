import React, { useState } from 'react';
import {
  FaGraduationCap, FaCalendarAlt, FaNewspaper, FaComments,
} from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import '../styles/dashboard.css';
import logo from '../../images/logo1.png';
import SchoolCalendarDashboard from './SchoolCalendarDashboard';
import NewsDashboard from './NewsDashboard';
import TestifierForm from './TestifierForm';

const Dashboard = () => {
  const [displayedComponent, setDisplayedComponent] = useState(null);

  const handleLinkClick = (component) => {
    setDisplayedComponent(component);
  };

  const renderDisplayedComponent = () => {
    if (displayedComponent === 'School Calendar') {
      return <SchoolCalendarDashboard />;
    } if (displayedComponent === 'News') {
      return <NewsDashboard />;
    } if (displayedComponent === 'Testimonies') {
      return <TestifierForm />;
    }
    return null;
  };

  return (
    <div className="dashboard">
      <div className="dashboard-side">
        <img className="logo-sec" src={logo} alt="logo" />
        <p className="school-name">
          <FaGraduationCap />
          {' '}
          Destined for greatness
        </p>
        <ul className="dashboard-links">
          <li>
            <button
              type="button"
              className="dashboard-list"
              onClick={() => handleLinkClick('School Calendar')}
            >
              {' '}
              <FaCalendarAlt />
              School Calendar
            </button>
            <IoIosArrowForward />
          </li>
          <li>
            <button
              type="button"
              className="dashboard-list"
              onClick={() => handleLinkClick('News')}
            >
              <FaNewspaper />
              News
            </button>
            <IoIosArrowForward />
          </li>
          <li>
            <button
              type="button"
              className="dashboard-list"
              onClick={() => handleLinkClick('Testimonies')}
            >
              <FaComments />
              Testimonies
            </button>
            <IoIosArrowForward />
          </li>
        </ul>
      </div>
      <div className="dashboard-content">
        <div className="dashboard-top-div">
          <div className="admin-pic">M</div>
          <IoIosArrowDown />
        </div>
        <div className="dashboard-second-div">
          {renderDisplayedComponent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
