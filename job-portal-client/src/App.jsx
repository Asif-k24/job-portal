import "./App.css";
import { Home } from "./Pages/Home";
import { MyJobs } from "./Pages/MyJobs";
import { Login } from "./components/Login";
import { Navigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Signup } from "./components/Signup";
import { UpdateJob } from "./Pages/UpdateJob";
import { CreateJob } from "./Pages/CreateJob";
import { JobDetails } from "./Pages/JobDetails";
import { SalaryPage } from "./Pages/SalaryPage";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoutes } from "./components/ProtectedRoutes";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/post-job" element={<CreateJob />} />
          <Route path="/my-job" element={<MyJobs />} />
          <Route path="/salary" element={<SalaryPage />} />
          <Route
            path="/edit-job/:id"
            element={<UpdateJob />}
            loader={({ params }) =>
              fetch(`http://localhost:3000/all-jobs/${params.id}`)
            }
          />
          <Route path="/job/:id" element={<JobDetails />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
