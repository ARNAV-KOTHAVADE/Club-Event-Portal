 
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Form.css";  
import { getAuth, sendPasswordResetEmail } from "firebase/auth";  
function ForgotPassword() {
  const [email, setEmail] = useState("");  
  

  return (
    <div className="container">
      <div className="form-box">
        <h2>Forgot Password</h2>

        <div className="form-group">
          <label>Username (Email)</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>

        <button>
          Send Reset Email
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;