const router = require("express").Router();

router.use("/coupon", require("./couponRoutes"));

module.exports = router;