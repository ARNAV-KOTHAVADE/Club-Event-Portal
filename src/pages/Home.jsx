
import { useNavigate } from "react-router-dom";
import "./Form.css"; 
import { getAuth , signOut } from "firebase/auth";

function Home(){
 
  let auth = getAuth();
  let nav = useNavigate();

  let handleClick = ()=>
  {
    signOut(auth)
    .then(()=>{
        alert("Logout successful!");
        nav("/login");
    }
    )
    .catch((err)=>alert(err));
  }
  return (
    <div className="container">
      <div className="form-box">
        <h2>Welcome to Your Dashboard</h2>
        <p>You are successfully</p>

        <div className="button-group">
          <button  style={{ backgroundColor: "#777" }}>
            Change Password
          </button>

          <button onClick={handleClick} style={{ backgroundColor: "#999" }}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;