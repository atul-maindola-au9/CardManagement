import React, { useEffect, useState } from 'react';
import Card from './Card';
const Cards = () => {
	const [cardList, setCardList] = useState([]);
	const syncCard = () => {
		fetch('/card/raj-patel', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				// 'Access-Control-Allow-Origin': '*',
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setCardList(data);
				console.log('data getting stored in post data>>>', data);
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		syncCard();
	}, []);
	return (
		<div className='cards'>
			{cardList.map((card) => (
				<Card cardData={card} />
			))}
		</div>
	);
};

export default Cards;
