import Intro from './Intro';
// import AboutNav from './AboutNav';
// import Enrollment from './Enrollment';
import '../styles/about.css';

const Admission = () => (
  <div className="about-us">
    <Intro
      heading="Admission"
      paragraph="Thank you for visiting our page! We appreciate your interest in our institution. If you have any questions or need further information, please don't hesitate to contact us."
    />
    {/* <div className="about-with-sidemenu">
        <AboutNav links={links} />
        <div className="side-menu-content">
          <div id="Enrollment">
            <Enrollment />
          </div>
        </div>
      </div> */}
  </div>
);

export default Admission;
