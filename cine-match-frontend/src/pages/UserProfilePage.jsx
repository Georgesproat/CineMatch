import React from "react";
import UserProfile from "../components/UserProfile/UserProfile";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

function UserProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    // Navigate to the login page if the user is not authenticated
    navigate("/login");
    return null; // Return null to prevent rendering the UserProfilePage component
  }

  return (
    <div>
      <UserProfile />
    </div>
  );
}

export default UserProfilePage;
