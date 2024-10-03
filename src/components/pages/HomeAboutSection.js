import React from 'react';
import '../styles/homeAboutSection.css';
import imgHome1 from '../../images/primeimg.jpeg';
import imgHome2 from '../../images/crecheimg.jpeg';
import imgHome3 from '../../images/nursimg.jpeg';
import imgHome4 from '../../images/secondary.jpeg';
import imgHome5 from '../../images/dorm.jpg';
import imgHome6 from '../../images/external.jpeg';

const HomeAboutSection = () => (
  <div className="home-about">
    <h2 className="home-about-heading">About our School</h2>
    <p className="home-about-paragraph">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu risus at
      turpis vehicula dignissim. Donec condimentum, velit sit amet convallis
      ultricies, nisi turpis volutpat leo, at mattis mauris augue posuere odio.
      Maecenas luctus in turpis eu volutpat. Suspendisse potenti. Ut in aliquet
      lacus, vel pellentesque risus. Cras at justo erat. Donec commodo arcu
      ipsum, vel mattis urna tristique sit amet. Integer ultrices finibus
      blandit.
    </p>
    <div className="home-about-info">
      <div>
        <img className="home-img" src={imgHome2} alt="img2" />
        <h3 className="home-about-sub-heading">Creche</h3>
        <p className="home-about-paragraph">
          The school is established to provide qualitative education
          based on sound Christian principles. These principles are
          carefully integrated to guide the students and make them
          useful to themselves.
        </p>
      </div>

      <div>
        <img className="home-img" src={imgHome3} alt="img2" />
        <h3 className="home-about-sub-heading">Nursery</h3>
        <p className="home-about-paragraph">
          The school is established to provide qualitative education
          based on sound Christian principles. These principles are
          carefully integrated to guide the students and make them
          useful to themselves.
        </p>
      </div>
      <div>
        <img className="home-img" src={imgHome1} alt="img2" />
        <h3 className="home-about-sub-heading">Primary</h3>
        <p className="home-about-paragraph">
          The school is established to provide qualitative education
          based on sound Christian principles. These principles are
          carefully integrated to guide the students and make them
          useful to themselves.
        </p>
      </div>

      <div>
        <img className="home-img" src={imgHome4} alt="img2" />
        <h3 className="home-about-sub-heading">Secondary</h3>
        <p className="home-about-paragraph">
          The school is established to provide qualitative education
          based on sound Christian principles. These principles are
          carefully integrated to guide the students and make them
          useful to themselves.
        </p>
      </div>

      <div>
        <img className="home-img" src={imgHome5} alt="img2" />
        <h3 className="home-about-sub-heading">Boarding</h3>
        <p className="home-about-paragraph">
          The school is established to provide qualitative education
          based on sound Christian principles. These principles are
          carefully integrated to guide the students and make them
          useful to themselves.
        </p>
      </div>
      <div>
        <img className="home-img" src={imgHome6} alt="img2" />
        <h3 className="home-about-sub-heading">External Examinations</h3>
        <p className="home-about-paragraph">
          The school is established to provide qualitative education
          based on sound Christian principles. These principles are
          carefully integrated to guide the students and make them
          useful to themselves.
        </p>
      </div>
    </div>
  </div>
);

export default HomeAboutSection;
