import { useEffect, useState } from "react";
import { getProduct, productStar } from "../functions/product";
import SingleProduct from "../components/cards/SingleProduct";
import {useSelector} from 'react-redux'
import {showAverage} from '../functions/rating'
import {getRelated} from '../functions/product';
import ProductCard from '../components/cards/ProductCatd'

const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([])
  const [star, setStar] = useState(0)

  const {user} = useSelector((state) => ({...state}))

  const { slug } = match.params;

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  useEffect(() => {
    if(product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star)
    }
  })

  const loadSingleProduct = () => {
    getProduct(slug).then((res) => {
      setProduct(res.data)
      getRelated(res.data._id).then(res => setRelated(res.data))
    });
  };

  const onStarClik = (newRating, name) => {
    setStar(newRating)
    productStar(name, newRating, user.token)
      .then(res => {
        loadSingleProduct()
        console.log(res.data);
      })
  }

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProduct 
        product={product} 
        onStarClik={onStarClik} 
        star={star}
        />
      </div>
      <div className="row">
        <div className='col text-center pt-5 pb-5'>
					<hr/>
					<h4>Related products</h4>
					<hr/>
				</div>
      </div>
      <div className="row pb-5">
        {related.length ? related.map((r) => <div className='col-md-4' key={r._id}>
          <ProductCard product={r} />
        </div>) : <div className='text-center col'>No products found</div>}
      </div>
    </div>
  );
};

export default Product;
