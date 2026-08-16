import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Form.css";
import { auth, db } from "./Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const nav = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (username.trim() === "" || password.trim() === "" || confirmPassword.trim() === "") {
      alert("Please fill in all fields.");
      return;
    }
    if (confirmPassword !== password) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, username, password);
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email: username,
        isAdmin: false,
        createdAt: new Date().toISOString(),
      });

      setUsername("");
      setPassword("");
      setConfirmPassword("");
      alert("User created successfully!");
      nav("/login");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>

          <button type="submit">Sign Up</button>

          <button
            onClick={() => nav("/login")}
            type="button"
            style={{ marginTop: "10px", backgroundColor: "#6c757d" }}
          >
            Go to Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;