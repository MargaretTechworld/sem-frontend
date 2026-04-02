import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import {
  FaPlus,
} from 'react-icons/fa';
import { API_URL } from '../../apiConfig';
import '../styles/schoolCalendar.css';

const SchoolCalendar = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showQuestions, setShowQuestions] = useState(false);
  const questionsRef = useRef(null);

  const [faq, setFaq] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/content/faq`);
        const formatted = data.sections.map((s) => ({
          id: s.key,
          label: s.key.replace(/_/g, ' '),
          ...JSON.parse(s.content),
        }));
        setFaq(formatted);
        setLoading(false);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        setLoading(false);
      }
    };
    fetchFaq();
  }, []);

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

  if (loading) return null;

  return (
    <div className="news-section">
      <h2 className="news-section-heading">
        Frequently Asked Questions
      </h2>
      <p>
        Find answers to commonly asked questions about our services.
      </p>
      {faq.map((item) => (
        <div key={item.id} className="event-top">
          <div
            className="event-drop"
            onClick={() => handleCategorySelect(item.id)}
            role="button"
            tabIndex="0"
            onKeyDown={(event) => handleKeyDown(event, item.id)}
          >
            <h3 className="event-heading uppercase">{item.question}</h3>
            <FaPlus className="news-article-icon" />
          </div>
          {showQuestions && selectedCategory === item.id && (
            <div ref={questionsRef} className="events-cont">
              <p className="event-answer">{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SchoolCalendar;
