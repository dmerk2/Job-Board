import { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";

function Profile() {
  const { loading, data } = useQuery(QUERY_USER);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    bio: "",
    location: "",
    skills: [],
  });

  if (loading) return <div>Loading...</div>;
  const user = data?.user || {};
  console.log("User data: ", user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSkillsChange = (e) => {
    const skills = e.target.value.split(",").map((skill) => skill.trim());
    setFormData({ ...formData, skills });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("formData:", formData);
    // You can add logic here to send the updated data to the server
  };

  return (
    <div>
      <h2>Profile</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username || user.username}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email || user.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName || user.firstName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName || user.lastName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Bio:
          <textarea
            name="bio"
            value={formData.bio || user.bio}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Skills:
          <input
            type="text"
            name="skills"
            value={formData.skills.join(", ") || user.skills.join(", ")}
            onChange={handleSkillsChange}
          />
        </label>
        <br />
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={formData.location || user.location}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default Profile;
