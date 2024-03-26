import React from 'react';
import '../styles/homeAboutSection.css';
import imgHome1 from '../../images/bg3.jpg';
import imgHome2 from '../../images/bg6.jpg';
import imgHome3 from '../../images/bg4.jpg';

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
        <h3 className="home-about-sub-heading">Day Care Services</h3>
        <p className="home-about-paragraph">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu risus
          at turpis vehicula dignissim. Donec condimentum, velit sit amet
          convallis ultricies, nisi turpis volutpat leo, at mattis mauris augue
          posuere odio. Maecenas luctus in turpis eu volutpat.
        </p>
        <div className="learn-div">
          <p className="learn-more">learn more</p>
          <p className="learn-more arrow-r">&gt;</p>
        </div>
      </div>
      <div>
        <img className="home-img" src={imgHome3} alt="img2" />
        <h3 className="home-about-sub-heading">Nusery</h3>
        <p className="home-about-paragraph">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu risus
          at turpis vehicula dignissim. Donec condimentum, velit sit amet
          convallis ultricies, nisi turpis volutpat leo, at mattis mauris augue
          posuere odio. Maecenas luctus in turpis eu volutpat.
        </p>
        <div className="learn-div">
          <p className="learn-more">learn more</p>
          <p className="learn-more arrow-r">&gt;</p>
        </div>
      </div>
      <div>
        <img className="home-img" src={imgHome1} alt="img2" />
        <h3 className="home-about-sub-heading">Primary Class 1-5</h3>
        <p className="home-about-paragraph">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu risus
          at turpis vehicula dignissim. Donec condimentum, velit sit amet
          convallis ultricies, nisi turpis volutpat leo, at mattis mauris augue
          posuere odio. Maecenas luctus in turpis eu volutpat.
        </p>
        <div className="learn-div">
          <p className="learn-more">learn more</p>
          <p className="learn-more arrow-r">&gt;</p>
        </div>
      </div>
    </div>
  </div>
);

export default HomeAboutSection;
