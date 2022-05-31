import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/signup/signup";
import "./App.css";
import { useState } from "react";
import UserDetails from "./pages/userDetails/userDetails";
import JobPosts from "./pages/jobPosts/jobPosts";
import JobApply from "./pages/jobApply/jobApply";

function App() {
  const [email, setEmail] = useState("");
  const [jobDetails, setJobDetail] = useState({});
  const handleEmail = (email) => {
    setEmail(email);
  };

  const handleJobDetails = (details) => {
    setJobDetail(details);
    console.log(jobDetails);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp handleEmail={handleEmail} />}></Route>
        <Route
          path="/userDetails"
          element={<UserDetails email={email} />}
        ></Route>
        <Route
          path="/jobPosts"
          element={<JobPosts handleJobDetails={handleJobDetails} />}
        ></Route>
        <Route
          path="/jobApply"
          element={<JobApply jobDetails={jobDetails} />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
