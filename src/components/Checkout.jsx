import React, {useState, useEffect} from "react";
import { Stepper, Step } from "react-form-stepper";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import { commerce } from "../lib/commerce";

const Checkout = ({cart}) => {
  const steps = ["Shipping Address", "Payment details"];

  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setcheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});

  const nextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }

  const backStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }

  const next = (data) => {
    setShippingData(data);
    nextStep();
  }

  const Confirmation = () => {
    return <div>Confirmation</div>;
  };
  const FormDisplay = ({checkoutToken}) => {
    return activeStep === 0 ? <AddressForm  checkoutToken={checkoutToken} next={next}/> : <PaymentForm checkoutToken={checkoutToken} backStep={backStep}/>;
  };

  useEffect(() => {
      commerce.checkout.generateToken(cart.id, {type: 'cart'}).then((token) => {
        setcheckoutToken(token);
      }).catch()
  } , [cart])

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
                <div className="row">
                    <div className="col-12 text-center">
                  <h4>Checkout</h4>
                    </div>
                </div>
                <div className="row">
                  <Stepper activeStep={activeStep}>
                    {steps.map((step) => {
                      return <Step label={step}></Step>;
                    })}
                  </Stepper>
                </div>
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10">
                  {activeStep === steps.length ? (
                      <Confirmation />
                      ) :   
                      ( checkoutToken &&
                          <FormDisplay checkoutToken={checkoutToken}/>
                          )
                         }
                          </div>
                </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
