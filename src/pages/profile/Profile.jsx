import React, { useEffect, useState } from "react";
import auth from "../../firebase";

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const user = auth.currentUser;
        if (user !== null) {
          // The user object has basic properties such as display name, email, etc.
          const displayName = user.displayName;
          const email = user.email;
          const photoURL = user.photoURL;
          const emailVerified = user.emailVerified;
          const uid = user.uid;

          // Create the userProfile object
          const userProfile = {
            displayName,
            email,
            photoURL,
            emailVerified,
            uid,
          };

          setUserProfile(userProfile);
        }
      } catch (error) {
        console.log("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div>
      {userProfile ? (
        <div>
        <img src={userProfile.photoURL} alt="" />
          <h2>{userProfile.name}</h2>
          <p>Email: {userProfile.email}</p>
          {/* Display other profile information */}
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
