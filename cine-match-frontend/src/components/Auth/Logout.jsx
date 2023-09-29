import { useAuth } from "../context/authContext";

function LogoutButton() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout(); // Call the logout function from useAuth
    // You may want to redirect the user to a login page or home page
  };

  return <button onClick={handleLogout}>Logout</button>;
}
