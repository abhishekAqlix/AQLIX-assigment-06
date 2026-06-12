import React, { useState } from "react";
import API from "../config";

export default function CreateCoupon() {
  const [couponData, setCouponData] = useState({
    code: "",
    title: "",
    userEmail: "",
    maxRedemptions: "",
    expireAt: "",
  });

  const handleChange = (key, value) => {
    setCouponData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { code, title, userEmail, maxRedemptions, expireAt } = couponData;

    if (!code || !title || !userEmail || !maxRedemptions || !expireAt) {
      alert("All fields are required");
      return;
    }

    try {
      const payload = {
        code: code.trim().toUpperCase(),
        title: title.trim(),
        userEmail: userEmail.trim().toLowerCase(),
        maxRedemptions: Number(maxRedemptions),
        expireAt,
      };

      const res = await API.post("/coupon", payload);

      alert(res.data?.message || "Coupon created successfully");

      setCouponData({
        code: "",
        title: "",
        userEmail: "",
        maxRedemptions: "",
        expireAt: "",
      });
    } catch (error) {
      alert(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Create</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          maxWidth: "400px",
          minWidth: "300px",
        }}
      >
        <div className="row">
          <label>Title</label>
          <input
            type="text"
            value={couponData.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </div>

        <div className="row">
          <label>Code</label>
          <input
            type="text"
            value={couponData.code}
            onChange={(e) => handleChange("code", e.target.value)}
          />
        </div>

        <div className="row">
          <label>Creator Email</label>
          <input
            type="email"
            value={couponData.userEmail}
            onChange={(e) => handleChange("userEmail", e.target.value)}
          />
        </div>

        <div className="row">
          <label>Max Redemptions</label>
          <input
            type="number"
            min="1"
            value={couponData.maxRedemptions}
            onChange={(e) => handleChange("maxRedemptions", e.target.value)}
          />
        </div>

        <div className="row">
          <label>Expire At</label>
          <input
            type="date"
            value={couponData.expireAt}
            onChange={(e) => handleChange("expireAt", e.target.value)}
          />
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );
}