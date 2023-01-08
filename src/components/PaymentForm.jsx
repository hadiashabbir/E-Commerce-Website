import React from 'react';
import Review  from "./Review";
import { Elements, CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";


const PaymentForm = ({checkoutToken, backStep}) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    });
  }

  const stripePromise = loadStripe("pk_test_51LVb0cKSH3vL67Slsx9XZ1nS79mAkQ79I2KEN4Nk0Qem1L0xbCmA9XhGi9n8RYPHfkH8FWNI38E4UBDWwThBLiMx00Fmg3CSox");
  
  return (
    <div>
      <Review checkoutToken={checkoutToken}/>
      <hr />
      <Elements stripe={stripePromise}>
            <form onSubmit={handleSubmit}>
              <CardElement />
            <br />
            <div className='row'>
              <div className='col-12 col-md-6'>
                <button className='btn btn-outline-secondary' onClick={backStep}>Back</button>
              </div>
              <div className='col-12 col-md-6 text-end'>
                <button className='btn btn-primary'>Pay {checkoutToken.subtotal.formatted_with_symbol}</button>
              </div>
            </div>
          </form>
      </Elements> 
    </div>
  )
}

export default PaymentForm
