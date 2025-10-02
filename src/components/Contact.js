import React from 'react';
import './Contact.scss';

const Contact = () => {
  return (
    <div className="contact">
      <div className="container">
        <div className="contact-content">
          <h2 className="contact-title">Let's Connect</h2>
          <p className="contact-description">
            Always happy to connect and discuss interesting projects, technology trends, or potential collaborations.
          </p>
          
          <div className="contact-email">
            <a href="mailto:sakarim9124@gmail.com" className="email-link">
              sakarim9124@gmail.com
            </a>
          </div>
          
          <div className="contact-actions">
            <a href="mailto:sakarim9124@gmail.com" className="btn-primary">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="email-icon">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Email Me
            </a>
            
            <a
              href="/assets/resume@abdul_ps.pdf"
              download="Sayed_Abdul_Karim_Resume.pdf"
              className="btn-secondary"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="download-icon">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;