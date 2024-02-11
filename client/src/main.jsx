import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Error from "./layouts/Error.jsx";
import Home from "./layouts/Home.jsx"
import Login from "./layouts/Login.jsx";
import Signup from "./layouts/Signup.jsx";
import Profile from "./layouts/Profile.jsx";
import JobListing from "./layouts/JobListing.jsx";
import JobBoard from "./layouts/JobBoard.jsx";
import UserBoard from "./layouts/UserBoard.jsx";
import SearchedJobs from "./layouts/SearchedJobs.jsx";
import PostJob from "./layouts/PostJob.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/:userId/profile",
        element: <Profile />,
      },
      {
        path: "/employees/:employerId/:id",
        element: <JobListing />,
      },
      {
        path: "/employees/home",
        element: <JobBoard />,
      },
      {
        path: "/employers/home",
        element: <UserBoard />,
      },
      {
        path: "/employers/job-form",
        element: <PostJob />,
      },
      {
        path: "/employees/:jobId",
        element: <SearchedJobs />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
