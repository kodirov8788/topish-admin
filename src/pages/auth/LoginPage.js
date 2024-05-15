// src/components/LoginPage.js
import React, { useState, useEffect } from "react";
import { useLoginMutation } from "../../context/auth/AuthApi";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("934440002");
  const [password, setPassword] = useState("securepassword");
  const [mobileToken, setMobileToken] = useState("fcmToken");
  const [signIn, { data, isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate to the home page if the user is authenticated
    // if (data) navigate("/");
    console.log("data", data);
  }, [data, navigate]); // Depend on `data` and `navigate` so this runs only when `data` changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signIn({
      phoneNumber,
      password,
      mobileToken,
    });
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.data?.message || "Error signing in"}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Phone Number:
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        Mobile Token:
        <input
          type="text"
          value={mobileToken}
          onChange={(e) => setMobileToken(e.target.value)}
          required
        />
      </label>
      <button type="submit" disabled={isLoading}>
        Sign In
      </button>
      {data && <p>Welcome!</p>}{" "}
      {/* Show welcome message only if `data` is available */}
    </form>
  );
}

export default LoginPage;
