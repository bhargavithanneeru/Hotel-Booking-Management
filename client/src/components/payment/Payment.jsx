import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState } from 'react';
import './payment.css';
import { Link, useHistory } from 'react-router-dom';

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#000",
      color: "#000",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#878787" },
    },
    invalid: {
      iconColor: "#ff0000",
      color: "#ff0000",
    },
  },
};

export default function Payment({ totalAmount, handlePayment }) {
  const [success, setSuccess] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        name: `${firstName} ${lastName}`,
        address: {
          line1: address,
        },
      },
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        await handlePayment(id, totalAmount*100);
        setSuccess(true)
      } catch (error) {
        console.log("Error processing payment:", error.message);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit} className="PaymentForm">
          <div className="personal-info-container">
            <div className="form-row">
              <label>
                First Name
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="form-row">
              <label>
                Last Name
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="form-row">
              <label>
                Address
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </label>
            </div>
          </div>
          <div className="card-details-container">
            <div className="form-row card">
              <CardElement options={CARD_OPTIONS} />
            </div>
          </div>
          <button className="pay-button">Pay</button>
        </form>
      ) : (
        <div className="success-message">
          <h2>Payment Successful! Thank you for choosing us!</h2>
        </div>
      )}
    </>
  );
}



















// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
// import axios from "axios"
// import React, { useState } from 'react'
// import './payment.css'


// const CARD_OPTIONS = {
// 	iconStyle: "solid",
// 	style: {
// 		base: {
// 			iconColor: "#c4f0ff",
// 			color: "#fff",
// 			fontWeight: 500,
// 			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
// 			fontSize: "16px",
// 			fontSmoothing: "antialiased",
// 			":-webkit-autofill": { color: "#fce883" },
// 			"::placeholder": { color: "#87bbfd" }
// 		},
// 		invalid: {
// 			iconColor: "#ffc7ee",
// 			color: "#ffc7ee"
// 		}
// 	}
// }

// export default function Payment() {
//     const [success, setSuccess ] = useState(false)
//     const stripe = useStripe()
//     const elements = useElements()


//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         const {error, paymentMethod} = await stripe.createPaymentMethod({
//             type: "card",
//             card: elements.getElement(CardElement)
//         })


//     if(!error) {
//         try {
//             const {id} = paymentMethod
//             const response = await axios.post("", {
//                 amount: 1000,
//                 id
//             })

//             if(response.data.success) {
//                 console.log("Successful payment")
//                 setSuccess(true)
//             }

//         } catch (error) {
//             console.log("Error", error)
//         }
//     } else {
//         console.log(error.message)
//     }
// }

//     return (
//         <>
//         {!success ? 
//         <form onSubmit={handleSubmit}>
//             <fieldset className="FormGroup">
//                 <div className="FormRow">
//                     <CardElement options={CARD_OPTIONS}/>
//                 </div>
//             </fieldset>
//             <button>Pay</button>
//         </form>
//         :
//        <div>
//            <h2>Thank you for choosing us!</h2>
//        </div> 
//         }
            
//         </>
//     )
// }