import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductCardInCheckout from '../components/cards/ProductCardInCheckout';
import {userCart} from '../functions/user'

const Cart = ({history}) => {
  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const saveOrderToDb = () => {
		userCart(cart, user.token)
			.then(res => {
				console.log('cart post response', res);
				if(res.data.ok) history.push('/checkout')
			})
			.catch((err) => console.log('cart cave err', err))
		
	};

  const showCartItems = () => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>

      {cart.map((p) => (
				<ProductCardInCheckout key={p._id} p={p} />
))}
    </table>
  );

  const saveCashOrderToDb = () => {
    dispatch({
      type: 'COD',
      payload: true
    })
    userCart(cart, user.token)
    .then(res => {
      console.log('cart post response', res);
      if(res.data.ok) history.push('/checkout')
    })
    .catch((err) => console.log('cart cave err', err))
  }

  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-md-8">
          <h4>Cart /{cart.length} Product</h4>
          {!cart.length ? (
            <p>
              No Product in cart. <Link to="/shop">Cntinue Shopping</Link>
            </p>
          ) : (
            showCartItems()
          )}
        </div>
        <div className="col-md-4">
          <h4>Order Summary</h4>
          <hr />
          <p>Product</p>
          {cart.map((c, i) => (
            <div key={i}>
              <p>
                {c.title} x {c.count} = ${c.price * c.count}
              </p>
            </div>
          ))}
          <hr />
          Total: <b>${getTotal()}</b>
          <hr />
          {user ? (
            <>
            <button
              onClick={saveOrderToDb}
              className="btn btn-primary btn-sm mt-2"
              disabled={!cart.length}
            >
              Proceed to Checkout
            </button>
            <br/>
            <button
              onClick={saveCashOrderToDb}
              className="btn btn-warning btn-sm mt-2"
              disabled={!cart.length}
            >
              Pay Cash on Delivery
            </button>
            </>
          ) : (
            <button className="btn btn-primary btn-sm mt-2">
              <Link
                to={{
                  pathname: "/login",
                  state: { from: "cart" },
                }}
              >
                Login to Checkout
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
