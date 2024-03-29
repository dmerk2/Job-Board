import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../../utils/queries";
import { getUserRole } from "../../utils/helpers";
import Loading from "../../components/Loading/Loading.jsx";

function Employee_Card() {
  const role = getUserRole();

  const queryRole = role === "employer" ? "employee" : role;

  const { loading, data } = useQuery(QUERY_USERS, {
    variables: {
      role: queryRole,
    },
  });

  if (loading) return <Loading />;

  const employees = data?.users || [];

  return (
    <div className="flex justify-center">
      {employees.map((employee) => (
        <div
          className="max-w-sm rounded overflow-hidden shadow-lg bg-white border border-gray-200 mx-4 mb-8"
          key={employee._id}
        >
          <div className="px-6 py-4">
            <div className="font-bold text-2xl text-center mb-4">
              {employee.firstName} {employee.lastName}
            </div>
            <img
              src={
                employee.profileImage || import.meta.env.VITE_AWS_DEFAULT_IMAGE
              }
              alt="Profile"
              className="profile-picture-card"
            />
            <div className="font-bold text-lg">{employee.location}</div>
            <div className="mt-2 text-lg no-underline hover:underline">
              <a href={`mailto:${employee.email}`} style={{ color: "blue" }}>
                {employee.email}
              </a>
            </div>
            <p className="text-gray-700 my-4">{employee.bio}</p>
          </div>
          <div className="px-6 py-2">
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
  );
}

export default Employee_Card;
