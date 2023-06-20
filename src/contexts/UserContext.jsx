import React, { createContext, useEffect, useState } from "react";
import auth from "../firebase";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, photoURL, emailVerified, uid } = user;

        const userProfile = {
          displayName,
          email,
          photoURL,
          emailVerified,
          uid,
        };

        setUserProfile(userProfile);
      } else {
        setUserProfile(null);
      }
    });

    return () => unsubscribe();
  }, []);

  console.log(userProfile);

  return (
    <UserContext.Provider value={{ userProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
