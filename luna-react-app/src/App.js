import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import HomePage from "./components/Homepage";
import RegistrationForm from './components/Registerationform';
import Footer from './components/Footer';
const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <div className="bruh">
                    <Navbar />
                    <Routes>
                        <Route path="/login" Component={Login} />
                        <Route path="/Register" Component={RegistrationForm} />
                        <Route path="/" Component={HomePage} />
                    </Routes>
                    <Footer/>
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;
