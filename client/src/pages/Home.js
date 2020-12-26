import Jombotron from '../components/cards/Jumbotron'
import NewArrivals from '../components/home/NewArrivals'
import BestSellers from '../components/home/BestSellers'
import CategoryList from '../components/category/CategoryList'
import SubList from '../components/sub/SubList'

const Home = () => {

	return (
		<>
		<div className='jumbotron h1 text-danger font-weigth-bold text-center'>
			<Jombotron text={['Latest product', 'New Arrivals', 'Best Sellers']} />
		</div>

		<h4 className='text-center p-3 mt-3 mb-5 display-3 jumbotron'>
			New Arrivals
		</h4>

		<NewArrivals /> 

		<h4 className='text-center p-3 mt-3 mb-5 display-3 jumbotron'>
			Best Sellers
		</h4>

		<BestSellers /> 

		<h4 className='text-center p-3 mt-3 mb-5 display-3 jumbotron'>
			Categories
		</h4>

		<CategoryList /> 

		<h4 className='text-center p-3 mt-3 mb-5 display-3 jumbotron'>
			Sub Categories
		</h4>

		<SubList /> 
		</>

		
	)
}

export default Home
