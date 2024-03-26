import React from 'react';
import '../styles/pastEvent.css';
import Image1 from '../../images/bg-1.jpg';
import logo from '../../images/logo1.png';
import Image2 from '../../images/bg2.jpg';
import Image3 from '../../images/bg7.jpg';
import Image4 from '../../images/bg3.jpg';

const PastEvents = () => (
  <section>
    <div className="past-events-top">
      <div className="sect-div">
        <img className="sect-logo" src={logo} alt="logo" />
        <div>
          <h2 className="sect-heading">Destined For Greatness</h2>
          <p className="sect-p">
            At Destined for Greatness School, we believe in the power of a
            Christian education to transform lives. Our programs offer unique
            advantages that foster spiritual growth, academic excellence, and
            character development.
          </p>
        </div>
      </div>
    </div>
    <div className="past-event">
      <div>
        <img className="past-event-img" src={Image2} alt="1st Thanksgiving Service" />
        <p>1st Thanksgiving Service</p>
      </div>
      <div>
        <img className="past-event-img" src={Image1} alt="picnic" />
        <p>Picnic</p>
      </div>
      <div>
        <img className="past-event-img" src={Image4} alt="carol service" />
        <p>Carol Service</p>
      </div>
      <div>
        <img className="past-event-img" src={Image3} alt="carol service" />
        <p>Sport</p>
      </div>
    </div>
  </section>
);

export default PastEvents;
