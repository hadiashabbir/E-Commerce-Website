import React from "react";
import Product from "./Product";

const Products = ({products, onAddCart}) => {
    return(
    <div className="container">
    <div className="row g-5">
                {
                    products.map((product) => {
                    return(
                        <Product product={product} onAddCart={onAddCart}/>
                        );
                    })
            }                    
  </div>
</div>
    );
}

export default Products;