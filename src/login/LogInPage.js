import React from "react";
import { useHistory } from "react-router-dom";

function LogInPage() {
  const navigate = useHistory();

  const handleRedirect = () => {
    navigate.push("/admin/dashboard");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome</h1>
      <button onClick={handleRedirect} style={{ padding: "10px 20px", fontSize: "16px" }}>
        Log In With Google
      </button>
    </div>
  );
}

export default LogInPage;