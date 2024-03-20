import { useQuery } from "@apollo/client";
import { QUERY_ALL_JOBS } from "../../utils/queries";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading/Loading.jsx";
import PropTypes from "prop-types";

function Employer_Card({ jobs, itemsToShow, title }) {
  const { loading } = useQuery(QUERY_ALL_JOBS);
  const filteredJobs = title ? jobs.filter((job) => job.title === title) : jobs;

  if (loading) return <Loading />;

  return (
    <div className=" mx-20 my-10 grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-10">
      {filteredJobs && filteredJobs.length > 0 ? (
        filteredJobs.slice(0, itemsToShow).map((job) => (
          <div
            className="max-w-sm rounded overflow-hidden shadow-lg bg-white border border-gray-200"
            key={job._id}
          >
            <div className="px-6 py-4">
              <h2 className="font-bold text-2xl mb-2 text-center">
                {job.employerId.username}
              </h2>
              <p className="font-bold text-xl mb-2">{job.title}</p>
              <p className="font-bold text-lg mb-2">{job.location}</p>
              <div className="flex mb-6">
                <div className="font-bold mr-3">Posted on: </div>
                {new Date(parseInt(job.createdAt)).toLocaleDateString("en-US", {
                  timeZone: "UTC",
                })}
              </div>
              <p className="text-gray-700">{job.description}</p>
            </div>
            <div className="px-6 pb-2 text-center">
              <Link to={`/employees/${job.employerId._id}/${job._id}`}>
                <button className="bg-camelot text-white px-4 py-2 mb-2 rounded-md">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <h3 className="text-center align-items text-2xl text-red-500 my-5">
          No jobs found
        </h3>
      )}
    </div>
  );
}

Employer_Card.propTypes = {
  jobs: PropTypes.array.isRequired,
  itemsToShow: PropTypes.number,
  title: PropTypes.string,
};

export default Employer_Card;
