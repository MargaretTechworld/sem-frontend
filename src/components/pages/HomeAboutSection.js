import React from 'react';
import '../styles/homeAboutSection.css';
import imgHome1 from '../../images/bg-1.jpg';
import imgHome2 from '../../images/bg2.jpg';
import imgHome3 from '../../images/course1.png';

const HomeAboutSection = () => (
  <div className="home-about">
    <h2 className="home-about-heading">About Tovanah Consulting Ltd.</h2>
    <p className="home-about-paragraph">
      Tovanah Consulting Ltd. is dedicated to empowering individuals and organizations
      through expert training and consulting services. We specialize in diverse areas
      such as Leadership Development, Mentorship Programs, and Personal Growth Workshops.
      Our mission is to cultivate a culture of excellence and inspire actionable change
      in both personal and professional settings. With a team of experienced consultants,
      we tailor our programs to meet the unique needs of our clients, ensuring impactful
      and measurable results.
    </p>
    <div className="home-about-info">
      <div>
        <img className="home-img" src={imgHome1} alt="img2" />
        <h3 className="home-about-sub-heading">Leadership Development</h3>
        <p className="home-about-paragraph">
          Our Leadership Development programs are designed to equip aspiring and existing
          leaders with essential skills to navigate the complexities of today&#39;s business
          environment. Through interactive workshops, coaching, and experiential learning,
          we foster an environment where leaders can grow, innovate, and transform their
          organizations.
        </p>
      </div>
      <div>
        <img className="home-img" src={imgHome2} alt="img2" />
        <h3 className="home-about-sub-heading">Mentorship Programs</h3>
        <p className="home-about-paragraph">
          At Tovanah Consulting Ltd., we believe in the power of mentorship as a catalyst
          for personal and professional growth. Our mentorship programs connect individuals
          with seasoned professionals, providing guidance, insights, and valuable networking
          opportunities. We strive to create meaningful mentor-mentee relationships that
          inspire and facilitate growth at every stage of one&#39;s career.
        </p>
      </div>
      <div>
        <img className="home-img" src={imgHome3} alt="img2" />
        <h3 className="home-about-sub-heading">Tailored Consulting Services</h3>
        <p className="home-about-paragraph">
          We offer bespoke consulting services to organizations aiming to enhance their
          performance and effectiveness. From strategic planning to team development, our
          experts work closely with clients to identify challenges and implement solutions
          that drive sustainable success. Whether you are a startup or an established company,
          our consulting services are tailored to help you achieve your business objectives.
        </p>
      </div>
    </div>
  </div>
);

export default HomeAboutSection;
