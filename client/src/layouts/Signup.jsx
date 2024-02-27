import { useMutation } from "@apollo/client";
import { SIGNUP } from "../utils/mutations";
import auth from "../utils/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import ErrorModal from "../components/Modals/ErrorModal";

function Signup() {
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });
  const [signup] = useMutation(SIGNUP);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formState.password.length !== 6) {
        setIsErrorModalOpen(true);
        return;
      }
      const signupMutation = await signup({
        variables: {
          username: formState.username,
          email: formState.email,
          password: formState.password,
          role: formState.role,
        },
      });
      const token = signupMutation.data.addUser.token;
      auth.login(token);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {isErrorModalOpen && (
        <ErrorModal
          setIsErrorModalOpen={setIsErrorModalOpen}
          message={"Password must be 6 characters long"}
        />
      )}
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign up for an account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleFormSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="username"
                autoComplete="username"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                onChange={handleChange}
              />
            </div>
            <div className="py-2">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
            <div className="text-center py-2">
              <input
                type="radio"
                name="role"
                id="employee"
                value="employee"
                checked={formState.role === "employee"}
                onChange={handleChange}
              />
              <label htmlFor="employee" style={{ marginRight: "2rem" }}>
                Employee
              </label>
              <input
                type="radio"
                name="role"
                id="employer"
                value="employer"
                checked={formState.role === "employer"}
                onChange={handleChange}
              />
              <label htmlFor="employer">Employer</label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="flex items-center justify-center">
          <h3 style={{ marginRight: "1.2rem" }}>Already have an account?</h3>
          <Link to="/login" style={{ color: "blue" }}>
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
