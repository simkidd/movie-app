import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import "./profile.scss";

const Profile = () => {
  const { userProfile } = useContext(UserContext);

  return (
    <div className="profile">
      <div className="profile__container">
        {userProfile ? (
          <div className="profile__inner">
            <img src={userProfile.photoURL} alt="" />
            <h2>{userProfile.displayName}</h2>
            <p>Email: {userProfile.email}</p>
            {/* Display other profile information */}
          </div>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
