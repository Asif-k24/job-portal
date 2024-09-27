import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import CreateJob from "../Pages/CreateJob";
import MyJobs from "../Pages/MyJobs";
import SalaryPage from "../Pages/SalaryPage";
import UpdateJob from "../Pages/UpdateJob";
import Login from "../components/Login";
import JobDetails from "../Pages/JobDetails";
import { Navigate } from "react-router-dom";
import Signup from "../components/Signup";
// import About from "../pages/About";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <Navigate to="/auth/login" /> },
            { path: "/home", element: <Home /> },
            { path: "/post-job", element: <CreateJob /> },
            { path: "/my-job", element: <MyJobs /> },
            { path: "/salary", element: <SalaryPage /> },
            {
                path: "/edit-job/:id", element: <UpdateJob />,
                loader: ({ params }) => fetch(`http://localhost:3000/all-jobs/${params.id}`)
            },
            { path: "/job/:id", element: <JobDetails /> },
            { path: "/auth/login", element: <Login />},
            { path: "/auth/signup", element: <Signup /> }
        ]
    },
]);

export default router;