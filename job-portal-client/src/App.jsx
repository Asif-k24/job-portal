import ProtectedRoutes from "./components/ProtectedRoutes";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import SalaryPage from "./Pages/SalaryPage";
import JobDetails from "./Pages/JobDetails";
import UpdateJob from "./Pages/UpdateJob";
import CreateJob from "./Pages/CreateJob";
import Signup from "./components/Signup";
import Navbar from './components/Navbar';
import Login from "./components/Login";
import MyJobs from "./Pages/MyJobs";
import Home from "./Pages/Home";
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Navigate to='/auth/login' /> && <Login />} />
        <Route path='/auth/signup' element={<Signup />} />
        <Route element={<ProtectedRoutes />}>
          <Route path='/home' element={<Home />} />
          <Route path='/post-job' element={<CreateJob />} />
          <Route path='/my-job' element={<MyJobs />} />
          <Route path='/salary' element={<SalaryPage />} />
          <Route path='/edit-job/:id' element={<UpdateJob />} loader={({ params }) => fetch(`http://localhost:3000/all-jobs/${params.id}`)} />
          <Route path='/job/:id' element={<JobDetails />} />
          <Route path='/auth/login' element={<Login />} />
        </Route>
      </Routes>
    </>
  )
}

export default App