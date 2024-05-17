
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const stripeSecretKey = 'sk_test_51PAL9I09idQbuC9s2Y2nnbKJV3n7h3ETb02CV0tTZz10RDXPUD5SoGKdYFyZBlgnVygNt9tSHfT2CutvGmOdtFH500ECHJxiKq';
const stripe = require('stripe')(stripeSecretKey);





const functions = require("firebase-functions");
//const { logger } = require("firebase-functions");
const express = require('express');
const cors = require('cors');

exports.helloWorld = functions.https.onRequest((request, response) => {
    logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
});

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get('/', (request, response) => response.status(200).send('hello world'));

app.post('/payments/create', async (request, response) => {
    const total = request.query.total;
    console.log('Payment Request Received BOOM!! for this amount', total);

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: 'usd',
        });

        response.send({ clientSecret: paymentIntent.client_secret})
    } catch (error) {
        console.error('Error creating payment intent:', error);
        response.status(500).send({ error: 'Failed to create payment intent' });
    }
});


exports.api = functions.https.onRequest(app);


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
