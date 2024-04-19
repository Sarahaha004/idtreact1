import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth,db } from "./firebase";
import { setDoc,doc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import './Login.css';


function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const handleRegister=async (e)=>{
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if(user){
        await setDoc(doc(db,"Users",user.uid),{
          email:user.email,
          CompanyName:fname,
          Address:lname,
        });
      }
      console.log("User Registered Successfully");
      toast.success("User Registered Sucessfully!!",{
      position:"top-center",
    });
    } catch (error) {
      console.log(error.message);
      toast.error(error.message,
      {position:"bottom-center",
    });
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 registerPage'>
      <ToastContainer/>
      <div className='p-3 rounded w-25 h-50 border loginForm'>
    <form onSubmit={handleRegister}>
      <h1>Sign Up</h1>
      <div className="mb-4"></div>
      <div className="mb-4">
        <label>Company Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Company Name"
          onChange={(e) => setFname(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label>Company Address</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Address"
          onChange={(e) => setLname(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </div>
      <p className="forgot-password text-right">
        Already registered <a href="/login">Login</a>
      </p>
    </form>
    </div>
    </div>
  );
}
export default Register;