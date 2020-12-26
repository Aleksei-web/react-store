import {useState, useEffect} from 'react';
import AdminNav from '../../../components/nav/AdminNav'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {getProduct, updateProduct} from '../../../functions/product'
import {getCategories, getCategorySubs} from '../../../functions/category';
import FileUpload from '../../../components/forms/FileUpload'
import {ImportOutlined, LoadingOutlined} from '@ant-design/icons';
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm'


const initialState = {
	title: '',
	description: '',
	price: '',
	category: '',
	subs: [],
	shipping: '',
	quantity: '',
	images: [],
	colors: ["Black", "Brown", "Silver", "White", "Blue"],
	brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
	color: '',
	brand: '',
}

const ProductUpdate = ({match, history}) => {
	const [values, setValues] = useState(initialState);
	const [subOptions, setSubOptions] = useState([]);
	const [categories, setCategories] = useState([]);
	const [arrayOfSubs, setArrayOfSubsIds] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState('');
	const [loading, setLoading] = useState(false);

	const {user} = useSelector((state) => ({...state}))

	const {slug} = match.params;

	useEffect(() => {
		loadProduct()
		loadCategories()
	}, [])

	const loadCategories = () => {
		getCategories().then((c) => {
			console.log('get categories in update', c.data)
			setCategories(c.data)
		})
	}

	const loadProduct = () => {
		getProduct(slug)
		.then(p => {
			setValues({...values, ...p.data})
			getCategorySubs(p.data.category._id)
			.then(res => {
				setSubOptions(res.data)
			})
			let arr = []
			p.data.subs.map((s) => {
				arr.push(s._id)
			})
			console.log('arr', arr)
			setArrayOfSubsIds((prev) => arr)
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		setLoading(true)

		values.subs = arrayOfSubs
		values.category = selectedCategory ? selectedCategory : values.category;

		updateProduct(slug, values, user.token)
			.then(res => {
				setLoading(false)
				toast.success(`${res.data.title} is updated`)
				history.push('admin/product')
			})
			.catch(err => {
				console.log(err)
				setLoading(false)
				toast.err(err.response.data.err)
			})
	}

	const handleChange = (e) => {
		setValues({...values, [e.target.name]: e.target.value})
	}

	const handleCategoryChange = (e) => {
		e.preventDefault()
		setValues({...values, subs: []})

		setSelectedCategory(e.target.value)

		getCategorySubs(e.target.value)
			.then(res => {
				console.log(res.data);
				setSubOptions(res.data)
			})
		if(values.category._id === e.target.value) {
			loadProduct()
		}
		setArrayOfSubsIds([])
	}

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminNav />
				</div>
				<div className="col-md-10">
				{loading ? <LoadingOutlined className='text-danger h1' /> : <h4>Product update</h4>}
					{/* {JSON.stringify(values)} */}

					<div className='p-3' >
						<FileUpload 
						values={values} 
						setValues={setValues} 
						setLoading={setLoading}
						/>
					</div>

				<ProductUpdateForm 
					handleSubmit={handleSubmit} 
					handleChange={handleChange} 
					setValues={setValues}
					values={values}
					handleCategoryChange={handleCategoryChange}
					categories={categories}
					subOptions={subOptions}
					arrayOfSubs={arrayOfSubs}
					setArrayOfSubsIds={setArrayOfSubsIds}
					selectedCategory={selectedCategory}
				/> 
				</div>
			</div>
		</div>
	)
}

export default ProductUpdate;
