import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaRegCalendarAlt, FaChevronRight } from 'react-icons/fa';
import SchoolCalendar from './SchoolCalendar';
import '../../styles/admin.css';
import '../../styles/news_redesign.css'; // Reusing some base utility styles if needed, but primarily custom CSS likely needed

const NewsEvents = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/content/news');
        const formattedNews = data.sections.map((section) => {
          try {
            return {
              id: section.key,
              image: section.image,
              ...JSON.parse(section.content),
            };
          } catch (e) {
            return { id: section.key, title: 'Error parsing news', info: section.content };
          }
        });
        setNews(formattedNews);
        setLoading(false);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Error fetching news:', err);
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  if (loading) return <div style={{ padding: '4rem', textAlign: 'center' }}>Loading News & Events...</div>;

  return (
    <div className="news-events-container" style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '4rem 1rem' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <header style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <h1 style={{
            fontSize: '3rem', fontWeight: '800', color: '#0f172a', marginBottom: '1rem', letterSpacing: '-0.025em',
          }}
          >
            News &
            {' '}
            <span style={{ color: '#3b82f6' }}>Events</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#64748b' }}>Stay updated with the latest happenings at our institution.</p>
        </header>

        <motion.div
          className="news-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ display: 'grid', gap: '2rem', marginBottom: '6rem' }}
        >
          {news.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="news-card"
              style={{
                backgroundColor: '#fff',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                display: 'flex',
                flexDirection: window.innerWidth > 768 ? 'row' : 'column',
                border: '1px solid #e2e8f0',
              }}
            >
              <div style={{ flex: '0 0 350px', position: 'relative' }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover', minHeight: '250px',
                  }}
                />
              </div>
              <div style={{
                padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column',
              }}
              >
                <div style={{
                  display: 'flex', alignItems: 'center', color: '#3b82f6', fontSize: '0.875rem', fontWeight: '600', marginBottom: '1rem',
                }}
                >
                  <FaRegCalendarAlt style={{ marginRight: '0.5rem' }} />
                  {item.date}
                </div>
                <h3 style={{
                  fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', marginBottom: '1rem', lineHeight: 1.2,
                }}
                >
                  {item.title}
                </h3>
                <p style={{ color: '#64748b', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  {expandedId === item.id ? item.info : `${item.info.substring(0, 180)}...`}
                </p>
                <button
                  type="button"
                  onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                  style={{
                    marginTop: 'auto',
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#3b82f6',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    padding: 0,
                    fontSize: '1rem',
                  }}
                >
                  {expandedId === item.id ? 'Read Less' : 'Read More'}
                  <FaChevronRight style={{ marginLeft: '0.5rem', fontSize: '0.75rem' }} />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <section id="faq" style={{ marginTop: '8rem' }}>
          <SchoolCalendar />
        </section>
      </div>
    </div>
  );
};

export default NewsEvents;
