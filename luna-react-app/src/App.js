import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import HomePage from "./components/Homepage";
import RegistrationForm from './components/Registerationform';
import Footer from './components/Footer';
import User from './components/User';
import UserUpdate from './components/UserUpdate';

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/login" Component={Login} />
                <Route path="/Register" Component={RegistrationForm} />
                <Route path="/" Component={HomePage} />
                <Route path="/user" Component={User} />
                <Route path="/user/user-update" Component={UserUpdate} />
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
};

export default App;
