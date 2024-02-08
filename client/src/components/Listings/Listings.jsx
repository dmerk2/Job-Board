import { useQuery } from "@apollo/client";
import { QUERY_USERS, getUserRole } from "../../utils/queries";

function Listings() {
  const { data: roleData } = useQuery(getUserRole);
  const role = roleData ? roleData.getUserRole : null;

  const { loading, data } = useQuery(QUERY_USERS, {
    variables: {
      role: role === 'employee' ? 'employer' : 'employee',
    },
  });


  if (loading) return <div>Loading...</div>;

  const employers = data?.users || [];
  console.log(role);

  return (
    <section>
      <div className="container mx-auto px-6 py-20">
        <div className="flex justify-center">
          {employers.map((employer) => (
            <div
              key={employer._id}
              className="max-w-sm rounded overflow-hidden shadow-lg bg-white border border-gray-200 mx-4 mb-8"
            >
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 ">
                  {employer.username}
                </div>
                <a href={`mailto:${employer.email}`} style={{ color: "blue" }}>
                  {employer.email}
                </a>
                <p className="text-gray-700 mb-4">{employer.bio}</p>
                <div className="font-bold text-lg">{employer.location}</div>
              </div>
              <div className="px-6 pt-4 pb-2">
                {employer.skills.map((skill, index) => (
                  <span
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                    key={index}
                  >
                    #{skill}
                  </span>
                ))}
              </div>
              <div className="px-6 pb-2">
                <div className="font-bold text-lg">Other Listings</div>
                <div>
                  {employer.listedJobs.map((job, index) => (
                    <a
                      className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                      key={index}
                      href={`/employees/${employer._id}/${job._id}`}
                    >
                      {job.title}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Listings;
