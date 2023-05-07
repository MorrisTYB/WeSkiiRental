import React, { useState } from "react";
import "./Styling/Signup.css";
import logo from "../icons/WeSkiiLogo.png";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { collection, addDoc, doc } from "firebase/firestore";
const Signup = () => {
  const navigate = useNavigate();

  // Account info
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Address Info
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const handleSubmit = async (e) => {
    // e.preventDefault()
    console.log(username);
    console.log(password);
    const collectionRef = collection(db, "Shipping info");
    await createUserWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert(errorMessage);
      });

    // add to the  shipping database

    await addDoc(collectionRef, {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      state: state,
      zip: zip,
      email: auth.currentUser.email,
      id: auth.currentUser.uid,
    })
      .then(() => {
        navigate("/login");
      })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div className="form-wrapper">
      <div className="form-header">
        <img src={logo} alt="logo" className="logo"></img>
        <h1>Signup Page</h1>
      </div>
      <div className="form-body">
        <div className="account-info">
          <h3 className="title">Login Info</h3>
          <div className="outer">
            <TextField
              id="outlined-basic"
              label="email"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="inner"
            />
            <TextField
              id="outlined-basic"
              label="password"
              variant="outlined"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="inner"
            />
          </div>
        </div>
        <div className="address-info">
          <h3 className="title"> Shipping Info </h3>
          <div className="outer">
            <TextField
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="inner"
            />
            <TextField
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="inner"
            />
          </div>

          <div className="outer">
            <TextField
              id="outlined-basic"
              label="Address"
              variant="outlined"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="inner"
            />

            <TextField
              id="outlined-basic"
              label="City"
              variant="outlined"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="inner"
            />
          </div>

          <div className="outer">
            <TextField
              id="outlined-basic"
              label="State"
              variant="outlined"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="inner"
            />

            <TextField
              id="outlined-basic"
              label="Zip"
              variant="outlined"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              className="inner"
            />
          </div>
        </div>
      </div>
      <div className="form-submit">
        <Button variant="contained" onClick={handleSubmit}>
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default Signup;
