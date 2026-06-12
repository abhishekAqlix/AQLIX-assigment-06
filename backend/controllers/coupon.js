const { errorResponse, successResponse } = require("../utils/responseHelpers");
const Coupon = require("../model/couponModel");
const Redemption = require("../model/redeemModel");

exports.createCoupon = async (req, res) => {
	try {
		let { title, code, maxRedemptions, expireAt, userEmail } = req.body;

		if (!title || !code || !maxRedemptions || !expireAt || !userEmail) {
			return errorResponse(res, 400, "Missing fields");
		}

		code = code.trim().toUpperCase();
		userEmail = userEmail.trim().toLowerCase();

		const oldCoupon = await Coupon.findOne({ code });

		if (oldCoupon) {
			return errorResponse(res, 400, "Coupon already exists");
		}

		const coupon = await Coupon.create({
			title,
			code,
			userEmail,
			maxRedemptions,
			expireAt,
		});

		return successResponse(res, 201, "Coupon created", coupon);
	} catch (error) {
		console.log(error);
		return errorResponse(res, 500, "Server error");
	}
};

exports.getAllCoupon = async (req, res) => {
	try {
		const coupons = await Coupon.find();
		return successResponse(res, 200, "", coupons);
	} catch (error) {
		console.log(error);
		return errorResponse(res, 500, "Server error");
	}
};

exports.redeemCoupon = async (req, res) => {
	try {
		let { code, userEmail } = req.body;

		if (!code || !userEmail) {
			return errorResponse(res, 400, "Missing fields");
		}

		code = code.trim().toUpperCase();
		userEmail = userEmail.trim().toLowerCase();

		const coupon = await Coupon.findOne({ code });

		if (!coupon) {
			return errorResponse(res, 404, "Invalid coupon");
		}

		if (coupon.userEmail === userEmail) {
			return errorResponse(res, 400, "You cannot redeem this coupon");
		}

		if (coupon.expireAt && coupon.expireAt < new Date()) {
			return errorResponse(res, 400, "Coupon expired");
		}

		const used = await Redemption.findOne({
			couponId: coupon._id,
			userEmail,
		});

		if (used) {
			return errorResponse(res, 400, "Coupon already used");
		}

		const updatedCoupon = await Coupon.findOneAndUpdate(
			{
				_id: coupon._id,
				redeemedCount: { $lt: coupon.maxRedemptions },
			},
			{
				$inc: { redeemedCount: 1 },
			},
			{
				new: true,
			}
		);

		if (!updatedCoupon) {
			return errorResponse(res, 400, "Coupon limit reached");
		}

		await Redemption.create({
			couponId: coupon._id,
			userEmail,
		});

		return successResponse(res, 200, "Coupon redeemed");
	} catch (error) {
		console.log(error);

		if (error.code === 11000) {
			return errorResponse(res, 400, "Coupon already used");
		}

		return errorResponse(res, 500, "Server error");
	}
};