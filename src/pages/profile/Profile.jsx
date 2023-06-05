import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const Profile = () => {
  const { userProfile } = useContext(UserContext);

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
