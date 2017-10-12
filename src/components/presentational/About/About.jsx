import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

const About = ({ children }) => (
  <div className="about">
    <div className="container">
      <h2 className="about__title">
        About Address list show
      </h2>
      <p className="about__desc">
        This is Address list show web app. use store from https://firebase.google.com/.
      </p>
      <p className="about__copyright">
        Design by Tuan Anh (tuananh.exp@gmail.com)
      </p>
      <button
        className="btn btn-danger"
        onClick={() => browserHistory.push('/')}
      >
        Go back home
      </button>
      { children }
    </div>
  </div>
);

About.propTypes = {
  children: PropTypes.any
};

export default About;
