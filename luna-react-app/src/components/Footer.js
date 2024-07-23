import React from "react";
import'./Footer.css'
import {useNavigate} from "react-router-dom";
import {HashLink as Link} from "react-router-hash-link";

const Footer = () =>{

    const navigate = useNavigate();
    const HomeClick = () => navigate('/');

    return (
        <footer className="footer">
            <div className="logos-container">
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
            </div>
            <div className="footer-links">
                <ul>
                    <li><Link smooth to="/#home" className="nav-link">Home</Link></li>
                    <li><Link smooth to="/#home" className="nav-link">About Us</Link></li>
                    <li><Link smooth to="/#home" className="nav-link">Feature</Link></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;