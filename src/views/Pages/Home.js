import React from 'react';
import { Link } from 'react-router-dom';

import Button from "../../components/core/CustomButtons/Button.js";

const Home = () => {
	return (
		<div>
			<h1>HOME</h1>
			<Link to="abaout">
				<Button color="primary" size="lg">
					go to abaout
				</Button>
			</Link>
		</div>
	);
};

export default Home;
