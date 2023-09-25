import React from "react";
import UserProfile from "../components/UserProfile/UserProfile";
import { useAuth } from "../authContext";
import { Redirect } from "react-router-dom";

function UserProfilePage() {
  const { user } = useAuth();

  if (!user) {
    // Redirect to the login page if the user is not authenticated
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <UserProfile />
    </div>
  );
}

export default UserProfilePage;
