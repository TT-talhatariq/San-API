import React, { useState } from "react";
import axios from "axios";

const GitHubProfile = () => {
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");
  const [followers, setFollowers] = useState("");
  const [followings, setFollowings] = useState("");
  const [loading, setLoading] = useState(true);

  const onInputChange = (e) => {
    setSearch(e.target.value);
  };

  // // Api calling using default JS
  // const fetchData = () => {
  //   console.log("fetching.....");
  //   fetch(`https://api.github.com/users/${search}`)
  //     .then((data) => {
  //       return data.json();
  //     })
  //     .then((profile) => {
  //       // set Data
  //       setName(profile.name);
  //       setBio(profile.bio);
  //       setFollowers(profile.followers);
  //       setFollowings(profile.following);
  //       setImage(profile.avatar_url);
  //     });
  // };

  // ES6
  // const fetchData = async () => {
  //   const response = await fetch(`https://api.github.com/users/${search}`);
  //   console.log(response);
  //   const profile = await response.json();
  //   // set Data
  //   setName(profile.name);
  //   setBio(profile.bio);
  //   setFollowers(profile.followers);
  //   setFollowings(profile.following);
  //   setImage(profile.avatar_url);
  // };

  // Axiosm
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `https://api.github.com/users/${search}`
      );
      const profile = response.data;

      // set Data
      setName(profile.name);
      setBio(profile.bio);
      setFollowers(profile.followers);
      setFollowings(profile.following);
      setImage(profile.avatar_url);
      setLoading(false);
    } catch (error) {
      alert("Error in Fetching");
    }
  };
  return (
    <div>
      <div className="input">
        <input
          type="text"
          placeholder="Enter User Name"
          value={search}
          onChange={onInputChange}
        />
        <button onClick={fetchData}> Fetch Data</button>
      </div>

      {!loading && (
        <div className="githubContainer">
          <h1>{name}</h1>
          <img src={image} alt="Profile Pic" />
          <p>{bio}</p>
          <div className="stats">
            <p>
              Followers <span>{followers}</span>
            </p>
            <p>
              Followings <span>{followings}</span>{" "}
            </p>
            <p>
              Repo <span>10</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GitHubProfile;
