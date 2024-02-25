import { useQuery, useMutation } from "@apollo/client";
import { QUERY_JOB } from "../utils/queries";
import { useParams } from "react-router-dom";
import { APPLY_JOB } from "../utils/mutations";
import auth from "../utils/auth";

function JobListing() {
  const loggedIn = auth.loggedIn();
  const { id } = useParams();
  const { loading, data } = useQuery(QUERY_JOB, { variables: { id: id } });
  const [applyJobMutation] = useMutation(APPLY_JOB);
  const jobTitle = data?.jobListing.title;

  const job = data?.jobListing || [];
  if (loading) {
    return <div>Loading...</div>;
  }

  const applyJob = async () => {
    try {
      await applyJobMutation({
        variables: { jobId: id },
      });
      alert(`Thank you for applying to ${jobTitle}!`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container min-h-screen mx-auto px-6 py-20 w-1/2">
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
