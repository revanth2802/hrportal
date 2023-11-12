import React from 'react';
import '../styles/header.css';
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton, LogoutButton } from '../AuthButtons';
import tardiImage from '../../assets/tardi_logo.png';

function Header() {
    const { isAuthenticated, isLoading } = useAuth0();

    return (
        <header className="app-header">
          
            {/* <h1><Link to="/"> <img src={tardiImage} alt="HR Portal" className="logo"/> </Link></h1> */}
            <div>
    <Link to="/">
        <img src={tardiImage} alt="HR Portal" className="logo"/>
    </Link>
</div>

            <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    isAuthenticated ? <LogoutButton /> : <LoginButton />
                )}
            </nav>
        </header>
    );
}

export default Header;
