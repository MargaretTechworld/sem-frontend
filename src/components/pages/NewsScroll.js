import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { API_URL } from '../../apiConfig';
import '../styles/newsScroll.css';

const NewsScroll = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/content/news`);
        const formattedNews = data.sections.map((section) => {
          try {
            return { id: section.key, ...JSON.parse(section.content) };
          } catch (e) {
            return { id: section.key, title: section.content };
          }
        });
        setNews(formattedNews);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Error fetching news scroll:', err);
      }
    };
    fetchNews();
  }, []);

  return (
    <div>
      <NavLink to="/news-events">
        <div className="news-container">
          <div className="title">Recent News</div>
          {news.map((item) => (
            <ul className="news-container-ul" key={item.id}>
              <li>{item.title}</li>
            </ul>
          ))}
        </div>
      </NavLink>
    </div>
  );
};

export default NewsScroll;
