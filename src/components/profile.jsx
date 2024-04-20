import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import * as XLSX from 'xlsx';
import Navbar from "./Navbar";
function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const [excelData, setExcelData] = useState(null);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);




  return (
    <div className='container-fluid'>
      <div className="row">
        <Navbar/>
   
         <div className="col-10 offset-2">
          <div className="profile-content text-center">
          <h1 className="mt-4">Welcome {userDetails?.CompanyName}!</h1>
          {userDetails?.EmpData}
            <h3>Email: {userDetails?.email}</h3>
            <h3>Company Address: {userDetails?.Address}</h3> 
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
