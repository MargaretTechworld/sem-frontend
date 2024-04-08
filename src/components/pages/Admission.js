import React from 'react';
import Intro from './Intro';
import AboutNav from './AboutNav';
import Enrollment from './Enrollment';

const Admission = () => {
  const links = [
    { to: '#Enrollment', label: 'Enrollment', id: 'Enrollment' },
    { to: '#Get Applicaation Form', label: 'Get Applicaation Form', id: 'Get Applicaation Form' },
    {
      to: '#Get Applicaation Guide',
      label: 'Get Application Guide',
      id: 'Get Application Guide',
    },
  ];
  return (
    <div>
      <Intro
        heading="Admission"
        paragraph="Thank you for visiting our page! We appreciate your interest in our institution.
          If you have any questions or need further information, please don't hesitate to contact us."
      />
      <div>
        <AboutNav links={links} />
      </div>
      <div id="Enrollment">
        <Enrollment />
      </div>
    </div>
  );
};

export default Admission;
