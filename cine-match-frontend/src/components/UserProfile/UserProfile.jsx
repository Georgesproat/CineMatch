import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import userService from "../../services/userService";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
  },
  avatar: {
    width: 100,
    height: 100,
    marginBottom: theme.spacing(2)
  }
}));

function UserProfile() {
  const classes = useStyles();
  const { username } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data by username
    userService
      .getUserByUsername(username)
      .then((data) => setUser(data))
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setUser(null);
      });
  }, [username]);

  return (
    <Paper className={classes.root}>
      {user ? (
        <>
          <Avatar
            className={classes.avatar}
            src={user.profilePicture}
            alt={user.username}
          />
          <Typography variant="h5">{user.username}</Typography>
          <Typography variant="body1">Email: {user.email}</Typography>
          {/* Display other user information */}
        </>
      ) : (
        <Typography variant="body1">User not found</Typography>
      )}
    </Paper>
  );
}

export default UserProfile;
