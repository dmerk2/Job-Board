import "./Footer.css";
import Logo from "../../assets/Hop_On_Board_Logo.png";

function Footer() {
  return (
    <footer>
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
            <a href="#" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                <img src= { Logo } className="h-8" alt="Hop On Board Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Hop On Board</span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <a href="https://github.com/dmerk2/Job-Board" className="hover:underline me-4 md:me-6">Git Hub</a>
                </li>
                <li>
                    <a href="https://www.linkedin.com/in/dmerk2/" className="hover:underline  me-4 md:me-6">Dan's LinkedIn</a>
                </li>
                <li>
                    <a href="https://www.linkedin.com/in/jesse-locascio-6778a02a0/" className="hover:underline ">Jesse's LinkedIn</a>
                </li>
            </ul>
        </div>
        <hr className="my-6 sm:mx-auto border-blue_marguerite lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 Hop On Board. All Rights Reserved.</span>
    </div>
</footer>

  )
}

export default Footer;
