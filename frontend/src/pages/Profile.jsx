import { useEffect, useState }
from "react";

import API from "../services/api";

import "../styles/profile.css";

function Profile() {

  const [user, setUser] =
    useState(null);

  useEffect(() => {

    fetchProfile();

  }, []);

  const fetchProfile = async () => {

    try {

      const response =
        await API.get(
          "users/profile/"
        );

      setUser(response.data);

    } catch (error) {

      console.log(error);

    }

    

  };

  if (!user) {

    return <h1>Loading Profile...</h1>;
  }

  return (

    <div className="profile-container">

      <h1>User Profile</h1>

      <div className="profile-card">

        <h2>
          {user.username}
        </h2>

        <p>
          {user.email}
        </p>

      </div>

    </div>
  );
}

export default Profile;