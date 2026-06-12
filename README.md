# Coupon Redemption System

## Backend

I have added `.env` file intentionally so backend can run easily.

Add your MongoDB connection string in:

```env
MONGO_DB_URI=
```

Run backend:

```bash
npm install
npm run dev
```

## Create Coupon

Add:

* Title
* Code
* User Email *(authentication is not added, so user email is stored to know who created coupon and same user cannot redeem it later)*
* Max Redemption
* Expiry Date

Click Create.

## Redeem Coupon

Add:

* Code
* User Email

Click Redeem.

## Features

* Create coupon
* Redeem coupon
* One user can redeem only once
* User who created coupon cannot redeem it
* Handle multiple requests for last coupon
