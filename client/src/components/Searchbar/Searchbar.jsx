import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { QUERY_JOBS } from "../../utils/queries";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTitle as setJobTitle } from "../../utils/jobSlice";

function SearchBar() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [getJobs] = useLazyQuery(QUERY_JOBS);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const titleWithHyphens = title.split(" ").join("-").toLowerCase();
    getJobs({ variables: { title } });
    navigate(`/employees/${titleWithHyphens}`);
    dispatch(setJobTitle(title));
  };

  const handleInputChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center">
        <div className="relative lg:w-1/2 md:w-3/4 sm:w-full 2xs:w-full">
          <input
            type="search"
            id="search-dropdown"
            className="block p-2.5 w-full z-20 rounded-l-lg text-sm text-gray-900 rounded-e-lg 0 border-gray border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            placeholder="What kind of job would you like?"
            required
            value={title}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue_marguerite rounded-e-lg border border-blue_marguerite hover:bg-meteorite focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>
    </form>
  );
}

export default SearchBar;
