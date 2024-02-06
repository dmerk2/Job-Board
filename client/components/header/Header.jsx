import "./Header.css";

const Header = () => {
  return (
    <header>
        <img src="https://www.flaticon.com/svg/vstatic/svg/3135/3135715.svg?token=exp=1619780003~hmac=3f3e3e3" />
        <h1 className="siteName">Job Board</h1>
        <div className="navLinks">
            <a href="/employees/home" className="siteLink">Jobs</a>
            <div className="dividers">|</div>
            <a href="/login" className="siteLink">Login</a>
        </div>
    </header>
  );
};

export default Header;
