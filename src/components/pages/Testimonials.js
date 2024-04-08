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
    <div data-aos="fade" className="whyUs">
      <div data-aos="fade">
        <h1 data-aos="fade">Testimonials</h1>
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
            <div data-aos="fade" key={item.id}>
              <img data-aos="fade" className="testifier-img" src={item.image} alt={item.alt} />
              <h2 data-aos="fade">{item.name}</h2>
              <div data-aos="fade" className="stars">
                {Array.from({ length: item.rating }, (_, index) => (
                  <FaStar key={index} style={{ color: 'yellow' }} />
                ))}
              </div>
              <p data-aos="fade">{item.description}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonials;
