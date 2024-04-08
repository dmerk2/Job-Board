import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import { UPDATE_USER } from "../utils/mutations";
import { Link } from "react-router-dom";
import { getUserRole } from "../utils/helpers";
import SuccessModal from "../components/Modals/SuccessModal";
import ErrorModal from "../components/Modals/ErrorModal";
import Loading from "../components/Loading/Loading.jsx";
import SkillInput from "../components/AddSkills/SkillInput.jsx";

function Profile() {
  const role = getUserRole();
  const [updateUser] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: QUERY_USER }],
  });
  const { loading, data, error } = useQuery(QUERY_USER);
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
  const [profilePictureUrl, setProfilePictureUrl] = useState(
    import.meta.env.VITE_AWS_DEFAULT_IMAGE
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const user = data?.user || {};

  useEffect(() => {
    if (!loading && data) {
      const user = data.user;
      if (user.profilePictureUrl) {
        setProfilePictureUrl(user.profilePictureUrl);
      }
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

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setModifiedFields((prevModifiedFields) => ({
      ...prevModifiedFields,
      file: true,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const uploadData = new FormData();
  
    // Only append file to formData if a file is selected
    if (selectedFile) {
      uploadData.append("file", selectedFile);
      uploadData.append("_id", user._id);
  
      try {
        const serverURL = process.env.NODE_ENV === 'production' ? "https://job-board-7cc9.onrender.com" : 'http://localhost:3001/upload';
        const response = await fetch(serverURL, {
          method: "POST",
          body: uploadData,
        });
  
        if (!response.ok) {
          throw new Error("Failed to upload image");
        }
  
        // Get the image URL from the response
        const data = await response.json();
        const imageUrl = data.imageUrl;
  
        // Update the user's account with the image URL
        const updatedFields = { profilePictureUrl: imageUrl };
        await updateUser({
          variables: updatedFields,
        });
  
        // Update the profile picture URL state variable
        setProfilePictureUrl(imageUrl);
      } catch (error) {
        console.error(error);
      }
    }
  
    // Update the other user fields
    const updatedUserFields = {};
    for (const key in modifiedFields) {
      if (modifiedFields[key]) {
        updatedUserFields[key] = formData[key];
      }
    }
    if (Object.keys(updatedUserFields).length > 0) {
      await updateUser({
        variables: updatedUserFields,
      });
    }
  
    setIsModalOpen(true);
  };

  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="min-h-screen justify-center py-12 px-4 sm:px-6 lg:px-8">
      {isErrorModalOpen && (
        <ErrorModal
          setIsErrorModalOpen={setIsErrorModalOpen}
          message={"Please update at least one field."}
        />
      )}
      {isModalOpen && (
        <SuccessModal
          setIsModalOpen={setIsModalOpen}
          message={"Profile updated successfully!"}
        />
      )}
      <div className="flex">
        <h2 className="mt-6 text-center mx-auto text-3xl font-bold text-gray-900">
          Profile
        </h2>
      </div>
      <div className="flex justify-center my-auto mx-0 md:mx-auto">
        <form
          onSubmit={handleFormSubmit}
          className="mt-6 w-1/2"
          encType="multipart/form-data"
        >
          <label htmlFor="profilePicture" className="sr-only text-2xl mr-2">
            Profile Picture:
          </label>
          <img
            src={user.profileImage || profilePictureUrl}
            alt="Profile"
            className="profile-picture "
          />
          <div className="  mt-6 md:border md:border-gray-300 md:text-gray-900 text-sm outline-none rounded-md w-max cursor-pointer mx-auto block">
            <label className="block md:hidden bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-3 py-2 cursor-pointer">Choose File
            <input type="file" onChange={handleFileChange} className="hidden"/>
            </label>
            <input type="file" onChange={handleFileChange} className="hidden md:block"/>
          </div>
          <br />
          <br />
          <div className="grid xl:grid-cols-2 gap-4">
            <div className=" xl:pr-4">
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
                Name:
              </label>
              <div className="grid md:grid-cols-2 gap-3">
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-camelot focus:border-camelot focus:z-10 sm:text-sm"
                  onChange={handleChange}
                />
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-camelot focus:border-camelot focus:z-10 sm:text-sm"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="xl:pl-4">
              <label htmlFor="bio" className="text-2xl mr-2">
                Bio:
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                rows="6"
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-camelot focus:border-camelot focus:z-10 sm:text-sm"
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
            </div>
          </div>
          <br />
          {role === "employee" && (
            <SkillInput
              newSkill={formData.newSkill}
              handleChange={handleChange}
              handleAddSkill={handleAddSkill}
              handleRemoveSkill={handleRemoveSkill}
              formData={formData}
            />
          )}
           <br />
          <button
            type="submit"
            className="group relative w-full md:w-1/2 lg:w-1/4 flex mx-auto justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update Profile
          </button>
          <h3 className="text-center mt-4 mb-8 text-2xl font-bold">
            {role === "employee" ? "Previously Applied Jobs" : "Posted Jobs"}
          </h3>
          <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-10">
            {user?.[role === "employee" ? "appliedJobs" : "listedJobs"]?.map(
              (job) => (
                <div
                  className="max-w-sm rounded overflow-hidden shadow-lg bg-white border border-gray-200 mx-4 mb-8"
                  key={job._id}
                >
                  <div className="px-6 py-4">
                    <Link to={`/employees/${job.employerId._id}/${job._id}`}>
                      <div className="font-bold text-xl mb-2 text-center">
                        {console.log("Job:", job)}
                        <p className="font-bold">{job.title}</p>
                        <p className="font-medium">{job.location}</p>
                        <div className="font-thin">Posted on: </div>
                        <div className="font-thin">
                          {new Date(parseInt(job.createdAt)).toLocaleDateString(
                            "en-US",
                            {
                              timeZone: "UTC",
                            }
                          )}
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              )
            )}
          </div>
         
        </form>
      </div>
    </div>
  );
}

export default Profile;
