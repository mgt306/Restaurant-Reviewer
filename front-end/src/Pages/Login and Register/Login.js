import Google from "../../Images/google.png";
import Facebook from "../../Images/facebook.png";
import Github from "../../Images/github.png";
import "../../Styles/Login.css";

const Login = () => {
  const google = () => {
    window.open("http://localhost:3001/auth/google", "_self");
  };

  const github = () => {
    window.open("http://localhost:3001/auth/github", "_self");
  };

  const facebook = () => {
    window.open("http://localhost:3001/auth/facebook", "_self");
  };

  return (
    <div className="login">
      <h1 className="loginTitle">Choose a Login Method</h1>
      <div className="wrapper">
        <div className="left">
          <div className="loginButton google" onClick={google}>
            <img src={Google} alt="" className="icon" />
            Google
          </div>
          <div className="loginButton facebook" onClick={facebook}>
            <img src={Facebook} alt="" className="icon" />
            Facebook
          </div>
          <div className="loginButton github" onClick={github}>
            <img src={Github} alt="" className="icon" />
            Github
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

// import React, { useState , useEffect} from "react";
// import { Link } from "react-router-dom";
// import "../../Styles/Login.css";
// import jwt_decode from "jwt-decode";


// export default function Login() {
    
//     const [loading, setLoading] = useState(false);
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setLoading(true);
//     }
//     const [user, setUser] = useState({});

//     function handleCallbackResponse(response) {
//       console.log("Encoded JWT ID Token: " + response.credential);
//       var userObject = jwt_decode(response.credential);
//       console.log(userObject)
//       setUser(userObject);
//       document.getElementById("signInDiv").hidden = true;
//     }
    
//     function handleSignOut(event) {
//       setUser({});
//       document.getElementById("signInDiv").hidden = false;
//     }
  
//     //testing user authentication
//     useEffect(() => {
//       /* global google */
//       google.accounts.id.initialize({
//         client_id: "186661128169-rtbrhibr9p5ne088h88sssvl4sei2nto.apps.googleusercontent.com",
//         callback: handleCallbackResponse
//       });
  
//       google.accounts.id.renderButton(
//         document.getElementById("signInDiv"),
//         { theme: "outline", sign: "large"}
//       );
  
//       google.accounts.id.prompt();
//     }, []);


//     return (
//         <>
//         <div className="container">
//             <div className="row">
//             <div className="col-md-6 offset-md-3">
//                 <div className="card">
//                 <div className="card-header">Login</div>
//                 <div className="card-body">
//                     <form onSubmit={handleSubmit}>
//                     <div className="form-group">
//                         <label htmlFor="email">Email</label>
//                         <input
//                         type="email"
//                         className="form-control"
//                         id="email"
//                         placeholder="Enter email"
//                         //value of email, addOnChange
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="password">Password</label>
//                         <input
//                         type="password"
//                         className="form-control"
//                         id="password"
//                         placeholder="Password"
//                         //value of password, add onChange
//                         />
//                     </div>
//                     <button
//                         disabled={loading}
//                         type="submit"
//                         className="btn btn-primary"
//                     >
//                         Login
//                     </button>
//                     </form>
//                 </div>
//                 <div className="card-footer">
//                     <Link to="/forgot-password">Forgot Password?</Link>
//                 <div>
//                     <Link to="/register">Don't have an account? Register</Link>
//                 </div>
//                 </div>
//                 <div>
//                 <div id="signInDiv"></div>
        
//         { user && <div id="afterSignIn"> 
//             <img id="userpic" src={user.picture}></img>
//             <p id="username">{user.name}</p>
//             {  Object.keys(user).length != 0 &&
//               <button id="signOut" onClick={ (e) => handleSignOut(e)}>Sign Out</button>
//             }
//         </div>
//         }
//                 </div>
//                 </div>
//             </div>
//             </div>
//         </div>
//         </>
//     );
//     }





