import { useQuery } from "@apollo/client";
import { QUERY_JOBS } from "../utils/queries";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function SearchedJobs() {
  const title = useSelector((state) => state.job.title);
  const { loading, data } = useQuery(QUERY_JOBS, {
    variables: { title: title || "" },
  });
  // Check if data is undefined or loading
  if (!data || loading) return <div>Loading...</div>;

  // Once data is fetched and not loading, render job listings
  return (
    <div>
      <h2 className="text-center text-3xl font-bold">Job Listings</h2>

      <div>
        {data.jobListings && data.jobListings.length > 0 ? (
          data.jobListings.map((job) => (
            <div key={job._id}>
              <h3>{job.title}</h3>
              <h3>{job.employerId.username}</h3>
              <p>{job.description}</p>
              <p>{job.location}</p>
              <p>
                Posted on:{" "}
                {new Date(parseInt(job.createdAt)).toLocaleDateString("en-US", {
                  timeZone: "UTC",
                })}
              </p>
              <Link to={`/employees/${job.employerId._id}/${job._id}`}>
                <button className="bg-camelot text-white px-4 py-2 mb-2 rounded-md">
                  View Details
                </button>
              </Link>
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
