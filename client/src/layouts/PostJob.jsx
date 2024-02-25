import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_JOB } from "../utils/mutations";
import { QUERY_JOBS } from "../utils/queries";

function PostJob() {
  const [addJob] = useMutation(ADD_JOB, {
    refetchQueries: [{ query: QUERY_JOBS }],
  });
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    location: "",
    skills: [],
    newSkill: "", // New state to handle input for adding new skills
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Replace hyphens with spaces to save in database
    const titleWithSpaces = formState.title.replace(/-/g, " ");
    if (formState.skills.length === 0) {
      alert("Skills must be entered.");
      return;
    }
    try {
      await addJob({
        variables: {
          title: titleWithSpaces,
          description: formState.description,
          location: formState.location,
          skills: formState.skills,
        },
      });
      // Clear form after successful submission
      setFormState({
        title: "",
        description: "",
        location: "",
        skills: [],
        newSkill: "",
      });
      setFormSubmitted(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const addSkill = (e) => {
    e.preventDefault();
    if (formState.newSkill.trim() !== "") {
      setFormState({
        ...formState,
        skills: [...formState.skills, formState.newSkill],
        newSkill: "",
      });
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full space-y-4">
        <div className="flex">
          <h2 className="mt-6 px-4 py-2 rounded-full text-center bg-meteorite mx-auto text-3xl font-bold text-white">
            Post a Job
          </h2>
        </div>
        <div className="flex justify-center mx-auto">
        <form className="mt-8 w-1/2" onSubmit={handleFormSubmit}>
          <div className="flex">
            <div className="w-1/2 space-y-4">
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
                value={formState.title}
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
                value={formState.description}
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
                className="appearance-none rounded-md shadow-sm relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Job Location"
                value={formState.location}
                onChange={handleChange}
              />
            </div>
            </div>
            <div className="w-1/2">
            <div className="flex justify-center mx-auto space-x-4">
              <label htmlFor="skills" className="sr-only">
                Skills Needed
              </label>
              <input
                id="skills"
                name="newSkill"
                type="text"
                autoComplete="skills"
                value={formState.newSkill}
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill(e);
                  }
                }}
                placeholder="Add a skill"
                className="appearance-none mr-6 rounded-md shadow-sm relative block w-2/5 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
              <button
                type="button"
                onClick={addSkill}
                className="w-2/5 my-auto py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue_marguerite hover:bg-meteorite"
              >
                Add Skill
              </button>
            </div>
            {/* Display entered skills */}
            <div>
              {formState.skills.map((skill, index) => (
                <div key={index} className="flex justify-center mx-auto my-3 bg-gray-200 w-1/2 p-2 rounded-md shadow-sm  mt-2">
                  {skill}
                </div>
              ))}
            </div>
          </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-1/4 flex justify-center mt-4 mx-auto py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue_marguerite hover:bg-meteorite"
            >
              Post Job
            </button>
          </div>
        </form>
        {formSubmitted && (
          <div
            className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md"
            role="alert"
          >
            <p className="font-bold">Form submitted successfully!</p>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}

export default PostJob;
