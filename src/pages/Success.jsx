import React from "react";
import "./Styling/Success.css";
import {db,auth} from '../firebase';
import {collection,addDoc } from "firebase/firestore";
//import { CartItem } from "../components/CartItem";
import { ShopContext } from "../context/ShopContext";


const order = collection(db, 'Order');

const add_order = async(orderID,trackingNumber) => {
  //const abc = {name: "A", namb: "B", namc: "C"};
  await addDoc(order,
    {
      orderID: orderID
      , trackingNumber: trackingNumber
      , customerid: auth.currentUser.uid
      , purchaseType: sessionStorage.getItem("purchaseType")
      , totalAmount: sessionStorage.getItem("totalAmount")
      , createddate: Date.now()
      , shipping:{
         "01_username": sessionStorage.getItem("username")
        , "02_firstName": sessionStorage.getItem("firstName")
        , "03_lastName": sessionStorage.getItem("lastName")
        , "04_city": sessionStorage.getItem("city")
        , "05_address": sessionStorage.getItem("address")
        , "06_state": sessionStorage.getItem("state" )
        , "07_zip": sessionStorage.getItem("zip")
               }
      , items1:{
        id:1
        ,productName:"Mens Helmet"
        , priceBuy: 156.99
        , priceRent: 50.99
        , NumberOrdered: 1
      }
      ,items2:{
        id:5
        ,productName:"Mens Snowboard"
        , priceBuy: 529.99
        , priceRent: 50.99
        , NumberOrdered: 2
      }
    }
    );
}

const Success = () => {
  const purchaseType = sessionStorage.getItem("purchaseType");
  const totalAmount = sessionStorage.getItem("totalAmount");
  let orderID = Math.random() * 100000000;
  let trackingNumber = Math.random() * 100000000;
  orderID = Math.floor(orderID);
  trackingNumber = Math.floor(trackingNumber);
  add_order(orderID,trackingNumber);
  return (
    <div className="content">
      <h1>Success!</h1>
      <p>
        You have chosen to {purchaseType} your gear for ${totalAmount}.
      </p>
      <p>
        Your order ID is <b> {orderID}</b> and your tracking number is{" "}
        <b> {trackingNumber}</b>.
      </p>
    </div>
  );
};

export default Success;
