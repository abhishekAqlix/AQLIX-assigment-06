import React, { useState } from "react";
import API from "../config";

export default function RedeemCode() {
	const [couponData, setCouponData] = useState({
		code: "",
		userEmail: "",
	});

	const handleChange = (key, value) => {
		setCouponData((prev) => ({ ...prev, [key]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const { code, userEmail } = couponData;

		if (!code || !userEmail) {
			alert("All fields are required");
			return;
		}

		try {
			const payload = {
				code: code.trim().toUpperCase(),
				userEmail: userEmail.trim().toLowerCase(),
			};

			const res = await API.post("/coupon/redeem", payload);

			alert(res.data?.message || "Coupon redeemed successfully");

			setCouponData({
				code: "",
				userEmail: "",
			});
		} catch (error) {
			alert(error?.response?.data?.message || "Something went wrong");
			console.log(error);
		}
	};

	return (
		<div style={{ display: "flex", justifyContent: "center" }}>
			
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
                <h2>Redeem</h2>
				<div className="row">
					<label>Code</label>
					<input
						type="text"
						value={couponData.code}
						onChange={(e) => handleChange("code", e.target.value)}
					/>
				</div>

				<div className="row">
					<label>User Email</label>
					<input
						type="email"
						value={couponData.userEmail}
						onChange={(e) => handleChange("userEmail", e.target.value)}
					/>
				</div>

				<button type="submit">Redeem</button>
			</form>
		</div>
	);
}
