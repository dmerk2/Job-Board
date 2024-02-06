import "./Header.css";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import Logo from "../../assets/Hop_On_Board_Logo.png";

const Header = () => {
  return (
    <header className="ui pointing menu header">
      <img src= { Logo } alt="Hop On Board Logo" className="item text-3xl" width="75"></img>
      <Link to="/" className="item text-3xl ">
        Hop On Board
      </Link>
      <nav className="right menu flex text-camelot text-xl">
        {Auth.loggedIn() ? (
          <>
           <Link to="/employers/home" className="item pr-2 hover:border-b-2 border-camelot"> 
            Applicants
            </Link>
            <p> | </p>
            <Link to="/employees/home" className="item pl-2 pr-2 hover:border-b-2 border-camelot"> 
            Jobs
            </Link>
            <p> | </p>
            <Link onClick={() => Auth.logout()} className="item pl-2 hover:border-b-2 border-camelot">
              Log Out
            </Link>

          </>
        ) : (
          <Link to="/login" className="item">
            Log In
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
