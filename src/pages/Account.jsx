import React, { useState,useEffect } from "react";
import { TextField, Button } from "@mui/material";
import "./Styling/LoginForm.css";
import { useNavigate } from "react-router-dom";
import "./Styling/Account.css";
import { collection, getDocs,doc,query,where } from "firebase/firestore";
// db
import {auth,db} from '../firebase';
// import {  createUserWithEmailAndPassword  } from 'firebase/auth';
// import {auth} from '../firebase';

const Account = () => {
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  const password = sessionStorage.getItem("password");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
 
  const handlePasswordSubmit = (event) => {
    event.preventDefault();
    if (password === oldPassword) {
      alert("Password Changed");
      sessionStorage.setItem("password", newPassword);
    } else {
      alert("Password Incorrect");
    }
  };
  useEffect(() => {

    console.log("in use effect")
 const getShipping = async() =>{
  const collectionRef = query(collection(db, "Shipping info"), where("id", "==", auth.currentUser.uid));
   
   const data = await getDocs(collectionRef);
   
    
    const data1= data.docs.map((doc)=>({ ...doc.data(), id:doc.id
     })
    )
     console.log(data1[0]);
   
     // data
     sessionStorage.setItem("firstName",data1[0].firstName );
     sessionStorage.setItem("lastName",data1[0].lastName );
     sessionStorage.setItem("city",data1[0].city );
     sessionStorage.setItem("address",data1[0].address );
     sessionStorage.setItem("state",data1[0].state );
     sessionStorage.setItem("zip",data1[0].zip );
   }
   
   
   getShipping().catch(console.error);
   
   }, [])
   
  const errorPasswordIncorrect = () => {
    alert("Password Incorrect");
  };

  const errorFieldBlank = (field) => {
    alert(field + " cannot be blank");
  };

  const handleSignOut = () => {
    sessionStorage.setItem("isLoggedIn", "false");
    sessionStorage.setItem("password", "");
    sessionStorage.setItem("username", "");
    sessionStorage.setItem("firstName", "");
    sessionStorage.setItem("lastName", "");
    sessionStorage.setItem("address", "");
    sessionStorage.setItem("city", "");
    sessionStorage.setItem("state", "");
    sessionStorage.setItem("zip", "");
    navigate("/login");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div>
      {isLoggedIn === "true" ? (
        <div className="yes-logged-in">
          <div className="change-password">
            <h1>Change Password</h1>
            <TextField
              style={{ marginBottom: "20px" }}
              id="standard"
              label="Old Password"
              variant="standard"
              value={oldPassword}
              onChange={(e) => {
                setOldPassword(e.target.value);
              }}
            />
            <form onSubmit={handlePasswordSubmit}>
              <TextField
                id="standard"
                label="New Password"
                variant="standard"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
              />
            </form>
          </div>
          <div className="change-shipping">
            <h1> Your Shipping Info </h1>
            <div className="form-row">
              <div className="form-col">
                <TextField
                  id="standard"
                  label="First Name"
                  variant="standard"
                  value={sessionStorage.getItem("firstName")}
                />
                <TextField
                  id="standard"
                  label="Last Name"
                  variant="standard"
                  value={sessionStorage.getItem("lastName")}
                />
              </div>
              <div className="form-row">
                <div className="form-col">
                  <TextField
                    id="standard"
                    label="Address"
                    variant="standard"
                    value={sessionStorage.getItem("address")}
                  />
                  <TextField
                    id="standard"
                    label="City"
                    variant="standard"
                    value={sessionStorage.getItem("city")}
                  />
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-col">
                <TextField
                  id="standard"
                  label="State"
                  variant="standard"
                  value={sessionStorage.getItem("state")}
                />
                <TextField
                  id="standard"
                  label="Zip"
                  variant="standard"
                  value={sessionStorage.getItem("zip")}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-col">
                <TextField
                  id="standard"
                  label="Credit Card"
                  variant="standard"
                  value={sessionStorage.getItem("creditCard")}
                />
              </div>{" "}
            </div>
          </div>
          <div className="sign-out-button">
            <h1> Sign Out</h1>
            <Button variant="contained" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>
      ) : (
        <div className="not-logged-in">
          <h1> You are not logged in</h1>
          <Button variant="contained" onClick={handleLoginClick}>
            Login
          </Button>
        </div>
      )}
    </div>
  );
};

export default Account;
