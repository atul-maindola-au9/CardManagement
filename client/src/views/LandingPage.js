import React from 'react';
import DisplayCards from '../components/DisplayCards';
import Form from '../components/Form';

const LandingPage = () => {
	return (
		<>
			<div className='wrapper'>
				<Form />
				<DisplayCards />
			</div>
		</>
	);
};

export default LandingPage;
