const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const couponSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		unique: true,
		uppercase: true,
		required: "name is required",
		minlength: [6, 'too short'],
		maxlength: [12, 'to long']
	},
	expiry: {
		type: Date,
		required: true
	},
	discount: {
		type: Number,
		required: true
	}
}, {timestamps: true})

module.exports = mongoose.model('Coupon', couponSchema)