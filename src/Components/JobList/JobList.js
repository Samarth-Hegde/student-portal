import Typography from "@mui/material/Typography";

import React, { useEffect, useState } from "react";
import "./jobList.css";
import { Button } from "@mui/material";
import {
  fireBaseDataBase,
  fireBaseAuthentication,
} from "../../firebase/fireBaseHandler";
import { ref, onValue } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function JobList(props) {
  const nav = useNavigate();
  const handleClick = () => {
    props.handleJobDetails(props.job);
    nav("/jobApply");
  };

  return (
    <div className="JobList__container">
      <div className="jobList__card">
        <Typography sx={{ color: "grey" }} variant="h3">
          {props.job.companyName}
        </Typography>
        <Typography>
          <span className="jobCard__label">Post: </span> {props.job.post}
        </Typography>
        <Typography>
          <span className="jobCard__label">Package: </span>
          {props.job.package}
        </Typography>
        <Typography>
          <span className="jobCard__label">Location: </span>
          {props.job.location}
        </Typography>
        <Button
          sx={{ margin: "15px" }}
          variant="contained"
          onClick={handleClick}
        >
          View
        </Button>
      </div>
    </div>
  );
}

export default JobList;
