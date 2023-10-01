import React, { useState } from "react";
import Modal from "react-modal";
import { useAuth } from "..//../context/AuthContext";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { customColors } from "..//../theme/muiTheme";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom"; 

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: 999
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    backgroundColor: customColors.richBlack,
    border: "none",
    borderRadius: "8px",
    padding: "24px",
    maxWidth: "300px"
  }
};

function ProfileMenu({ isOpen, onRequestClose }) {
  const { user, logout } = useAuth();
  const [newUsername, setNewUsername] = useState("");
  const [showChangeUsername, setShowChangeUsername] = useState(false);

  const navigate = useNavigate(); // Use useNavigate for navigation

  const handleChangeUsername = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({ username: newUsername })
      });

      if (response.ok) {
        // Update the user context with the new username
        const updatedUser = { ...user, username: newUsername };
        setUser(updatedUser);
        setShowChangeUsername(false);
      } else {
        // Handle error response from the API, e.g., display an error message
        const data = await response.json();
        console.error("Change username failed:", data.error);
      }
    } catch (error) {
      console.error("Change username error:", error);
    }
  };

  const handleLogout = () => {
    logout();
    onRequestClose();
    navigate("/"); // Use navigate to redirect to the welcome page
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Profile Menu"
    >
      <div>
        {user?.profilePicture ? (
          <img src={user.profilePicture} alt="Profile" />
        ) : (
          <AccountCircleIcon fontSize="large" color="primary" />
        )}
        <Button
          variant="contained"
          style={{
            backgroundColor: customColors.orangeWeb,
            color: customColors.platinum
          }}
        >
          Change Profile Picture
        </Button>
      </div>
      {showChangeUsername ? (
        <div>
          <TextField
            type="text"
            placeholder="New Username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            fullWidth
          />
          <Button
            variant="contained"
            style={{
              backgroundColor: customColors.orangeWeb,
              color: customColors.platinum
            }}
            onClick={handleChangeUsername}
          >
            Change Username
          </Button>
        </div>
      ) : (
        <div>
          <Typography variant="subtitle1">
            Username: {user?.username || "N/A"}
          </Typography>
          <Button
            variant="contained"
            style={{
              backgroundColor: customColors.orangeWeb,
              color: customColors.platinum
            }}
            onClick={() => setShowChangeUsername(true)}
          >
            Edit Username
          </Button>
        </div>
      )}
      <div>
        <Button
          variant="contained"
          style={{
            backgroundColor: customColors.orangeWeb,
            color: customColors.platinum
          }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </Modal>
  );
}

export default ProfileMenu;
