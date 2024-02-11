import { useQuery } from "@apollo/client";
import { QUERY_JOB } from "../utils/queries";
import { useParams } from "react-router-dom";

function JobListing() {
  const { id } = useParams();
  const { loading, data } = useQuery(QUERY_JOB, { variables: { id: id } });
  const job = data?.jobListing || [];
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>{job.title}</h1>
      <p>{job.description}</p>
      <p>{job.location}</p>
      <div>
        <h2>Skills Needed:</h2>
        <ul>
          {job.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default JobListing;
