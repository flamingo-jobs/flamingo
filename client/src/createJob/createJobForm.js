import React, { useState, useEffect } from "react";
import { Grid, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

// Custom components
import FloatCard from "../components/FloatCard";

const CreateJobForm = () => {
    return ( <FloatCard>Job Create</FloatCard> );
}
 
export default CreateJobForm;
