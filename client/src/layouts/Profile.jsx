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
    <div className="min-h-screen justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex">
        <h2 className="mt-6 text-center mx-auto text-3xl font-bold text-gray-900">
          Profile
        </h2>
      </div>
      <div className="flex justify-center my-auto mx-auto">
        <form onSubmit={handleFormSubmit} className="mt-6 w-1/2">
          <label className="flex">
            <div className="text-2xl mr-2">Username:</div>
            <input
              type="text"
              name="username"
              value={formData.username || user.username}
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-camelot focus:border-camelot focus:z-10 sm:text-sm"
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            <div className="text-2xl mr-2">Email:</div>
            <input
              type="email"
              name="email"
              value={formData.email || user.email}
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-camelot focus:border-camelot focus:z-10 sm:text-sm"
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            <div className="text-2xl mr-2">Name:</div>
            <div className="flex">
            <input
              type="text"
              name="firstName"
              value={formData.firstName || user.firstName}
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-camelot focus:border-camelot focus:z-10 sm:text-sm"
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName || user.lastName}
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-camelot focus:border-camelot focus:z-10 sm:text-sm"
              onChange={handleChange}
            />
            </div>
          </label>
          <br />
          <label>
            <div className="text-2xl mr-2">Bio:</div>
            <textarea
              name="bio"
              value={formData.bio || user.bio}
              className="appearance-none relative block h-1/4 w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-camelot focus:border-camelot focus:z-10 sm:text-sm"
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            <div className="text-2xl mr-2">Skills:</div>
            <input
              type="text"
              name="skills"
              value={formData.skills.join(", ") || user.skills.join(", ")}
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-camelot focus:border-camelot focus:z-10 sm:text-sm"
              onChange={handleSkillsChange}
            />
          </label>
          <br />
          <label>
            <div className="text-2xl mr-2">Location:</div>
            <input
              type="text"
              name="location"
              value={formData.location || user.location}
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-camelot focus:border-camelot focus:z-10 sm:text-sm"
              onChange={handleChange}
            />
          </label>
          <br />
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
