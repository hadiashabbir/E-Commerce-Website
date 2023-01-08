import React from "react";

const Review = ({ checkoutToken }) => {
    console.log(checkoutToken);
    return (
    <>
      <div className="row">
        <div className="col-12">
          <h6>Order Summary</h6>
        </div>
      </div>
      <div className="row">
        {checkoutToken.line_items.map((product) => {
          return (
            <>
              <div className="col-12 col-md-6 mt-4">
                <strong>{product.name}</strong>
                <br />
                <small>Quantity: {product.quantity}</small>
              </div>
              <div className="col-12 col-md-6 text-end">
                <p>{product.price.formatted_with_symbol}</p>
              </div>
            </>
          );
        })}
      </div>
      <div className="row mt-4">
        <div className="col-12 col-md-6">
           <strong>Total</strong>
           <p>{checkoutToken.subtotal.formatted_with_symbol}</p>
        </div>
      </div>
    </>
  );
};

export default Review;
