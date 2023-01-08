import React from 'react';
import Carditem  from "./Carditem";
import { Link } from "react-router-dom";

const Cart = ({cart, products, HandleUpdateOnCart, HandleRemoveOnCart, HandleEmptyCart}) => {
    const {line_items} = cart;
    
    const EmptyCart = () => {
        return(
            <>
            <div className='container mt-4'>
            <p>You have no items in your shopping cart, </p>
            <Link to='/'>start adding some!</Link>
            </div>
            </>
        );
    }

    const FilledCart = () => {
        return(
            <>
            <div className='row g-4 mt-1'>
            {
                line_items.map((item) => {
                    return(
                        <Carditem item={item} products={products} HandleUpdateOnCart={HandleUpdateOnCart} HandleRemoveOnCart={HandleRemoveOnCart}/>
                    );
                })
            }
            </div>
            <div className='row mt-5'>
                <div className='col-12 col-md-6'>
                    <h4>SubTotal: {cart.subtotal.formatted_with_symbol}</h4>
                </div>
                <div className='col-12 col-md-5 offset-md-1'>
                    <button type='button' className='btn btn-danger px-4 mx-2' onClick={() => HandleEmptyCart()}>EMPTY CART</button>
                    <Link to='/checkout'>
                    <button type='button' className='btn btn-primary px-4 mx-2'>CHECKOUT</button>
                    </Link>
                </div>
            </div>
            </>
        );
    }

    if(line_items == null) return "Loading...";
  return (
    <div className='container'>
        <div className='row'>
            <div className='col-12'>
                <h2>Your Shopping Cart</h2>
            </div>
        </div>
        {line_items.length === 0 ? <EmptyCart/> : <FilledCart/>}
    </div>
  )
}

export default Cart
