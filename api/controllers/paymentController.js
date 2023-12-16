// controllers/paymentController.js
import { createPaymentIntent } from '../services/stripeService.js'; // Import your Stripe service

export const handlePayment = async (req, res, next) => {
  const { amount, id } = req.body;
  console.log("backend")

  try {
    // Call the function from your Stripe service
    const paymentIntent = await createPaymentIntent(amount, id);

    // Handle success
    res.json({
      success: true,
      paymentIntent,
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
