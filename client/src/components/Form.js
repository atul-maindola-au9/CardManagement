import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
const Form = () => {
	const [name, setName] = useState('');
	const [designation, setDesignation] = useState('');
	const [businessName, setBusinessName] = useState('');
	const [description, setDescription] = useState('');
	const [displayPhoto, setDisplayPhoto] = useState('');
	const [imgURL, setImgURL] = useState('');
	const [whatsappNumber, setWhatsappNumber] = useState();
	const [contacts, setContacts] = useState('');
	const [singleAddress, setSingleAddress] = useState('');

	const history = useHistory();

	const handleChange = (e) => {
		setDisplayPhoto(e.target.files[0]);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		uploadPic();
	};

	const uploadPic = () => {
		const data = new FormData();
		data.append('file', displayPhoto);
		data.append('upload_preset', 'fb-clone');
		data.append('cloud_name', 'dkujunhej');

		fetch('https://api.cloudinary.com/v1_1/dkujunhej/image/upload', {
			method: 'POST',
			body: data,
		})
			.then((res) => res.json())
			.then((data) => setImgURL(data.url))
			.catch((err) => console.log(err));
	};

	const uploadCard = () => {
		let cardData = {};

		cardData = {
			personname: name,
			designation: designation,
			businessname: businessName,
			shortdescription: description,
			displayphoto: imgURL,
			whatsappnumber: whatsappNumber,
			contacts: contacts,
			singleaddress: singleAddress,
		};
		console.log('>>>>>', cardData);

		fetch('/addcard', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Accept-Language': 'en-US,en;q=0.8',
			},
			body: JSON.stringify(cardData),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log('data getting stored in post data>>>', data);
			})
			.catch((err) => console.log(err));
		setName('');
		setImgURL('');
		setSingleAddress('');
		setBusinessName('');
		setDescription('');
		setWhatsappNumber('');
		setDisplayPhoto('');
		setContacts('');
		setDesignation('');
		history.push('/card/raj-patel');
	};

	useEffect(() => {
		if (imgURL) {
			uploadCard();
		}
		// eslint-disable-next-line
	}, [imgURL]);
	return (
		<div className='form'>
			<form onSubmit={handleSubmit}>
				<div class='form-group'>
					<input
						type='text'
						class='form-control'
						placeholder='Enter Name'
						id='name'
						value={name}
						onChange={(e) => setName(e.target.value)}
						autoFocus
						required
					/>
				</div>
				<div class='form-group'>
					<input
						type='text'
						class='form-control'
						placeholder='Enter Designation'
						id='designation'
						value={designation}
						onChange={(e) => setDesignation(e.target.value)}
						required
					/>
				</div>
				<div class='form-group'>
					<input
						type='text'
						class='form-control'
						placeholder='Enter Business name'
						id='business_name'
						value={businessName}
						onChange={(e) => setBusinessName(e.target.value)}
						required
					/>
				</div>
				<div class='form-group'>
					<textarea
						type='text'
						class='form-control'
						placeholder='Enter Description'
						id='description'
						maxLength='150'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						required
					/>
				</div>
				<div class='form-group'>
					<input
						type='text'
						class='form-control'
						placeholder='Enter Address'
						id='address'
						value={singleAddress}
						onChange={(e) => setSingleAddress(e.target.value)}
						required
					/>
				</div>
				<div class='form-group'>
					<input
						type='text'
						pattern='[0-9]+'
						class='form-control'
						placeholder='Enter WhatsApp Number'
						id='whatsapp_number'
						value={whatsappNumber}
						onChange={(e) => setWhatsappNumber(e.target.value)}
						required
					/>
				</div>
				<div class='form-group'>
					<input
						type='text'
						pattern='[0-9]+'
						class='form-control'
						placeholder='Enter Contact Details'
						id='contacts'
						value={contacts}
						onChange={(e) => setContacts(e.target.value)}
						required
					/>
				</div>
				<div class='form-group'>
					<label for='exampleFormControlFile1'>Upload Picture</label>
					<input
						type='file'
						class='form-control-file btn'
						id='display_photo'
						style={{ width: '125px' }}
						onChange={handleChange}
						required
					/>
				</div>

				<button
					type='submit'
					style={{ width: '100%' }}
					class='btn btn-success'
				>
					Add Card
				</button>
			</form>
		</div>
	);
};

export default Form;
