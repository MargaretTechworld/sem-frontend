import React from 'react';
import Intro from './Intro';
import AboutNav from './AboutNav';
import '../styles/about.css';
import mission from '../../images/mission.png';
import whyUs from '../../images/why-us.png';
import goals from '../../images/our-goals.png';

import Testimonials from './Testimonials';
import Staff from './Staff';

const About = () => {
  const links = [
    { to: '#Mission Statement', label: 'Mission Statement', id: 'Mission Statement' },
    { to: '#WhyUs', label: 'Why Us', id: 'WhyUs' },
    { to: '#Our Goals', label: 'Our Goals', id: 'Our Goals' },
    { to: '#Testimonies', label: 'Testimonies', id: 'Testimonies' },
    { to: '#Staff', label: 'Staff', id: 'Staff' },
  ];

  return (
    <div className="about-us">
      <Intro heading="About Us" paragraph="We are the chosen generation" />
      <div className="about-with-sidemenu">
        <AboutNav
          links={links}
        />
        <div data-aos="fade" className="side-menu-content">
          <div data-aos="slide-left" className="about-us-third-div">
            <img className="mission-img" src={mission} alt="img2" />
            <div>
              <h2 id="Mission Statement">Mission Statement</h2>
              <p className="mission-paragraph">
                {' '}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu
                risus at turpis vehicula dignissim. Donec condimentum, velit sit
                amet convallis ultricies, nisi turpis volutpat leo, at mattis
                mauris augue posuere odio. Maecenas luctus in turpis eu
                volutpat.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec eu risus at turpis vehicula dignissim. Donec condimentum,
                velit sit amet convallis ultricies, nisi turpis volutpat leo, at
                mattis mauris augue posuere odio. Maecenas luctus in turpis eu
                volutpat.
              </p>
            </div>
          </div>
          <div className="about-us-fourth-div">
            <div id="WhyUs">
              <h2>Why Us</h2>
              <p className="mission-paragraph">
                {' '}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu
                risus at turpis vehicula dignissim. Donec condimentum, velit sit
                amet convallis ultricies, nisi turpis volutpat leo, at mattis
                mauris augue posuere odio. Maecenas luctus in turpis eu
                volutpat.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec eu risus at turpis vehicula dignissim. Donec condimentum,
                velit sit amet convallis ultricies, nisi turpis volutpat leo, at
                mattis mauris augue posuere odio. Maecenas luctus in turpis eu
                volutpat.
              </p>
            </div>
            <img className="mission-img" src={whyUs} alt="img2" />
          </div>
          <div data-aos="slide-left" className="about-us-third-div">
            <img className="mission-img" src={goals} alt="img2" />
            <div id="Our Goals">
              <h2>Our Goals</h2>
              <p className="mission-paragraph">
                {' '}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu
                risus at turpis vehicula dignissim. Donec condimentum, velit sit
                amet convallis ultricies, nisi turpis volutpat leo, at mattis
                mauris augue posuere odio. Maecenas luctus in turpis eu
                volutpat.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec eu risus at turpis vehicula dignissim. Donec condimentum,
                velit sit amet convallis ultricies, nisi turpis volutpat leo, at
                mattis mauris augue posuere odio. Maecenas luctus in turpis eu
                volu tpat.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div id="Testimonies" className="about-testimonies">
        <Testimonials />
      </div>
      <div id="Staff">
        <Staff />
      </div>

    </div>
  );
};
export default About;
