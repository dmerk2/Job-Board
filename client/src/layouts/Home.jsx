import JobBoard from "../layouts/JobBoard";
import SearchBar from "../components/Searchbar/Searchbar";
import Job_Search from "../assets/Hop_On_Board_Job_Search.png";
import Resume from "../assets/Hop_On_Board_Resume.png";
import { Link } from "react-router-dom";

function Home() {

  return (
    <>
      <section className="py-20 flex bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl justify-center font-bold mb-2 mx-auto py-4 text-center rounded-full bg-meteorite text-athens_gray lg:w-1/2 md:w-3/4 sm:w-full lg:rounded-full 2xs:rounded-lg xs:w-full 2xs:w-full">
            Hop on Board to a new career, today!
          </h2>
          <h3 className="text-2xl mb-8 flex justify-center text-camelot">
            Find your dream job with us.
          </h3>
          <SearchBar />
        </div>
      </section>

      <section className="container mx-auto px-6 p-10">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Features
        </h2>

        <div className="flex flex-col md:flex-row justify-center items-center md:items-start md:justify-between mb-10">
          <div className="w-full md:w-1/2 md:pr-8 lg:hidden sm:block pb-6">
            <img src={Job_Search} alt="Job Search" className="w-1/2 mx-auto" />
          </div>
          <div className="my-auto w-full md:w-1/2 md:pl-8">
            <h4 className="text-3xl text-gray-800 font-bold mb-3 text-center">
              Discover Your Dream Job
            </h4>
            <p className="text-justify text-gray-600 mb-8 w-3/4 mx-auto">
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
          <div className="w-full md:w-1/2 md:pr-8 lg:block sm:hidden xs:hidden 2xs:hidden">
            <img src={Job_Search} alt="Job Search" className="w-1/2 mx-auto" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center md:items-start md:justify-between">
          <div className="w-full md:w-1/2 md:pr-8 sm:pb-6 xs:pb-6 2xs:pb-6">
            <img
              src={Resume}
              alt="Portfolio Building"
              className="w-1/2 mx-auto"
            />
          </div>
          <div className="w-full my-auto md:w-1/2 md:pl-8">
            <h4 className="text-3xl text-gray-800 font-bold mb-3 text-center">
              Personalized Profile Showcase
            </h4>
            <p className=" text-justify text-gray-600 mb-8 w-3/4 mx-auto">
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
        <h2 className="text-3xl text-center font-bold pt-10">Jobs</h2>
        <JobBoard itemsToShow={4} />
        <div className="text-center">
          <Link to="/employees/home">
            <button className="bg-camelot text-white mb-10 px-4 rounded-lg py-3">
              All Jobs
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;
