import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../utils/queries";
import auth from "../utils/auth";
import SearchBar from "../components/Searchbar/Searchbar";
import Job_Search from "../assets/Hop_On_Board_Job_Search.png";
import Resume from "../assets/Hop_On_Board_Resume.png";

function Home() {
  const loggedIn = auth.loggedIn();
  let role = null;

  if (loggedIn) {
    role = "employer";
  }

  const { loading, data } = useQuery(QUERY_USERS, {
    variables: {
      role: role,
    },
  });

  if (loading) return <div>Loading...</div>;

  const employers = data?.users || [];

  return (
    <>
      <div className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-2 flex py-4 justify-center text-center rounded-full bg-meteorite text-athens_gray">
            Hop on Board to a new career, today!
          </h2>
          <h3 className="text-2xl mb-8 flex justify-center text-camelot">
            Find your dream job with us.
          </h3>
          <SearchBar />
        </div>
      </div>

      <section className="container mx-auto px-6 p-10">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Features
        </h2>
        <div className="flex items-center flex-wrap mb-20">
          <div className="w-full md:w-1/2">
            <div className="w-full md:w-1/2">
              <h4 className="text-3xl text-gray-800 font-bold mb-3">
                Discover Your Dream Job
              </h4>
              <p className="text-gray-600 mb-8">
                Embark on an exhilarating journey with Hop on Board as you
                navigate through a sea of boundless career opportunities. Our
                intuitive job search feature empowers you to explore and uncover
                the perfect role tailored to your unique preferences and
                unparalleled skills. Dive deep into a world of endless
                possibilities, where every click brings you closer to your dream
                job. With Hop on Board by your side, the adventure of a lifetime
                awaits as you embark on a quest to find the career path that
                ignites your passion and fulfills your ambitions.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <img src={Job_Search} alt="Job Search" className="w-80" />
          </div>
        </div>

        <div className="flex items-center flex-wrap mb-20">
          <div className="w-full md:w-1/2">
            <img src={Resume} alt="Portfolio Building" className="pr-8 w-80" />
          </div>
          <div className="w-full md:w-1/2">
            <h4 className="text-3xl text-gray-800 font-bold mb-3">
              Personalized Profile Showcase
            </h4>
            <p className="text-gray-600 mb-8">
              Hop on Board elevates your professional presence with a dazzling,
              customizable profile showcase. Unleash your full potential by
              crafting a captivating profile adorned with your striking
              portrait, a captivating bio that narrates your career journey, and
              a meticulously curated list of your unparalleled skills. Impress
              potential employers with a glimpse into your unique personality
              and expertise, all beautifully showcased in one mesmerizing
              digital space. It is not just a profile page, it is your spotlight on
              the grand stage of career opportunities.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-100">
        <div className="container mx-auto px-6 py-20">
          <h1 className="text-3xl text-center font-bold mb-4">Employers</h1>
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
                  <a
                    href={`mailto:${employer.email}`}
                    style={{ color: "blue" }}
                  >
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
          {!loggedIn && (
            <p className="text-center mt-4">
              <Link to="/login" className="text-blue-500 underline">
                Log in
              </Link>
              to view more details and apply for jobs.
            </p>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;
