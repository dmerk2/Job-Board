import "./Header.css";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import Logo from "../../assets/Hop_On_Board_Logo.png";
import { getUserRole } from "../../utils/helpers";
import BrandName from "../../assets/Hop_On_Board_Name.png";
import { useState } from "react";
import { QUERY_USER } from "../../utils/queries";
import { useQuery } from "@apollo/client";

const Header = () => {
  const role = getUserRole();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userId = Auth.loggedIn() ? Auth.getProfile().data._id : null;
  const { data } = useQuery(QUERY_USER);
  const user = data?.user || {};

  return (
    <header>
      <nav className="bg-athens_gray border-b-5 border-blue_marguerite px-4 text-2xl lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <img src={Logo} className="h-9 sm:h-12" alt="Hop on Board Logo" />
            <img
              src={BrandName}
              className="h-9 sm:h-12"
              alt="Hop On Board Name"
            />
          </Link>
          <div className="flex items-center text-2xl lg:order-2">
            {Auth.loggedIn() ? (
              <>
                <Link
                  onClick={() => Auth.logout()}
                  className="block py-2 pr-4 pl-3 text-camelot hover:border-b-2 border-camelot lg:p-0"
                >
                  Log Out
                </Link>
                <img
                  src={
                    user.profileImage || import.meta.env.VITE_AWS_DEFAULT_IMAGE
                  }
                  alt="Profile"
                  className="w-10 h-10 ml-4 rounded-full object-cover lg:w-12 lg:h-12 border-2 border-blue_marguerite"
                />
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block py-2 pr-4 pl-3 text-camelot hover:border-b-2 border-camelot lg:p-0"
                >
                  Log In
                </Link>
                <img
                  src={
                    user.profileImage || import.meta.env.VITE_AWS_DEFAULT_IMAGE
                  }
                  alt="Profile"
                  className="w-10 h-10 ml-4 rounded-full object-cover lg:w-12 lg:h-12 border-2 border-blue_marguerite"
                />
              </>
            )}
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
              }}
              className="inline-flex items-center p-2 ml-1 text-sm rounded-lg lg:hidden hover:bg-gray-100"
              aria-controls="mobile-menu-2"
              aria-expanded={isMenuOpen ? "true" : "false"}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6 text-camelot"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                className="hidden w-6 h-6 text-camelot"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className={`${
              isMenuOpen
                ? "block"
                : "hidden lg:flex lg:w-auto lg:order-1" /* Adjust for small screens */
            } w-full lg:flex lg:items-center lg:w-auto lg:space-x-8`}
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              {Auth.loggedIn() ? (
                role === "employer" ? (
                  <>
                    <li>
                      <Link
                        to="/employers/home"
                        className="block py-2 pr-4 pl-3 text-camelot hover:border-b-2 border-camelot lg:p-0"
                      >
                        Applicants
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={`/${userId}/profile`}
                        className="block py-2 pr-4 pl-3 text-camelot hover:border-b-2 border-camelot lg:p-0"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/employers/job-form"
                        className="block py-2 pr-4 pl-3 text-camelot hover:border-b-2 border-camelot lg:p-0"
                      >
                        Create A Post
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        to="/employees/home"
                        className="block py-2 pr-4 pl-3 text-camelot hover:border-b-2 border-camelot lg:p-0"
                      >
                        Jobs
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={`/${userId}/profile`}
                        className="block py-2 pr-4 pl-3 text-camelot hover:border-b-2 border-camelot lg:p-0"
                      >
                        Profile
                      </Link>
                    </li>
                  </>
                )
              ) : (
                <>
                  <li>
                    <Link
                      to="/employees/home"
                      className="block py-2 pr-4 pl-3 text-camelot hover:border-b-2 border-camelot lg:p-0"
                    >
                      Jobs
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
