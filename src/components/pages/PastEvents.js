import React from 'react';
import '../styles/pastEvent.css';
import Image1 from '../../images/grad.jpeg';
import Image2 from '../../images/culture.jpeg';
import Image3 from '../../images/bg7.jpg';
import Image4 from '../../images/career.jpeg';
import Image5 from '../../images/excursion.jpeg';
import Image6 from '../../images/electrical.jpeg';

const PastEvents = () => (
  <section>
    <div className="past-events-top">
      <div className="sect-div">
        <div>
          <h2 className="sect-heading">School Album</h2>
          <p className="sect-p">
            At Virgitab International School, we believe in the power of a
            Christian education to transform lives. Our programs offer unique
            advantages that foster spiritual growth, academic excellence, and
            character development.
          </p>
        </div>
      </div>
    </div>
    <div className="past-event">
      <div>
        <img className="past-event-img" src={Image1} alt="1st Thanksgiving Service" />
        <p>Graduation Ceremony</p>
      </div>
      <div>
        <img className="past-event-img" src={Image2} alt="picnic" />
        <p>Cultural Day</p>
      </div>
      <div>
        <img className="past-event-img" src={Image3} alt="carol service" />
        <p>Interhouse Sports</p>
      </div>
      <div>
        <img className="past-event-img" src={Image4} alt="carol service" />
        <p>Career Day</p>
      </div>
      <div>
        <img className="past-event-img" src={Image5} alt="carol service" />
        <p>Excursion</p>
      </div>
      <div>
        <img className="past-event-img" src={Image6} alt="carol service" />
        <p>Electrical Practicals</p>
      </div>
    </div>
  </section>
);

export default PastEvents;
