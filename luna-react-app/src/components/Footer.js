import React from "react";
import'./Footer.css'
import {useNavigate} from "react-router-dom";

const Footer = () =>{

    const navigate = useNavigate();
    const HomeClick = () => navigate('/');

    return (
        <footer className="footer">
            <ul className="logo-list">
                <div className="footer-logo">
                    <img src="luna.png" alt="Luna logo" onClick={HomeClick}/>
                </div>
                <div className="footer-content-logos">
                    <a href="https://github.com/amr9" target="_blank" rel="noopener noreferrer">
                        <img src={require("./github.png")} alt="GitHub logo"/>
                    </a>
                    <a href="https://www.linkedin.com/in/amr-emad-973603224/" target="_blank" rel="noopener noreferrer">
                        <img src={require("./linkedin.png")} alt="Linkedin logo"/>
                    </a>
                </div>
            </ul>
            <div className="footer-links">
                <ul>
                    <li onClick={HomeClick}>Home</li>
                    <li onClick={HomeClick}>About Us</li>
                    <li onClick={HomeClick}>Feature</li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;