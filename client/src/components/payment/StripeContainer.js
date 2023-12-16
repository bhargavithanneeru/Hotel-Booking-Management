import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import Payment from "./Payment"


const PUBLIC_KEY = "pk_test_51OICBpH68e2xXeF3JDpKDjBfY45UhjFilyJKgORWpG91XxQwrGFGSbkA1xCTKBlYBgL62cwbLiE3QHYMmNRZFrHj00du2InNmi"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer({ totalAmount, handlePayment }) {
	return (
		<Elements stripe={stripeTestPromise}>
        <Payment totalAmount={totalAmount} handlePayment={handlePayment} />
        </Elements>
	)
}