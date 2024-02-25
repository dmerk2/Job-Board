import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import { UPDATE_USER } from "../utils/mutations";
import { Link } from "react-router-dom";

function Profile() {
  const [updateUser] = useMutation(UPDATE_USER);
  const { loading, data, error } = useQuery(QUERY_USER, {
    fetchPolicy: "network-only",
  
  });
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    bio: "",
    location: "",
    skills: [],
    newSkill: "", // State to hold the value of the new skill input
  });
  const [modifiedFields, setModifiedFields] = useState({});
  const user = data?.user || {};

  useEffect(() => {
    if (!loading && data) {
      const user = data.user;
      console.log("User: ", user);
      setFormData({
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        bio: user.bio,
        location: user.location,
        skills: user.skills,
        newSkill: "", // Initialize newSkill as an empty string
      });
    }
  }, [loading, data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setModifiedFields((prevModifiedFields) => ({
      ...prevModifiedFields,
      [name]: true,
    }));
  };

  const handleAddSkill = () => {
    const newSkill = formData.newSkill.trim();
    if (newSkill) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        skills: [...prevFormData.skills, newSkill],
        newSkill: "", // Reset newSkill input
      }));
      setModifiedFields((prevModifiedFields) => ({
        ...prevModifiedFields,
        skills: true,
      }));
    }
  };

  const handleRemoveSkill = (index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      skills: prevFormData.skills.filter((_, i) => i !== index),
    }));
    setModifiedFields((prevModifiedFields) => ({
      ...prevModifiedFields,
      skills: true,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedFields = {};
      // Check each field to see if it's been modified
      for (const key in modifiedFields) {
        if (modifiedFields[key]) {
          updatedFields[key] = formData[key];
        }
      }
      await updateUser({
        variables: updatedFields,
      });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="min-h-screen justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex">
        <h2 className="mt-6 text-center mx-auto text-3xl font-bold text-gray-900">
          Profile
        </h2>
      </div>
      <div className="flex justify-center my-auto mx-auto">
        <form onSubmit={handleFormSubmit} className="mt-6 w-1/2">
          <label htmlFor="username" className="text-2xl mr-2">
            Username:
          </label>
          <input
            id="username"
            type="text"
            name="username"
            value={formData.username}
            className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-camelot focus:border-camelot focus:z-10 sm:text-sm"
            onChange={handleChange}
          />
          <br />
          <label htmlFor="email" className="text-2xl mr-2">
            Email:
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-camelot focus:border-camelot focus:z-10 sm:text-sm"
            onChange={handleChange}
          />
          <br />
          <label htmlFor="firstName" className="text-2xl mr-2">
            First Name:
          </label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            value={formData.firstName}
            className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-camelot focus:border-camelot focus:z-10 sm:text-sm"
            onChange={handleChange}
          />
          <br />
          <label htmlFor="lastName" className="text-2xl mr-2">
            Last Name:
          </label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            value={formData.lastName}
            className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-camelot focus:border-camelot focus:z-10 sm:text-sm"
            onChange={handleChange}
          />
          <br />
          <label htmlFor="bio" className="text-2xl mr-2">
            Bio:
          </label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            className="appearance-none relative block h-1/4 w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-camelot focus:border-camelot focus:z-10 sm:text-sm"
            onChange={handleChange}
          />
          <br />
          <label htmlFor="location" className="text-2xl mr-2">
            Location:
          </label>
          <input
            id="location"
            type="text"
            name="location"
            value={formData.location}
            className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-camelot focus:border-camelot focus:z-10 sm:text-sm"
            onChange={handleChange}
          />
          <br />
          {/* New skill input */}
          <label htmlFor="skills" className="text-2xl mr-2">
            Skills:
          </label>
          <label htmlFor="newSkill" className="sr-only">
            Add Skill
          </label>
          <input
            id="newSkill"
            name="newSkill"
            type="text"
            value={formData.newSkill}
            onChange={handleChange}
            placeholder="Add a skill"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          />
          <button
            type="button"
            onClick={handleAddSkill}
            className="mt-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Skill
          </button>
          {/* Display entered skills */}
          <div className="flex flex-wrap mt-2">
            {formData.skills.map((skill, index) => (
              <div
                key={index}
                className="bg-gray-100 p-2 rounded-md mr-2 mb-2 flex items-center"
              >
                <div className="mr-2">{skill}</div>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(index)}
                  className="text-red-600"
                >
                  X
                </button>
              </div>
            ))}
          </div>
          <br />
          <div className="flex justify-center">
            {user?.appliedJobs?.map((job) => (
              <div
                className="max-w-sm rounded overflow-hidden shadow-lg bg-white border border-gray-200 mx-4 mb-8"
                key={job._id}
              >
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2 ">{job.title}</div>
                  <div className="px-6 pb-2 text-center">
                    <Link to={`/employees/${job.employerId._id}/${job._id}`}>
                      <button className="bg-camelot text-white px-4 py-2 mb-2 rounded-md">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
