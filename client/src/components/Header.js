import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<div className='header'>
			<div className='header__center'>
				<div className='header_title'>
					<Link
						to='/card/raj-patel'
						style={{ textDecoration: 'none' }}
					>
						<h1>Card Management System</h1>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Header;
