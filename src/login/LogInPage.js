import React, { useEffect} from "react";
import { useHistory } from "react-router-dom";

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function LogInPage() {
  const navigate = useHistory();

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
      console.log(BACKEND_URL + '/api/login')
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
      console.log("data: ", data)

      if (data.success) {
        localStorage.setItem('authToken', data.token);
        navigate.push('/admin/dashboard');
      } else {
        alert('Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Login failed. Please try again.');
    }
  };

  const handleRedirect = () => {
    navigate.push("/admin/dashboard");
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
