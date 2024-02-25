import { useQuery, useMutation } from "@apollo/client";
import { QUERY_JOB } from "../utils/queries";
import { useParams } from "react-router-dom";
import { APPLY_JOB } from "../utils/mutations";
import auth from "../utils/auth";
import { useState } from "react";

function JobListing() {
  const loggedIn = auth.loggedIn();
  const userId = auth.getProfile().data._id;
  const { id } = useParams();
  const { loading, data } = useQuery(QUERY_JOB, { variables: { id: id } });
  const [applyJobMutation] = useMutation(APPLY_JOB);
  const jobTitle = data?.jobListing.title;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const job = data?.jobListing || [];
  if (loading) {
    return <div>Loading...</div>;
  }

  const applyJob = async () => {
    try {
      await applyJobMutation({
        variables: { jobId: userId },
      });
      setIsModalOpen(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto px-6 py-20 w-1/2">
      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Thank you for applying as a {jobTitle}! If you are a match a recruiter
                      will be in touch.
                    </h3>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <h2 className="font-bold text-2xl mb-2 text-center">
        {job.employerId.username}
      </h2>
      <h3 className="font-bold text-xl mb-2">{job.title}</h3>
      <p className="text-gray-700 mb-4">{job.description}</p>
      <p className="text-gray-700 mb-4">{job.location}</p>
      <div>
        <h2>Skills Needed:</h2>
        <div className="pt-4 pb-2">
          {job.skills.map((skill, index) => (
            <span
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
              key={index}
            >
              #{skill}
            </span>
          ))}
        </div>
        <p className="text-gray-700 mb-4">
          Posted on:{" "}
          {new Date(parseInt(job.createdAt)).toLocaleDateString("en-US", {
            timeZone: "UTC",
          })}
        </p>
        {loggedIn && (
          <button
            onClick={() => applyJob()}
            className="bg-camelot text-white px-4 py-2 rounded-md"
          >
            Apply Here
          </button>
        )}
      </div>
    </div>
  );
}

export default JobListing;
