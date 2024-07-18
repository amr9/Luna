import React from "react";
import'./Footer.css'
import {useNavigate} from "react-router-dom";

const Footer = () =>{

    const navigate = useNavigate();
    const HomeClick = () => navigate('/');

    return (
        <footer className="footer">
            <div className="footer-logo">
                <img src="luna.png" alt="Luna logo" onClick={HomeClick}/>
            </div>
            <ul>
                <li onClick={HomeClick}>Home</li>
                <li>label</li>
                <li>label</li>
            </ul>
        </footer>
    );
};

export default Footer;