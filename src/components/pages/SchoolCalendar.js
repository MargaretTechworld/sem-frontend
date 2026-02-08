import React, { useState, useRef } from 'react';
import {
  FaPlus,
} from 'react-icons/fa';
import data from '../data/index.json';
import '../styles/schoolCalendar.css';

const SchoolCalendar = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showQuestions, setShowQuestions] = useState(false);
  const questionsRef = useRef(null);

  const handleCategorySelect = (category) => {
    if (selectedCategory === category) {
      setShowQuestions(!showQuestions);
    } else {
      setSelectedCategory(category);
      setShowQuestions(true);
    }

    setTimeout(() => {
      if (questionsRef.current) {
        questionsRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  };

  const handleKeyDown = (event, category) => {
    if (event.key === 'Enter') {
      handleCategorySelect(category);
    }
  };

  return (
    <div className="news-section">
      <h2 className="news-section-heading">
        Frequently Asked Questions
      </h2>
      <p>
        Find answers to commonly asked questions about our services.
      </p>
      {data?.Events?.map((item) => (
        <div key={item.id} className="event-top">
          <div
            className="event-drop"
            onClick={() => handleCategorySelect(item.month)}
            role="button"
            tabIndex="0"
            onKeyDown={(event) => handleKeyDown(event, item.month)}
          >
            <h3 className="event-heading uppercase">{item.month}</h3>
            <FaPlus className="news-article-icon" />
          </div>
          {showQuestions && selectedCategory === item.month && (
            <div ref={questionsRef}>
              {item.events.map((event) => (
                <div className="events-cont" key={event.date}>
                  <p className="event-name">{event['event-name']}</p>
                  <p className="event-answer">{event.answer}</p>
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
