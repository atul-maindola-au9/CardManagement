import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Card = (props) => {
	const cardData = props.cardData;
	const handleDelete = (e, id) => {
		e.preventDefault();
		console.log('>>>>>ID', id);
		fetch('/deletecard', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				cardId: id,
			}),
		})
			.then((res) => res.json())
			.then((result) => {});
	};

	const handleEdit = () => {
		window.localStorage.setItem('editData', JSON.stringify(cardData));
	};

	return (
		<div className='card' style={{ width: '350px' }}>
			<img
				className='card-img-top'
				src={cardData.displayphoto}
				style={{ height: '350px' }}
				alt='Card_image'
			/>
			<div className='card-body'>
				<h4 className='card-title' style={{ textAlign: 'center' }}>
					{cardData.personname}
				</h4>
				<h5 className='card-text' style={{ textAlign: 'center' }}>
					{cardData.designation}
				</h5>
				<label
					className='card-text'
					style={{ marginTop: '15px', marginBottom: '25px' }}
				>
					Description:
					<p className='card-text'>{cardData.shortdescription}</p>
				</label>
				<h6 className='card-text'>
					Business Name: {cardData.businessname}
				</h6>
				<h6 className='card-text'>Address: {cardData.singleaddress}</h6>
				<h6 className='card-text'>
					WhatsApp: {cardData.whatsappnumber}
				</h6>
				<h6 className='card-text'>Contact: {cardData.contacts}</h6>

				<div className='buttons'>
					<Link
						to='/edit'
						style={{ width: '90px' }}
						className='btn btn-primary'
						onClick={handleEdit}
					>
						Edit
					</Link>
					<a
						href='/'
						style={{ width: '90px' }}
						className='btn btn-danger'
						onClick={(e) => handleDelete(e, cardData._id)}
					>
						Delete
					</a>
				</div>
			</div>
		</div>
	);
};

export default Card;
