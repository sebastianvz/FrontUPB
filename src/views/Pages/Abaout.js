import React from 'react';
import { Link } from 'react-router-dom';

import Button from "../../components/core/CustomButtons/Button.js";

const About = () => {
  return (
    <div>
      <h1>About</h1>
      <Link to="/">
        <Button color="primary" size="lg">
          go to home
        </Button>
      </Link>
    </div>
  );
};

export default About;
