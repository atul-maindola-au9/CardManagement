import React, { useEffect, useState } from 'react';
import DisplayCards from '../components/DisplayCards';
import { useHistory } from 'react-router-dom';

const Edit = () => {
	const editData = JSON.parse(window.localStorage.getItem('editData'));
	const [name, setName] = useState(editData.personname);
	const [designation, setDesignation] = useState(editData.designation);
	const [businessName, setBusinessName] = useState(editData.businessname);
	const [description, setDescription] = useState(editData.shortdescription);
	const [displayPhoto, setDisplayPhoto] = useState('');
	const [imgURL, setImgURL] = useState('');
	const [whatsappNumber, setWhatsappNumber] = useState(
		editData.whatsappnumber
	);
	const [contacts, setContacts] = useState(editData.contacts);
	const [singleAddress, setSingleAddress] = useState(editData.singleaddress);

	const history = useHistory();

	const handleChange = (e) => {
		setDisplayPhoto(e.target.files[0]);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (displayPhoto) {
			uploadPic();
		} else {
			setImgURL(editData.displayphoto);
		}
	};

	const editCard = () => {
		fetch(`/editcard`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: editData._id,
				personname: name,
				designation: designation,
				businessname: businessName,
				shortdescription: description,
				displayphoto: imgURL,
				whatsappnumber: whatsappNumber,
				contacts: contacts,
				singleaddress: singleAddress,
			}),
		})
			.then((res) => res.json())
			.then((result) => {
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
			});
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

	useEffect(() => {
		if (imgURL) {
			editCard();
		}
		// eslint-disable-next-line
	}, [imgURL]);
	return (
		<div className='wrapper'>
			<div className='form'>
				<form>
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
						<label for='exampleFormControlFile1'>
							Upload Picture
						</label>
						<input
							type='file'
							class='form-control-file btn'
							id='display_photo'
							style={{ width: '125px' }}
							onChange={handleChange}
						/>
					</div>

					<button
						type='submit'
						style={{ width: '100%' }}
						class='btn btn-success'
						onClick={(e) => handleSubmit(e)}
					>
						Edit Card
					</button>
				</form>
			</div>
			<DisplayCards />
		</div>
	);
};

export default Edit;
