import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from '../../reducer/reducer';
import { useStateValue } from '../../StateProvider';
import {useHistory} from 'react-router-dom';
import './SubTotal.css';

function SubTotal() {
   const history = useHistory();
   const [{basket}, dispatch]= useStateValue();
   return (
      <div className="subtotal">
         <CurrencyFormat
            renderText={(value) => (
               <>
               <p>
                  Subtotal ({basket.length} items): <strong>{value}</strong>
               </p>
               <small className="subtotal__gift">
               <input type="checkbox"/>
               This order contains a gift
               </small>
               </>
            )}
            decimalScale={2}
            value={getBasketTotal(basket)}
            displayType={"text"}
            thousandsSeparator={true}
            prefix={"$"} 
         />

         <button onClick={e => history.push('/payment')}>Proceed to Checkout</button>
      </div>
   )
}

export default SubTotal
