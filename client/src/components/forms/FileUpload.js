import Resiser from 'react-image-file-resizer';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {Avatar, Badge} from 'antd';


const FileUpload = ({ values, setValues, setLoading }) => {
	const {user} = useSelector((state) => ({...state}))
	const fileUploadAndResize = (e) => {
		// console.log(e.target.files);
		let files = e.target.files;
		let allUploadedFiles = values.images;

		if(files) {
			setLoading(true)
			for(let i = 0; i < files.length; i++) {
				Resiser.imageFileResizer(files[i], 720, 720, 'JPEG', 100, 0, (uri) => {
					axios.post(`${process.env.REACT_APP_API}/uploadimages`, {image: uri}, {
						headers: {
							authtoken: user ? user.token : ''
						}
					})
						.then(res => {
							console.log('image upload res data', allUploadedFiles);
							setLoading(false)
							allUploadedFiles.push(res.data);

							setValues({...values, images: allUploadedFiles});
						})
						.catch(err => {
							console.log('cloudinary upload err', err);
						})
				}, 'base64')
				
			}
		}
	}

	const handleImageRemove = (public_id) => {
		setLoading(true)
		console.log('remove image', public_id)
		axios.post(
				`${process.env.REACT_APP_API}/removeimage`,
				{public_id},
				{
					headers: {
						authtoken: user ? user.token : '',
					}
				}
			)
			.then(res => {
				setLoading(false)
				const {images} = values
				let filteredImages = images.filter((item) => {
					return item.public_id !== public_id
				})
				setValues({...values, images: filteredImages})
			})
			.catch(err => {
				console.log(err)
				setLoading(false)
			})
	}

	return (
		<div>
		<div className='row'>
			{ values.images && values.images.map((image) => {
				return	<Badge 
				key={image.public_id}  
				count='X' 
				onClick={() => handleImageRemove(image.public_id)}
				style={{cursor: 'pointer'}}
			>
				<Avatar 
				src={image.url} 
				size={100} 
				className='ml-3' 
				shape='square'
			/>
			</Badge>
			}
			)}
		</div>
		<div className="row">
			<label className='btn btn-primary btn-raised'>Choose File
			<input 
			type="file" 
			multiple 
			hidden
			accept="images/*" 
			onChange={fileUploadAndResize} 
			/>
			</label>
		</div>
		</div>
	)
}

export default FileUpload;
