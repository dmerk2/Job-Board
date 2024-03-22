import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_JOB } from "../utils/mutations";
import { QUERY_ALL_JOBS } from "../utils/queries";
import SuccessModal from "../components/Modals/SuccessModal";
import ErrorModal from "../components/Modals/ErrorModal";
import SkillInput from "../components/AddSkills/SkillInput";

function PostJob() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const [addJob] = useMutation(ADD_JOB, {
    refetchQueries: [{ query: QUERY_ALL_JOBS }],
  });
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    skills: [],
    newSkill: "", // New state to handle input for adding new skills
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const titleWithSpaces = formData.title.replace(/-/g, " ");
    if (formData.skills.length === 0) {
      setIsErrorModalOpen(true);
      return;
    }
    try {
      await addJob({
        variables: {
          title: titleWithSpaces,
          description: formData.description,
          location: formData.location,
          skills: formData.skills,
        },
      });
      setFormData({
        title: "",
        description: "",
        location: "",
        skills: [],
        newSkill: "",
      });
      setIsModalOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addSkill = (e) => {
    e.preventDefault();
    if (formData.newSkill.trim() !== "") {
      setFormData({
        ...formData,
        skills: [...formData.skills, formData.newSkill],
        newSkill: "",
      });
    }
  };

  const handleRemoveSkill = (index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      skills: prevFormData.skills.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {isErrorModalOpen && (
        <ErrorModal
          setIsErrorModalOpen={setIsErrorModalOpen}
          message={"Skills must be entered."}
        />
      )}
      <div className="w-full space-y-4">
        <div className="flex">
          <h2 className="mt-6 px-4 py-2 rounded-full text-center text-meteorite mx-auto text-3xl font-bold">
            Post a Job
          </h2>
        </div>
        <div className="flex justify-center mx-auto">
          <form className="mt-8 w-1/2" onSubmit={handleFormSubmit}>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-1/2 space-y-4 px-4">
                <div>
                  <label htmlFor="title" className="sr-only">
                    Job Title
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    autoComplete="title"
                    required
                    className="appearance-none rounded-md shadow-sm relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Job Title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="description" className="sr-only">
                    Job Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    autoComplete="description"
                    required
                    className="appearance-none rounded-md shadow-sm relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Job Description"
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="location" className="sr-only">
                    Job Location
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    autoComplete="location"
                    required
                    className="appearance-none rounded-md shadow-sm relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Job location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="w-full lg:w-1/2 space-y-4 px-4">
                <SkillInput
                  newSkill={formData.newSkill}
                  handleChange={handleChange}
                  handleAddSkill={addSkill}
                  handleRemoveSkill={handleRemoveSkill}
                  formData={formData}
                />
              </div>
            </div>
            <div className="w-full text-center">
              <button
                type="submit"
                className="w-1/4 flex justify-center mt-4 mx-auto py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue_marguerite hover:bg-meteorite"
              >
                Post Job
              </button>
            </div>
          </form>
          {isModalOpen && (
            <SuccessModal
              setIsModalOpen={setIsModalOpen}
              message={"Job posted successfully!"}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default PostJob;
