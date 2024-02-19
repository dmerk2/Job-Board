import { useQuery } from "@apollo/client";
import { QUERY_JOBS } from "../utils/queries";
import { useSelector } from "react-redux";

function SearchedJobs() {
  const title = useSelector((state) => state.job.title);
  console.log("title", title);
  const { loading, data } = useQuery(QUERY_JOBS, {
    variables: { title: title || "" },
  });
  console.log("data", data);
  if (loading) return <div>Loading...</div>;
  return (
    <div>
      <h1>Job Listings</h1>
      <div>
        {data && data.jobs ? (
          data.jobs.map((job) => (
            <div key={job._id}>
              <h3>{job.title}</h3>
              <p>{job.description}</p>
              <p>{job.location}</p>
            </div>
          ))
        ) : (
          <p>No jobs found</p>
        )}
      </div>
    </div>
  );
}

export default SearchedJobs;
