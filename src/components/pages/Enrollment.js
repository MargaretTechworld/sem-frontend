import React from 'react';
import '../styles/enrollment.css';
import { FaDownload } from 'react-icons/fa';

const Enrollment = () => (
  <div data-aos="fade" className="enrollment-div">
    <div className="enrollment-news flex-item">
      <h2 className="enrollment-news-heading">Destined for Greatness School Registration 2024</h2>
      <h3 className="enrollment-news-sub-heading">
        Destined for Greatness School is now accepting
        registration for the September 2021 to
        June 2022 school year.
      </h3>
      <p className="enrollment-news-info">
        For more information and to inform us of your interest, please phone
        the office at 705-752-4785, the School at 705-498-5605, or email
        info@destinedforgreatness-school.org. Destined for Greatness admission process
        for Grades K – 6
        involves a letter of request, completion and submission of the
        registration form, an interview, and a copy of school reports for the
        previous two years (if applicable).
      </p>
      <div>
        <a href="/resources/download.pdf" id="Get Application Form" className="enrollment-news-button" download="Application Form.pdf">
          {' '}
          <FaDownload />
          {' '}
          Download Application Form
        </a>
        <a href="/resources/download.pdf" id="Get Application Guide" className="enrollment-news-button" download="Application Guide.pdf">
          {' '}
          <FaDownload />
          {' '}
          Download Application Guide
        </a>
      </div>
    </div>
    <div className="enrollment-procedure flex-item">
      <h2 className="enrollment-news-heading">Enrollment Procedure</h2>
      <div className="enrollment-procedure-info-div">
        <div className="enrollment-procedure-info">
          <p className="enrollment-procedure-info-number">1.</p>
          <div className="enrollment-procedure-info-sub-div">
            <h4 className="enrollment-procedure-info-sub-heading">LETTER OF REQUEST</h4>
            <p className="enrollment-procedure-info-paragraph">
              Parents will submit a letter stating why you want your
              child to experience an education at Destined for Greatness School.
            </p>
          </div>
        </div>
        <div data-aos="fade-up" className="enrollment-procedure-info">
          <p className="enrollment-procedure-info-number">2.</p>
          <div className="enrollment-procedure-info-sub-div">
            <h4 className="enrollment-procedure-info-sub-heading">LETTER OF REQUEST</h4>
            <p className="enrollment-procedure-info-paragraph">
              Parents will submit a letter stating why you want your child
              to experience an education at Destined for Greatness School.
            </p>
          </div>
        </div>
        <div data-aos="fade-up" className="enrollment-procedure-info">
          <p className="enrollment-procedure-info-number">3.</p>
          <div className="enrollment-procedure-info-sub-div">
            <h4 className="enrollment-procedure-info-sub-heading">LETTER OF REQUEST</h4>
            <p className="enrollment-procedure-info-paragraph">
              Parents will submit a letter stating why you want your
              child to experience an education at Destined for Greatness School.
            </p>
          </div>
        </div>
        <div data-aos="fade-up" className="enrollment-procedure-info">
          <p className="enrollment-procedure-info-number">4.</p>
          <div className="enrollment-procedure-info-sub-div">
            <h4 className="enrollment-procedure-info-sub-heading">LETTER OF REQUEST</h4>
            <p className="enrollment-procedure-info-paragraph">
              Parents will submit a letter stating why you want your
              child to experience an education at Destined for Greatness School.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Enrollment;
