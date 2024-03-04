import { useQuery } from "@apollo/client";
import { QUERY_ALL_JOBS } from "../utils/queries";
import { Link } from "react-router-dom";
import Loading from "../components/Loading/Loading.jsx";

// eslint-disable-next-line react/prop-types
function JobBoard({ itemsToShow }) {
  const { loading, data } = useQuery(QUERY_ALL_JOBS);

  if (loading) return <Loading/>;

  const jobs = data?.allJobs || [];
  return (
    <section>
      <div className="flex justify-center">
        <div className="flex flex-wrap container mx-auto px-6 py-10">
          {jobs.slice(0, itemsToShow).map((job) => (
            <div
              key={job._id}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"
            >
              <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white border border-gray-200">
                <div className="px-6 py-4">
                  <h2 className="font-bold text-2xl mb-2 text-center">
                    {job.employerId.username}
                  </h2>
                  <p className="font-bold text-xl mb-2">{job.title}</p>
                  <p className="text-gray-700 mb-4">{job.description}</p>
                  <p className="font-bold text-lg">{job.location}</p>
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
      </div>
    </section>
  );
}

export default JobBoard;
