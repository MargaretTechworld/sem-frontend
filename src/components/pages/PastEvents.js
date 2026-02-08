import React from 'react';
import '../styles/pastEvent.css';
import Image1 from '../../images/bg-1.jpg';
import logo from '../../images/logo1.png';

const PastEvents = () => (
  <section className="past-e-h">
    <div className="past-events-top">
      <div className="sect-div">
        <img className="sect-logo" src={logo} alt="logo" />
        <div>
          <h2 className="sect-heading">Tovanah Consulting Ltd.</h2>
          <p className="sect-p">
            At Tovanah Consulting Ltd., we believe in the transformative power of professional
            development to elevate lives and careers
          </p>
        </div>
      </div>
    </div>
    <div className="past-event">
      <div>
        <img className="past-event-img" src={Image1} alt="1st Thanksgiving Service" />
        <p>1st Thanksgiving Service</p>
      </div>
      <div>
        <img className="past-event-img" src={Image1} alt="picnic" />
        <p>Picnic</p>
      </div>
      <div>
        <img className="past-event-img" src={Image1} alt="carol service" />
        <p>Carol Service</p>
      </div>
      <div>
        <img className="past-event-img" src={Image1} alt="carol service" />
        <p>Sport</p>
      </div>
      <div>
        <img className="past-event-img" src={Image1} alt="carol service" />
        <p>Sport</p>
      </div>
      <div>
        <img className="past-event-img" src={Image1} alt="carol service" />
        <p>Sport</p>
      </div>
    </div>
  </section>
);

export default PastEvents;
