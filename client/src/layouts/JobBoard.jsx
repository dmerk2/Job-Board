import { useQuery } from "@apollo/client";
import { QUERY_ALL_JOBS } from "../utils/queries";
import Employer_Card from "../components/Job_Cards/Employer_Card.jsx";
import Loading from "../components/Loading/Loading.jsx";

function JobBoard ({  itemsToShow }) {
  const { loading, data } = useQuery(QUERY_ALL_JOBS);

  if (loading) return <Loading/>;

  const jobs = data?.allJobs || [];

  return (
   <Employer_Card jobs={jobs} itemsToShow={itemsToShow} />
  );
}

export default JobBoard;