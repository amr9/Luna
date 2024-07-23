import React, {useEffect, useState} from 'react';
import './Homepage.css';
import {useLocation, useNavigate} from "react-router-dom";

const HomePage = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

        useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, [location]);

    const LoginClick = () => navigate('/login');
    const RegisterClick = () => navigate('/register');



    return (
        <div className="homepage">
            <section id="home" className="hero">
                <div className="hero-content">
                    <h1>Luna</h1>
                    <p>Embrace the Spectrum – Dye Your Dreams!</p>
                    <div className="hero-buttons">
                        {!isLoggedIn && (
                        <>
                            <button className="sign-in" onClick={LoginClick}>Sign In</button>
                            <button className="register" onClick={RegisterClick}>Register</button>
                        </>
                    )}
                    </div>
                </div>
                <div className="hero-image">
                    <img src={require("./colors.jpg")} alt="HeroImage" className="Image-red"/>
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
            <section id="about-us" className="about">
                <h1>About Us</h1>
                <p className="about-paragraph">
                    Welcome to Luna, where we believe that your hair is the ultimate canvas for self-expression. Our innovative hair dye products are designed to bring out the vibrant,
                    bold, and beautiful colors that reflect your unique personality. Whether you're looking to make a subtle change or a dramatic transformation, our high-quality dyes offer a spectrum of shades to suit every style.
                    At Luna, we are committed to using safe, cruelty-free ingredients that nourish your hair while providing long-lasting, brilliant color. Our easy-to-use formulas ensure a seamless application process,
                    allowing you to achieve salon-quality results from the comfort of your home.
                    Join us on a journey of self-discovery and creativity. Embrace the power of color and let your true self shine through with Luna.
                </p>

            </section>
            <section id="feature" className="feature">
                <h1>Feature</h1>
                <p className="feature-paragraph">
                    Our hair dye project offers an extensive palette of vibrant and bold colors, allowing you to
                    discover the perfect shade that matches your personality and style.
                    The easy-to-use formulas ensure a seamless application process, enabling you to achieve
                    salon-quality results from the comfort of your home. Each dye kit comes with step-by-step
                    instructions,
                    making the coloring experience hassle-free and enjoyable. Enriched with nourishing ingredients,
                    our hair dyes maintain the health and shine of your hair,
                    providing vibrant, long-lasting color that remains fade-resistant for weeks. We prioritize
                    safety and ethics, ensuring all our products are cruelty-free and made with high-quality, safe
                    ingredients.
                    Transform your look and express your individuality with our premium hair dyes—color your world,
                    one strand at a time!
                </p>
            </section>
        </div>
    );
};

export default HomePage;
