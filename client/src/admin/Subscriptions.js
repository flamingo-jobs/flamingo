import React from "react";
import GridTable from "./components/GridTable";

function Subscriptions() {
  const columns = [
    { field: "type", headerName: "Name", width: 150, editable: true },
    {
      field: "description",
      headerName: "Description",
      width: 300,
      editable: true,
    },
    { field: "maxJobs", headerName: "Max. Jobs", width: 150, editable: true },
    {
      field: "maxResumes",
      headerName: "Max. Resumes",
      width: 150,
      editable: true,
    },
    { field: "maxUsers", headerName: "Max. Users", width: 150, editable: true },
    {
      field: "applicantFiltering",
      headerName: "Applicant Filtering",
      width: 150,
      editable: true,
      type: "boolean",
    },
    {
      field: "shortlisting",
      headerName: "Applicant Shortlisting",
      width: 150,
      editable: true,
      type: "boolean",
    },
    {
      field: "customizedShortlisting",
      headerName: "Customized Shortlisting",
      width: 150,
      editable: true,
      type: "boolean",
    },
    {
      field: "jobSpecificShortlisting",
      headerName: "Job Specific Shortlisting",
      width: 150,
      editable: true,
      type: "boolean",
    },
    { field: "price", headerName: "Price (LKR)", width: 150, editable: true },
  ];

  return <GridTable columns={columns} type="subscriptions" />;
}

export default Subscriptions;
