# Coupon Redemption System

## Backend

Create `.env`

```env
PORT=8000
MONGO_DB_URI=add_your_connection_string
FRONTEND_URL=http://localhost:3000
```

Add your MongoDB URL.

Run:

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
