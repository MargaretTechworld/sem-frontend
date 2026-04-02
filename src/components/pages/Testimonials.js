import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import axios from 'axios';
import { FaArrowRight, FaArrowLeft, FaStar } from 'react-icons/fa';
import { API_URL, getImgUrl } from '../../apiConfig';
import '../styles/testimonials.css';

const Testimonials = () => {
  const NextArrow = ({ onClick }) => (
    <div
      className="arrow-test next-test"
      onClick={onClick}
      onKeyDown={onClick}
      role="button"
      tabIndex={0}
      aria-label="Next"
    >
      <FaArrowRight />
    </div>
  );

  NextArrow.propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  const PrevArrow = ({ onClick }) => (
    <div
      className="arrow-test prev-test"
      onClick={onClick}
      onKeyDown={onClick}
      role="button"
      tabIndex={0}
      aria-label="Previous"
    >
      <FaArrowLeft />
    </div>
  );

  PrevArrow.propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  const [testimonies, setTestimonies] = useState([]);

  const settings = {
    infinite: testimonies.length > 1,
    lazyLoad: true,
    speed: 300,
    slidesToShow: 1,
    centerMode: testimonies.length > 1,
    centerPadding: 0,
    nextArrow: testimonies.length > 1 ? <NextArrow onClick={() => { }} /> : null,
    prevArrow: testimonies.length > 1 ? <PrevArrow onClick={() => { }} /> : null,
    autoplay: testimonies.length > 1,
    autoplaySpeed: 3000,
  };

  useEffect(() => {
    const fetchTestimonies = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/content/testimonies`);
        const formatted = data.sections.map((s) => ({
          id: s.key,
          image: s.image,
          ...JSON.parse(s.content),
        }));
        setTestimonies(formatted);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    };
    fetchTestimonies();
  }, []);

  return (
    <div className="whyUs">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h1>Testimonials</h1>
        {testimonies.length > 0 && (
          <Slider
            infinite={settings.infinite}
            lazyLoad={settings.lazyLoad}
            speed={settings.speed}
            slidesToShow={settings.slidesToShow}
            centerMode={settings.centerMode}
            centerPadding={settings.centerPadding}
            nextArrow={settings.nextArrow}
            prevArrow={settings.prevArrow}
            autoplay={settings.autoplay}
            autoplaySpeed={settings.autoplaySpeed}
          >
            {testimonies.map((item) => (
              <div key={item.id || item.key}>
                <img className="testifier-img" src={getImgUrl(item.image)} alt={item.name} />
                <h2>{item.name}</h2>
                <div className="stars">
                  {Array.from({ length: item.rating }, (_, index) => (
                    <FaStar key={index} style={{ color: 'yellow' }} />
                  ))}
                </div>
                <p>{item.description}</p>
              </div>
            ))}
          </Slider>
        )}
      </motion.div>
    </div>
  );
};

export default Testimonials;
