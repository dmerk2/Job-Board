import "./Header.css";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import Logo from "../../assets/Hop_On_Board_Logo.png";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header grid grid-cols-3 items-center">
      <div className="flex justify-start md:justify-start md:order-1">
        <img
          src={Logo}
          alt="Hop On Board Logo"
          className="item text-3xl"
          width="75"
        ></img>
      </div>
      <div className="flex justify-center order-2 md:order-2">
        <Link to="/" className="item text-3xl">
          Hop On Board
        </Link>
      </div>
      <nav className="right menu flex justify-end order-3 md:order-3 text-camelot text-xl">
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          Menu
        </button>
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex md:items-center md:space-x-4`}
        >
          {Auth.loggedIn() ? (
            <>
              <Link
                to="/employers/home"
                className="item pr-2 hover:border-b-2 border-camelot"
              >
                Applicants
              </Link>
              <p className="hidden md:block"> | </p>
              <Link
                to="/employees/home"
                className="item pl-2 pr-2 hover:border-b-2 border-camelot"
              >
                Jobs
              </Link>
              <p className="hidden md:block"> | </p>
              <Link
                to="/:userId/profile"
                className="item pl-2 pr-2 hover:border-b-2 border-camelot"
              >
                Profile
              </Link>
              <p className="hidden md:block"> | </p>
              <Link
                onClick={() => Auth.logout()}
                className="item pl-2 hover:border-b-2 border-camelot"
              >
                Log Out
              </Link>
            </>
          ) : (
            <Link to="/login" className="item">
              Log In
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
