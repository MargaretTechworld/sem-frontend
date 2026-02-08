import React from 'react';
import { FaEnvelope, FaPhone } from 'react-icons/fa';
import Intro from './Intro';
import '../styles/contactUs.css';

const ContactUs = () => (
  <div>
    <Intro heading="Contact Us" />
    <div className="contact-page">
      <div className="contact-info">
        <div className="contact-info-div">
          <h1>Contact us</h1>
          <p className="contact-p">We would be thrilled to hear from you! Don&apos;t hesitate to reach out to us and discover the amazing opportunities our school has to offer. </p>
          <p className="contact-p">
            {' '}
            <FaEnvelope />
            {' '}
            info@example.com
          </p>
          <p className="contact-p">
            <span className="flip-icon"><FaPhone /></span>
            (123) 456-7890
          </p>
        </div>
        <form className="contact-form">
          <h1>
            We will love to hear from you
            <br />
            {' '}
            Let&apos;s get intouch
          </h1>
          <input type="text" placeholder="Your Name" />
          <textarea placeholder="Your Message" />
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  </div>
);

export default ContactUs;
