import { Button, TextField, Typography } from "@mui/material";
import "./userDetails.css";
import React, { useState, useEffect } from "react";
import {
  fireBaseDataBase,
  fireBaseAuthentication,
} from "../../firebase/fireBaseHandler";
import { ref, set } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { DataObjectSharp } from "@mui/icons-material";

function UserDetails(props) {
  const [uid, setUid] = useState();
  const [userDetails, setUSerDetails] = useState({
    email: props.email,
  });
  const nav = useNavigate();

  useEffect(() => {
    onAuthStateChanged(fireBaseAuthentication, (user) => {
      if (user) {
        setUid(user.uid);
      }
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUSerDetails({ ...userDetails, [name]: value });
  };

  const handleClick = async () => {
    const dataBaseRef = ref(
      fireBaseDataBase,
      `jobPortal/students/studentDetails/${uid}`
    );
    if (Object.values(userDetails).length < 7) {
      alert("All fields are compulsory");
    } else {
      alert("Successfully uploaded");
      await set(dataBaseRef, userDetails);
      nav("/jobPosts");
    }
  };
  return (
    <div className="userDetails__container">
      <Typography sx={{ marginBottom: 2 }}>
        Please Fill All The Details To Continue
      </Typography>
      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        sx={{ marginBottom: 2, width: 300 }}
        name="Name"
        onChange={handleChange}
      />
      <TextField
        id="outlined-basic"
        label="College"
        variant="outlined"
        sx={{ marginBottom: 2, width: 300 }}
        name="college"
        onChange={handleChange}
      />
      <TextField
        id="outlined-basic"
        label="Department"
        variant="outlined"
        sx={{ marginBottom: 2, width: 300 }}
        name="department"
        onChange={handleChange}
      />
      <TextField
        id="outlined-basic"
        label="10th %"
        variant="outlined"
        sx={{ marginBottom: 2, width: 300 }}
        name="10thperc"
        type="number"
        onChange={handleChange}
      />
      <TextField
        id="outlined-basic"
        label="12th %"
        variant="outlined"
        sx={{ marginBottom: 2, width: 300 }}
        name="12thperc"
        type="number"
        onChange={handleChange}
      />
      <TextField
        id="outlined-basic"
        label="Semester"
        variant="outlined"
        sx={{ marginBottom: 2, width: 300 }}
        name="semester"
        type="number"
        onChange={handleChange}
      />
      <TextField
        id="outlined-basic"
        label="Current CGPA"
        variant="outlined"
        sx={{ marginBottom: 2, width: 300 }}
        name="currentCGPA"
        type="number"
        onChange={handleChange}
      />
      <Button variant="contained" onClick={handleClick}>
        Submit
      </Button>
    </div>
  );
}

export default UserDetails;
