import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function LogInPage() {
  const navigate = useHistory();
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    if (!window.google) {
      console.error('Google API not loaded');
      return;
    }

    if (!GOOGLE_CLIENT_ID) {
      console.error('Google Client ID not found in environment variables');
      return;
    }

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
      auto_select: false,
    });

    window.google.accounts.id.renderButton(
      document.getElementById('googleButton'),
      {
        type: 'standard',
        theme: 'outline',
        size: 'large',
        width: "200"
      }
    );

    window.google.accounts.id.prompt();
  }, []);

  const handleCredentialResponse = async (response) => {
    try {
      const res = await fetch(BACKEND_URL + '/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify({ token: response.credential }),
      });

      const data = await res.json();

      if (data.success) {
        // Store auth token
        localStorage.setItem('authToken', data.token);

        // Decode JWT to get user info including Google account ID
        const decodedToken = JSON.parse(atob(data.token.split('.')[1]));

        // Store user data in context and encrypted localStorage
        const userData = {
          googleId: decodedToken.googleId,
          email: decodedToken.email,
          name: decodedToken.name
        };

        setUser(userData);
        const encryptedData = btoa(JSON.stringify(userData));
        localStorage.setItem('userData', encryptedData);

        navigate.push('/admin/dashboard');
      } else {
        alert('Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      justifyContent: 'center',
      marginTop: "25px"
    }}>
      <h1 style={{ marginBottom: "50px" }}>Welcome</h1>
      <div
        id="googleButton"
        style={{ transform: "scale(1.2)" }}
      ></div>
    </div>
  );
}

export default LogInPage;