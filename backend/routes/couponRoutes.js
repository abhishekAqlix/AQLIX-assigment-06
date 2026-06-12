const express = require("express");
const {
	createCoupon,
	getAllCoupon,
	redeemCoupon,
} = require("../controllers/coupon");
const router = express.Router();

router.post("/", createCoupon);

router.get("/", getAllCoupon);

router.post("/redeem", redeemCoupon);



module.exports = router;
