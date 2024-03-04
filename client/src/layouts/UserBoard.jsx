import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../utils/queries";
import { getUserRole } from "../utils/helpers";
import Loading from "../components/Loading/Loading.jsx";

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
      <div className="flex justify-center">
        {employees.map((employee) => (
          <div
            className="max-w-sm rounded overflow-hidden shadow-lg bg-white border border-gray-200 mx-4 mb-8"
            key={employee._id}
          >
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2 ">{employee.username}</div>
              <a href={`mailto:${employee.email}`} style={{ color: "blue" }}>
                {employee.email}
              </a>
              <p className="text-gray-700 mb-4">{employee.bio}</p>
              <div className="font-bold text-lg">{employee.location}</div>
            </div>
            <div className="px-6 pt-4 pb-2">
              {employee.skills.map((skill, index) => (
                <span
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                  key={index}
                >
                  #{skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default UserBoard;
