import { useQuery } from "@apollo/client";
import { QUERY_ALL_JOBS } from "../utils/queries";
import { Link } from "react-router-dom";

function JobBoard({ itemsToShow }) {
  const { loading, data } = useQuery(QUERY_ALL_JOBS);

  if (loading) return <div>Loading...</div>;

  const jobs = data?.allJobs || [];
  console.log(jobs);

  return (
    <section>
      <div className="container mx-auto px-6 py-20">
        <div className="flex justify-center">
          {jobs.slice(0, itemsToShow).map((job) => (
            <div
              key={job._id}
              className="max-w-sm rounded overflow-hidden shadow-lg bg-white border border-gray-200 mx-4 mb-8"
            >
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 ">{job.title}</div>
                <p className="text-gray-700 mb-4">{job.description}</p>
                <div className="font-bold text-lg">{job.location}</div>
              </div>
              <div className="px-6 pt-4 pb-2">
                {job.skills.map((skill, index) => (
                  <span
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                    key={index}
                  >
                    #{skill}
                  </span>
                ))}
              </div>
              {/* <div className="px-6 pb-2">
                <Link to={`/employers/${job.employer._id}/${job._id}`}>
                  <button className="bg-camelot text-white px-4 py-2 rounded-md">
                    View Details
                  </button>
                </Link>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default JobBoard;