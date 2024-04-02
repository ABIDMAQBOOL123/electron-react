import "./Navigation.css";
const Navigation = ({ changeScreen }) => {
  return (
    <nav className="nav-bar">
      <label onClick={() => changeScreen("activity")}>Activity Tracker</label>
      <label href="#profile">Profile</label>
      <label href="#statistics">Statistics</label>
      <label href="#project">Project</label>
      <label onClick={() => changeScreen("login")}>Login</label>
    </nav>
  );
};

export default Navigation;
