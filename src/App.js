import React from 'react';
import LoginForm from './pages/LoginForm';
import Signup from './pages/Signup';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Account from './pages/Account';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ShopContextProvider } from './context/ShopContext';
import NotFound from './pages/NotFound';
import Success from './pages/Success';
import { Helmet } from 'react-helmet';

function App() {
  return (
    <div>
    <Helmet>
    <title> We Skii Rental </title>

    </Helmet>
      <ShopContextProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/login' element={<LoginForm />} exact />
            <Route path='/signup' element={<Signup />} exact />
            <Route path='/cart' element={<Cart />} exact />
            <Route path='/account' element={<Account />} exact />
            <Route path='/not-found' element={<NotFound />} exact />
            <Route path='/success' element={<Success />} exact />
            <Route path='/' element={<Shop />} exact />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ShopContextProvider>
    </div>
  );
}

export default App;
