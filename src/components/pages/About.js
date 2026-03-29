import { motion } from 'framer-motion';
import AboutNav from './AboutNav';
import '../styles/about.css';
import mission from '../../images/bg2.jpg';
import Testimonials from './Testimonials';

const About = () => {
  const links = [
    { to: '#Mission Statement', label: 'Mission Statement', id: 'Mission Statement' },
    { to: '#Vision Statement', label: 'Vision Statement', id: 'Vision Statement' },
    { to: '#Core Values', label: 'Core Values', id: 'Core Values' },
    { to: '#Testimonies', label: 'Testimonies', id: 'Testimonies' },
  ];

  const coreValues = [
    {
      title: '🤝 Teamwork',
      text: 'We foster collaboration among staff, trainers, and clients, ensuring that diverse expertise is pooled to deliver holistic and impactful training. We enhance problem-solving, encourage knowledge sharing, and build a supportive environment where everyone contributes to client success.',
    },
    {
      title: '🎓 Professionalism',
      text: 'Professionalism is reflected in our conduct, communication, and service delivery. We ensure that trainers, speakers and mentors uphold high standards of ethics, confidentiality, and respect in our service delivery.',
    },
    {
      title: '🛡️ Integrity',
      text: 'Integrity is the foundation of trust. By being honest, transparent, and ethical in our dealings, we build credibility with clients and stakeholders.',
    },
    {
      title: '⚙️ Efficiency',
      text: 'We ensure that resources—time, knowledge, and tools—are used optimally to deliver high-quality services. We meet client needs promptly, adapt to changing demands, and maintain a competitive edge in service delivery.',
    },
    {
      title: '💪 Hard Work',
      text: 'We believe hard work drives excellence. It reflects our commitment to going the extra mile in research, content development, client support, and continuous improvement. This dedication ensures that clients receive value-driven, transformative learning experiences.',
    },
    {
      title: '💡 Innovation',
      text: 'We believe innovation drives the continuous improvement of training methods, content delivery, and client engagement. By embracing new technologies, creative problem-solving, and forward-thinking strategies, we stay ahead of industry trends and deliver cutting-edge solutions that meet evolving client needs.',
    },
    {
      title: '📌 Accountability',
      text: 'We believe accountability ensures that every team member takes ownership of their responsibilities and outcomes. Our accountability fosters a culture of trust, transparency, and reliability—as clients depend on accurate, ethical, and timely guidance. It also reinforces our commitment to measurable results and continuous growth.',
    },
  ];

  return (
    <div className="about-us">
      <div className="about-with-sidemenu">
        <AboutNav links={links} />
        <div className="side-menu-content">

          <motion.div
            className="about-section about-us-third-div"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img className="mission-img" src={mission} alt="Mission" />
            <div className="text-content">
              <h2 id="Mission Statement" className="section-title">Mission Statement</h2>
              <p className="mission-paragraph">
                At Tovanah Consulting Ltd, our mission is to provide bespoke legal training; empower professionals and organizations through mentorship and coaching services; dynamic thought leadership; create impactful online content and provide speaking engagement services that inspire growth and innovation. Through our commitment to financial literacy and lifelong learning, we equip individuals and organizations with the tools to succeed with confidence, clarity, and purpose in an ever-evolving world.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="about-section about-us-fourth-div"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-content" id="Vision Statement">
              <h2 className="section-title">Vision Statement</h2>
              <p className="mission-paragraph">
                To be Sierra Leone’s leading catalyst for transformation—empowering individuals and organizations through bespoke training that drives growth and excellence.
              </p>
            </div>
            <img className="mission-img" src={mission} alt="Vision" />
          </motion.div>

          <div id="Core Values" className="core-values-section">
            <motion.h2
              className="section-title center-title"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Core Values
            </motion.h2>
            <div className="core-values-grid">
              {coreValues.map((value, index) => (
                <motion.div
                  className="core-value-card"
                  key={value.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05, boxShadow: '0px 10px 30px rgba(0,0,0,0.15)' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <h3 className="value-title">{value.title}</h3>
                  <p className="value-text">{value.text}</p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
      <div id="Testimonies" className="about-testimonies">
        <Testimonials />
      </div>
    </div>
  );
};
export default About;
