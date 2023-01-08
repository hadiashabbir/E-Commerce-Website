import React, { Component } from "react";
import {
  Elements,
  useElements,
  useStripe,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51LVb0cKSH3vL67Slsx9XZ1nS79mAkQ79I2KEN4Nk0Qem1L0xbCmA9XhGi9n8RYPHfkH8FWNI38E4UBDWwThBLiMx00Fmg3CSox"
);

const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();

    if (elements == null) {
        return;
      }

      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement)
      });
}

class Check extends Component {
  render() {
    return (
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {(stripe, elements) => (
            <form onSubmit={(e) => this.handleSubmit(e, elements, stripe)}>
              <CardElement />
              <button type="submit">Pay</button>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    );
  }
}

export default Check;
