import React, { useEffect, useState } from "react";
import JobCard from "../../Components/JobList/JobList";
import { fireBaseDataBase } from "../../firebase/fireBaseHandler";
import { onValue, ref } from "firebase/database";
import { Typography } from "@mui/material";
import JobList from "../../Components/JobList/JobList";

function JobPosts(props) {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const databaseRef = ref(fireBaseDataBase, `jobPortal/allPosts`);
    const data = onValue(databaseRef, (snapshot) => {
      const jobsArr = Object.values(snapshot.val());
      setTimeout(() => {
        setJobs(jobsArr);
      }, 1);
    });
  }, []);

  return (
    <div>
      <Typography variant="h3" sx={{ textAlign: "center" }}>
        Available Jobs
      </Typography>
      {jobs.map((job, index) => {
        return (
          <JobList
            job={job}
            key={index}
            handleJobDetails={props.handleJobDetails}
          />
        );
      })}
    </div>
  );
}

export default JobPosts;
