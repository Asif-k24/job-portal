// App.jsx
import "./App.css";
import { Home } from "./Pages/Home";
import { MyJobs } from "./Pages/MyJobs";
import { Login } from "./components/Login";
import { Navbar } from "./components/Navbar";
import { Signup } from "./components/Signup";
import { UpdateJob } from "./Pages/UpdateJob";
import { CreateJob } from "./Pages/CreateJob";
import { JobDetails } from "./Pages/JobDetails";
import { SalaryPage } from "./Pages/SalaryPage";
import { AnimatePresence } from "framer-motion";
import { Routes, Route } from "react-router-dom";
import { PageWrapper } from "./components/PageWrapper";
import { Navigate, useLocation } from "react-router-dom";
import { ProtectedRoutes } from "./components/ProtectedRoutes";

const App = () => {
  const location = useLocation();

  return (
    <div>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route
            path="/auth/signup"
            element={
              <PageWrapper>
                <Signup />
              </PageWrapper>
            }
          />
          <Route
            path="/auth/login"
            element={
              <PageWrapper>
                <Login />
              </PageWrapper>
            }
          />
          <Route
            path="/home"
            element={
              <PageWrapper>
                <Home />
              </PageWrapper>
            }
          />
          <Route element={<ProtectedRoutes />}>
            <Route
              path="/post-job"
              element={
                <PageWrapper>
                  <CreateJob />
                </PageWrapper>
              }
            />
            <Route
              path="/my-job"
              element={
                <PageWrapper>
                  <MyJobs />
                </PageWrapper>
              }
            />
            <Route
              path="/salary"
              element={
                <PageWrapper>
                  <SalaryPage />
                </PageWrapper>
              }
            />
            <Route
              path="/edit-job/:id"
              element={
                <PageWrapper>
                  <UpdateJob />
                </PageWrapper>
              }
            />
            <Route
              path="/job/:id"
              element={
                <PageWrapper>
                  <JobDetails />
                </PageWrapper>
              }
            />
          </Route>
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default App;
