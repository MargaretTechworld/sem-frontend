import React from 'react';
import '../styles/newsScroll.css';
import { NavLink } from 'react-router-dom';
import data from '../data/index.json';

const NewsScroll = () => (
  <div>
    <NavLink to="/news-events">
      <div className="news-container">

        <div className="title">
          Recent News
        </div>

        {data?.News?.map((item) => (
          <ul className="news-container-ul" key={item.id}>
            <li>{item['news-heading']}</li>
          </ul>
        ))}
      </div>
    </NavLink>
  </div>
);

export default NewsScroll;
