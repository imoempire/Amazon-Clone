import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import React, { useState, useEffect } from "react";
import CurrencyFormat from "react-currency-format";
import { Link, useHistory } from "react-router-dom";
import { getBasketTotal } from "../../reducer/reducer";
import { useStateValue } from "../../StateProvider";
import CheckoutProduct from "../Checkout/CheckoutProduct";
import "./Payment.css";
import axios from "../axios";

const Payment = () => {
   const history = useHistory();
  const [{ basket, user }, dispatch] = useStateValue();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [clientSecret, setClientSecret] = useState("true");

  const stripe = useStripe();
  const elements = useElements();

   useEffect(()=>{

      const getClientSecret = async ()=>{
         const res = await axios({
            method: 'post',
            url: `./payments/create?total=${getBasketTotal(basket) * 100}`
         });
      getClientSecret(res.data.clientSecret);
      }
   }, [basket])

  const handleSubmit = async (e) => {
     e.preventDefault();
     setProcessing(true);
     const payload = await stripe.confirmCardPayment(clientSecret, 
      {
         payment_method: 
      {
         card: elements.getElement(CardElement)
      }
   }).then(({ paymentIntent })=>{
      setSucceeded(true);
      setError(null);
      setProcessing(false);

      history.replace('/orders')
   }) 
  };
  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment__container">
      <h1>
        <Link to="/checkout">CheckOut ({basket?.length} items)</Link>
      </h1>
      <div className="payment__section">
        <div className="payment__title">
          <h3>Delivery Address</h3>
        </div>
        <div className="payment__address">
          <h3>{user?.email}</h3>
          <p>123 React Lane</p>
          <p>Los Angeles, CA</p>
        </div>
      </div>

      <div className="payment__section">
        <div className="payment__title">
          <h3>Review items and delivery</h3>
        </div>
        <div className="payment__items">
          {basket.map((item) => (
            <CheckoutProduct
              id={item.id}
              title={item.title}
              price={item.price}
              rating={item.rating}
              image={item.image}
            />
          ))}
        </div>
      </div>

      <div className="payment__section">
        <div className="payment__title">
          <h3>Payment Method</h3>
        </div>
        <div className="payment__details">
          <form onSubmit={handleSubmit}>
            <CardElement onChange={handleChange} />
            <div className="payment__priceContainer">
              <CurrencyFormat
                renderText={(value) => <h3>Order Total: {value}</h3>}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
              <button disabled={processing || disabled || succeeded}>
                <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
              </button>
            </div>
            {error && <div>{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
