import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import dashboard from "./dashboard";
import { Link } from "react-router-dom";
function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
        console.log(docSnap.data());
      } else {
        console.log("User is not logged in");
      }
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }
  return (
    <div>
      {userDetails ? (
        <>
          <h3>Welcome {userDetails.firstName} !!</h3>
          <div>
            <p>Email: {userDetails.email}</p>
            {/* <p>First Name: {userDetails.firstName}</p>
            <p>Last Name: {userDetails.lastName}</p> */}
          </div>
          <button className="btn btn-primary" style={{ padding: '10px 20px', marginRight: '10px' }}>
  <Link to="/dashboard" style={{ textDecoration: 'none', color: 'white' }}>Go to Dashboard</Link>
</button>

         <button className="btn btn-primary" style={{ padding: '10px 20px' }} onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
export default Profile;