# Coupon Redemption System

## Backend

I have added `.env` intentionally to make backend setup easier.

Just add your MongoDB connection string in:

```env
MONGO_DB_URI=
```

Then run:

```bash
npm install
npm run dev
```

## Create Coupon

Add:

* Title
* Code
* User Email
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
* One user can redeem once
* Creator cannot redeem own coupon
* Handle multiple requests for last coupon
