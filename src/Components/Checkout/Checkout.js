import React from "react";
import { useStateValue } from "../../StateProvider";
import "./Checkout.css";
import CheckoutProduct from "./CheckoutProduct";
import SubTotal from "./SubTotal";

function Checkout() {
  const [{basket, user}, dispatch]= useStateValue();
  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://th.bing.com/th/id/R.0b620feb76ba2406064c20e049897c6d?rik=JkbDwAbGuu2qfQ&pid=ImgRaw&r=0"
          alt=""
        />
        <div>
          <h2>Hello {user?.email}!</h2>
          <h2 className="checkout__title">Your Shopping Cart</h2>
          <h2>
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                price={item.price}
                rating={item.rating}
                image={item.image}
              />
            ))}
          </h2>
        </div>
      </div>
      <div className="checkout__right">
        <SubTotal />
      </div>
    </div>
  );
}

export default Checkout;
