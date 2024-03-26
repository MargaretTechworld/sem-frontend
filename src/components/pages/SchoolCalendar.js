import React, { useState, useRef } from 'react';
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaDownload,
  FaPlus,
} from 'react-icons/fa';
import data from '../data/index.json';
import '../styles/schoolCalendar.css';

const SchoolCalendar = () => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [showEvents, setShowEvents] = useState(false);
  const eventsRef = useRef(null);

  const handleMonthSelect = (month) => {
    if (selectedMonth === month) {
      setShowEvents(!showEvents);
    } else {
      setSelectedMonth(month);
      setShowEvents(true);
    }

    setTimeout(() => {
      if (eventsRef.current) {
        eventsRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  };

  const handleKeyDown = (event, month) => {
    if (event.key === 'Enter') {
      handleMonthSelect(month);
    }
  };

  return (
    <div className="news-section">
      <h2 className="news-section-heading">
        <FaCalendarAlt className="news-article-icon" />
        School Calendar
      </h2>
      <p>
        Stay updated with our school calendar for upcoming events and
        activities.
      </p>
      <a href="/resources/download.pdf" className="download-link" download>
        <span>Download PDF</span>
        <FaDownload className="download-icon" />
      </a>
      {data?.Events?.map((item) => (
        <div key={item.id} className="event-top">
          <div
            className="event-drop"
            onClick={() => handleMonthSelect(item.month)}
            role="button"
            tabIndex="0"
            onKeyDown={(event) => handleKeyDown(event, item.month)}
          >
            <h3 className="event-heading uppercase">{item.month}</h3>
            <FaPlus className="news-article-icon" />
          </div>
          {showEvents && selectedMonth === item.month && (
            <div ref={eventsRef}>
              {item.events.map((event) => (
                <div className="events-cont" key={event.date}>
                  <div className="event-first">
                    <p className="event-time">{event.time}</p>
                    <p className="event-name">{event['event-name']}</p>
                    <p className="event-attend">{event.date}</p>
                  </div>
                  <div className="event-second">
                    <p className="event-time">
                      <FaMapMarkerAlt className="news-article-icon" />
                      {event.location}
                    </p>
                    <button type="button" className="event-more">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SchoolCalendar;
