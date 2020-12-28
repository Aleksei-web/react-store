const express = require("express");

const router = express.Router();

const { authCheck } = require("../middlewares/auth");

const {
  userCart,
  getUserCart,
  emptyCart,
  saveAddress,
  applyCouponUserCart,
  createOrder,
  orders,
  addToWishlist,
  removeFromWishlist,
  wishlist,
  createCashOrder
} = require("../controllers/user");

router.post("/user/cart", authCheck, userCart); // save cart
router.get("/user/cart", authCheck, getUserCart);
router.delete("/user/cart", authCheck, emptyCart);
router.post("/user/address", authCheck, saveAddress);

router.post("/user/order", authCheck, createOrder);
router.post("/user/cash-order", authCheck, createCashOrder);
router.get("/user/orders", authCheck, orders)

router.post("/user/cart/coupon", authCheck, applyCouponUserCart);

router.post('/user/wishlist', authCheck, addToWishlist);
router.get('/user/wishlist', authCheck, wishlist);
router.put('/user/wishlist/:productId', authCheck, removeFromWishlist);

// router.get('/user', (req, res) => {
// 	res.json({
// 		data: 'hey you hit user API',
// 	})
// })

module.exports = router;
