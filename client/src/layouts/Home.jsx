import { Link } from "react-router-dom";
import Listings from "../components/Listings/Listings";
import auth from "../utils/auth";
import SearchBar from "../components/Searchbar/Searchbar";
import Job_Search from "../assets/Hop_On_Board_Job_Search.png";
import Resume from "../assets/Hop_On_Board_Resume.png";

function Home() {
  const loggedIn = auth.loggedIn();
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
              digital space. It is not just a profile page, it is your spotlight
              on the grand stage of career opportunities.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-100">
        <h1 className="text-3xl text-center font-bold mb-4">Employers</h1>
        <Listings />
        {!loggedIn && (
          <p className="text-center mt-4">
            <Link to="/login" className="text-blue-500 underline">
              Log in
            </Link>
            to view more details and apply for jobs.
          </p>
        )}
      </section>
    </>
  );
}

export default Home;
