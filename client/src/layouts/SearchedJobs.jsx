import { useQuery } from "@apollo/client";
import { QUERY_JOBS } from "../utils/queries";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../components/Loading/Loading.jsx";

function SearchedJobs() {
  const title = useSelector((state) => state.job.title);
  const { loading, data } = useQuery(QUERY_JOBS, {
    variables: { title: title || "" },
  });
  // Check if data is undefined or loading
  if (!data || loading) return <Loading/>;

  // Once data is fetched and not loading, render job listings
  return (
    <div>
      <h2 className="text-center text-3xl font-bold my-6">Job Listings</h2>

      <div className=" mx-20 my-10 grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-10">
        {data.jobListings && data.jobListings.length > 0 ? (
          data.jobListings.map((job) => (
            
            <div  className="max-w-sm rounded overflow-hidden shadow-lg bg-white border border-gray-200" key={job._id}>
              <div className="px-6 py-4">
                <h2 className="font-bold text-2xl mb-2 text-center">
                  {job.employerId.username}
                </h2>
                <p className="font-bold text-xl mb-2">{job.title}</p>
                <p className="font-bold text-lg mb-2">{job.location}</p>
              <div className="flex mb-6">
                <div className="font-bold mr-3">Posted on:{" "}</div>
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
    </div>
  );
}

export default SearchedJobs;
