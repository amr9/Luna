import React from 'react';
import './Homepage.css';
import {useNavigate} from "react-router-dom";

const HomePage = () => {


    const navigate = useNavigate();
    const LoginClick = () => navigate('/login');
    const RegisterClick = () => navigate('/register');

    return (
        <div className="homepage">
            <section className="hero">
                <div className="hero-content">
                    <h1>Luna</h1>
                    <p>Embrace the Spectrum – Dye Your Dreams!</p>
                    <div className="hero-buttons">
                        <button className="sign-in" onClick={LoginClick}>Sign in</button>
                        <button className="register" onClick={RegisterClick}>Register</button>
                    </div>
                </div>
                <div className="hero-image">
                    <img src={require("./redhead.jpg")} alt="HeroImage" className="Image-red"/>
                </div>
            </section>
            <section className="quotes">
                <h2>Development Team</h2>
                <p> 1 Member</p>
                <div className="quote-cards">
                    <div className="quote-card">
                        <address>"With this revolutionary hair dye, every color brings out a new facet of my personality.
                            It’s not just about changing my look; it’s about expressing who I am,
                            one vibrant shade at a time."</address>
                        <div className="quote-author">
                            <img src={require("./profile picture head.jpg")} alt="author" />
                            <div>
                                <p className="author-name">Amr Emad</p>
                                <p className="author-role">Full Stack Developer</p>
                            </div>
                        </div>
                    </div>
                    {/* Repeat the above quote-card div as needed */}
                </div>
            </section>
        </div>
    );
};

export default HomePage;
