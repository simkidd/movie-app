import React, { createContext, useEffect, useState } from "react";
import auth from "../firebase";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
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
    <UserContext.Provider value={{ userProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
