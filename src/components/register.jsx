import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import './Login.css';

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [file, setFile] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          CompanyName: fname,
          Address: lname,
          // EmpData: file,
        });
      }
      console.log("User Registered Successfully");
      toast.success("User Registered Successfully!!", {
        position: "top-center",
      });
    } catch (error) {
      console.error(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
  };

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 registerPage' style={{ backgroundImage: 'public\images\ms.jpg', backgroundSize: 'cover' }}>
      <ToastContainer />
      <div className='p-3 rounded border loginForm'>
        <form onSubmit={handleRegister} className="w-100">
          <h1 className="text-center">Sign Up</h1>
          <div className="mb-3">
            <label htmlFor="companyName" className="form-label">Company Name</label>
            <input
              type="text"
              id="companyName"
              className="form-control"
              placeholder="Company Name"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="companyAddress" className="form-label">Company Address</label>
            <input
              type="text"
              id="companyAddress"
              className="form-control"
              placeholder="Enter Address"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="fileUpload" className="form-label">Upload Employee Details (XLSX or CSV)</label>
            <input
              type="file"
              id="fileUpload"
              className="form-control"
              //accept=".xlsx,.csv"
              onChange={handleFileChange}
              required
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">Sign Up</button>
          </div>
          <p className="forgot-password text-center mt-3">
            Already registered? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
