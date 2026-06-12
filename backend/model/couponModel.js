const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
    },
    userEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    maxRedemptions: {
      type: Number,
      required: true,
    },
    redeemedCount: {
      type: Number,
      default: 0,
    },
    redeemedBy: {
      type: [String],
      default: [],
    },
    expireAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Coupon", couponSchema);