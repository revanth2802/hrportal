

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import hundhwe_image_final from "../assets/hundhwe_image_final.png";
import './HomePage.css';

function HomePage() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  // Redirect to dashboard after login
  const handleLogin = () => {
    if (isAuthenticated) {
      // Redirect to the dashboard if already authenticated
      window.location.href = '/dashboard';
    } else {
      // Redirect to Auth0 login page if not authenticated
      loginWithRedirect({
        appState: { returnTo: '/dashboard' }
      });
    }
  };

  return (
    <div className="home-container">
      <h1>Hundhwe HR Portal</h1>
      <div className="centered-content">
      <img onClick={handleLogin} src={hundhwe_image_final} alt="HR Portal" className="home-image"/> 
      <button onClick={handleLogin} className="login-button">
        Explore 
      </button>
    </div>
    </div>
  );
}

export default HomePage;

