import React, { useState } from 'react';
import Intro from './Intro';
import '../styles/newsEvents.css';
import data from '../data/index.json';
import SchoolCalendar from './SchoolCalendar';

const NewsEvents = () => {
  const [expandedItemId, setExpandedItemId] = useState(null);

  const handleReadMore = (itemId) => {
    setExpandedItemId(itemId);
  };

  return (
    <div data-aos="fade" className="news-event-section">
      <Intro heading="NEWS & EVENTS" paragraph="" />
      {data?.News?.map((item) => (
        <>
          <div data-aos="fade-out" key={item.id} className="news-event-content">
            <div className="news-event-sub-content">
              <h2 className="news-event-heading">{item['news-heading']}</h2>
              <div className="news-event-date-type">
                <p className="news-event-button news-event" type="button">
                  {item.type}
                </p>
                <p className="news-event-button" type="button">
                  {item['news-date']}
                </p>
              </div>
              <p className="news-event-paragraph">
                {expandedItemId === item.id
                  ? item['news-info']
                  : `${item['news-info'].split(' ').slice(0, 30).join(' ')} `}
                {expandedItemId !== item.id && (
                  <span>
                    <button
                      className="read-me"
                      type="button"
                      href="#"
                      onClick={() => handleReadMore(item.id)}
                    >
                      read more
                    </button>
                  </span>
                )}
              </p>
            </div>
            <div className="news-event-img-div">
              <img
                className="news-event-img"
                alt="news"
                src={item['news-image']}
              />
            </div>
          </div>
          <hr className="horizaontal-rule" />
        </>
      ))}
      <div className="calender-event">
        <SchoolCalendar />
      </div>
    </div>
  );
};

export default NewsEvents;
