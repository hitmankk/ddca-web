import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // get from localStorage
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) {
      // not logged in
      navigate("/login");
    } else {
      setUser(userInfo.user);
    }
  }, [navigate]);
  const handleLogout = () => {
    // Remove user data from localStorage
    localStorage.removeItem("userInfo");

    // Optionally, you can also clear Redux if you use it:
    // dispatch({ type: 'USER_LOGOUT' });

    // Redirect to login page
    window.location.href = "/login"; // hard redirect so the app fully resets
  };
  function handleDashboard() {
    navigate("/dashboard");
  }

  return (
    <div className="home-page">
      <h2>User Profile</h2>
      <button className="btn" onClick={handleDashboard}>
        Dashboard
      </button>
      {user ? (
        <div className="profile-details">
          {/* show user data if role is 'user' */}

          <>
            <p className="profile-input">
              <strong>Name:</strong> {user.name}
            </p>
            <p className="profile-input">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="profile-input">
              <strong>Age:</strong> {user.age}
            </p>
            <p className="profile-input">
              <strong>Phone:</strong> {user.phone}
            </p>
            <p className="profile-input">
              <strong>Skill Level:</strong> {user.skillLevel}
            </p>
            <p className="profile-input">
              <strong>Playing Role:</strong> {user.playingRole}
            </p>
            <p className="profile-input">
              <strong>Experience:</strong> {user.experience}
            </p>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
          {/* ) : (
            <>
              <p>
                You are logged in as <strong>admin</strong>. Admin profile is
                under construction.
              </p>
            </>
          )} */}
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
