// stripeService.js
import stripePackage from 'stripe';

const stripe = stripePackage(process.env.STRIPE_SECRET_KEY)
const createPaymentIntent = async (amount, paymentMethodId) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'USD',
      description: 'Your payment description',
      payment_method: paymentMethodId,
      confirm: true,
      return_url:"/hotels"
    });

    return paymentIntent;
  } catch (error) {
    console.error('Error creating Payment Intent:', error);
    throw error;
  }
};

export { createPaymentIntent };
