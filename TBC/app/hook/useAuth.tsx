import React, { useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import {auth} from '@/config/firebaseConfig'


export function useAuth() {
  const [user, setUser] = React.useState<User>();

  useEffect(() => {
    const unsubscribeFromAuthStateChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(user);
      } else {
        // User is signed out
        setUser(undefined);
      }
    });

    return unsubscribeFromAuthStateChanged;
  }, []);

  return {
    user,
  };
}