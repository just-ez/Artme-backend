require('dotenv').config()

module.exports = {
    PORT: process.env.PORT || 8000,
    mongodburi: process.env.mongodburi,
    jwt_Secret_key: process.env.jwt_Secret_key,
    jwt_duration: '7 days',
    AMOUNT: 500,
    PAYSTACK_SECRET_KEY: process.env.PAYSTACK_SECRET_KEY,
    PAYSTACK_BASE_URL: 'https://api.paystack.co/transaction/',
    CONNECTION_TIMEOUT: 10000
}