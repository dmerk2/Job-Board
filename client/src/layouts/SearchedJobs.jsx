import { useQuery } from "@apollo/client";
import { QUERY_JOBS } from "../utils/queries";
import { useSelector } from "react-redux";
import Loading from "../components/Loading/Loading.jsx";
import Employer_Card from "../components/Job_Cards/Employer_Card.jsx";

function SearchedJobs() {
  const title = useSelector((state) => state.job.title) || '';
  const { loading, data, error } = useQuery(QUERY_JOBS, {
    variables: { title: title || localStorage.getItem("title") },
  });

  if (loading) return <Loading />;
  if (error) {
    console.error("Error fetching jobs:", error);
    return <p>Error fetching jobs</p>;
  }

  const jobs = data?.jobListings || [];
  
  // Filter jobs based on title
  const filteredJobs = jobs.filter(job => job.title.toLowerCase().includes(title.toLowerCase()));
  
  console.log(filteredJobs); // Log the filtered jobs
  return (
    <div>
      <h2 className="text-center text-3xl font-bold my-6">Job Listings</h2>

      <Employer_Card jobs={filteredJobs} itemsToShow={filteredJobs.length}  />

    </div>
  );
}

export default SearchedJobs;
