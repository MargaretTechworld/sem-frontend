import React from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { FaArrowRight, FaArrowLeft, FaStar } from 'react-icons/fa';
import data from '../data/index.json';
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

  const settings = {
    infinite: true,
    lazyLoad: true,
    speed: 300,
    slidesToShow: 1,
    centerMode: true,
    centerPadding: 0,
    nextArrow: <NextArrow onClick={() => {}} />,
    prevArrow: <PrevArrow onClick={() => {}} />,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="whyUs">
      <div>
        <h1>Testimonials</h1>
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
          {data?.Testimonies?.map((item) => (
            <div key={item.id}>
              <img className="testifier-img" src={item.image} alt={item.alt} />
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
      </div>
    </div>
  );
};

export default Testimonials;
