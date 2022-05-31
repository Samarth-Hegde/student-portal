import { Button, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import {
  fireBaseDataBase,
  fireBaseAuthentication,
} from "../../firebase/fireBaseHandler";
import { ref, onValue } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import "./jobApply.css";

function JobApply(props) {
  const [uid, setUid] = useState("");
  const [studentDetails, setStudentDetails] = useState([]);
  const handleClick = () => {
    const databaseRef = ref(
      fireBaseDataBase,
      `jobPortal/students/studentDetails/${uid}`
    );

    onValue(databaseRef, (snapshot) => {
      setStudentDetails(Object.values(snapshot.val()));
      if (studentDetails.length > 0)
        setTimeout(() => {
          if (
            parseFloat(studentDetails[0]) <
              parseFloat(props.jobDetails.cutoff10th) &&
            parseFloat(studentDetails[0]) <
              parseFloat(props.jobDetails.cutoff12th) &&
            parseFloat(studentDetails[4]) <
              parseFloat(props.jobDetails.currentCgpaCutoff)
          ) {
            alert("Not Eligible");
          } else {
            alert("Successfully applied");
          }
        }, 1);
    });
  };
  useEffect(() => {
    onAuthStateChanged(fireBaseAuthentication, (user) => {
      if (user) {
        setUid(user.uid);
        console.log(uid);
      }
    });
  }, []);
  return (
    <div className="jobApply__container">
      <div className="jobApply__card">
        <Typography
          sx={{ textAlign: "center", marginBottom: "20px" }}
          variant="h3"
        >
          {props.jobDetails.companyName}
        </Typography>
        <Typography>
          <Typography
            sx={{ margin: "25px 25px", display: "inline" }}
            variant="h5"
          >
            Post:
          </Typography>
          {props.jobDetails.post}
        </Typography>
        <Typography>
          <Typography
            sx={{ margin: "25px 25px", display: "inline" }}
            variant="h5"
          >
            Package:
          </Typography>
          {props.jobDetails.package}
        </Typography>
        <Typography>
          <Typography
            sx={{ margin: "25px 25px", display: "inline" }}
            variant="h5"
          >
            Location:
          </Typography>
          {props.jobDetails.location}
        </Typography>
        <Typography>
          <Typography
            sx={{ margin: "25px 25px", display: "inline" }}
            variant="h5"
          >
            Current CGPA CutOff:
          </Typography>
          {props.jobDetails.currentCgpaCutoff}
        </Typography>
        <Typography>
          <Typography
            sx={{ margin: "100px 25px", display: "inline" }}
            variant="h5"
          >
            10th CutOff:
          </Typography>
          {props.jobDetails.cutoff10th}
        </Typography>
        <Typography>
          <Typography
            sx={{ margin: "25px 25px", display: "inline" }}
            variant="h5"
          >
            12th cutOff:
          </Typography>
          {props.jobDetails.cutoff12th}
        </Typography>
        <Typography>
          <Typography
            sx={{ margin: "25px 25px", display: "inline" }}
            variant="h5"
          >
            CutOff sem:
          </Typography>
          {props.jobDetails.cutoffSem}
        </Typography>
        <Button
          sx={{ margin: "25px" }}
          variant="contained"
          onClick={handleClick}
        >
          Apply
        </Button>
      </div>
    </div>
  );
}

export default JobApply;
