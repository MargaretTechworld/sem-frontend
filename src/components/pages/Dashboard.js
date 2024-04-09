import React from 'react';
import {
  FaGraduationCap, FaCalendarAlt, FaNewspaper, FaComments,
} from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import '../styles/dashboard.css';
import logo from '../../images/logo1.png';

const Dashboard = () => (
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
          <button type="button" className="dashboard-list">
            {' '}
            <FaCalendarAlt />
            School Calendar
          </button>
          <IoIosArrowForward />
        </li>
        <li>
          <button type="button" className="dashboard-list">
            <FaNewspaper />
            News
          </button>
          <IoIosArrowForward />
        </li>
        <li>
          <button type="button" className="dashboard-list">
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
        <h2>Dashboard</h2>
      </div>
    </div>
  </div>
);

export default Dashboard;
