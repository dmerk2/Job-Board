import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../utils/queries";
import { getUserRole } from "../utils/helpers";
import Loading from "../components/Loading/Loading.jsx";
import Employee_Card from "../components/Job_Cards/Employee_Card.jsx";

function UserBoard() {
  const role = getUserRole()

  const queryRole = role === 'employer' ? 'employee' : role;

  const { loading, data } = useQuery(QUERY_USERS, {
    variables: {
      role: queryRole,
    },
  });

  if (loading) return <Loading/>;

  const employees = data?.users || [];

  return (
    <section className="justify-center py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl text-center font-bold mb-4">Employees</h1>
     < Employee_Card employees = {employees} />
    </section>
  );
}

export default UserBoard;
