import Products from './components/Products';
import Header from './components/Header';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Check from './components/Check';
import React, {useState, useEffect} from "react";
import {commerce} from './lib/commerce'
import './index.css';
import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = () => {
      commerce.products.list().then((product) => {
        const {data} = product;
          setProducts(data);        
      }).catch((error) => {
          console.log(error);
      })
  }

  const fetchCart = () => {
    commerce.cart.retrieve().then((_cart) => {
        setCart(_cart);
    })
  }

  const HandleSubmitOnCart = (productID, quantity) => {
    commerce.cart.add(productID, quantity).then((item) => {
        setCart(item);
    })
}

const HandleUpdateOnCart = (productID, quantity) => {
    commerce.cart.update(productID, {quantity}).then((item) => {
        setCart(item);
    })
}

const HandleRemoveOnCart = (productID) => {
    commerce.cart.remove(productID).then((item) => {
        setCart(item);
    })
}

const HandleEmptyCart = () => {
    commerce.cart.empty().then((item) => {
        setCart(item);
    })
}

  useEffect(() => {
      fetchProducts();
      fetchCart();
  }, [])


  return (
    <BrowserRouter>
    <div className="App">
        <Header itemCount={cart.total_items}/>
        <Routes>
            {/* <Route path='/' element={<Products products={products} onAddCart={HandleSubmitOnCart}/>}></Route>
            <Route path='/cart' element={<Cart cart={cart} products={products} HandleUpdateOnCart={HandleUpdateOnCart} HandleRemoveOnCart={HandleRemoveOnCart} HandleEmptyCart={HandleEmptyCart}/>}/>
            <Route path='/checkout' element={<Checkout cart={cart}/>}/> */}
            <Route path='/check' element={<Check/>}/>
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
