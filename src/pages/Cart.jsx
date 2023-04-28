import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { CartItem } from '../components/CartItem';
import { PRODUCTS } from '../data/Products';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import './Styling/Cart.css';
import PaymentPage from './Payment';

const Cart = () => {
  const { cartItems, getTotalCartAmount } = useContext(ShopContext);
  const { buyAmount, rentAmount } = getTotalCartAmount();
  const navigate = useNavigate();
  const styles = {
    display: 'flex',
    justifyContent: 'center',
  };

  const bttnStyle = {
    width: '215px',
    marginRight: '12px',
    marginLeft: '12px',
  };

  return (
    <div className='cart'>
      <div className='cartItems'>
        {PRODUCTS.map((Product) => {
          if (cartItems[Product.id] > 0) {
            return <CartItem data={Product} />;
          }
        })}
      </div>

      {buyAmount > 0 ? (
        <div className='checkout'>
          <h1 style={styles}> Your Cart Items </h1>
          <p style={styles}>Subtotal ${buyAmount}</p>
          <PaymentPage />
        </div>
      ) : (
        <h1> Your Cart is Empty! </h1>
      )}
    </div>
  );
};

export default Cart;
