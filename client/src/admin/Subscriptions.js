import React from "react";
import GridTable from "./components/GridTable";

function Subscriptions() {
  const columns = [
    { field: "type", headerName: "Name", flex: 1, editable: true },
    { field: "maxJobs", headerName: "Max. Jobs", flex: 1, editable: true },
    {
      field: "maxResumes",
      headerName: "Max. Resumes",
      flex: 1,
      editable: true,
    },
    { field: "maxUsers", headerName: "Max. Users", flex: 1, editable: true },
    {
      field: "applicantFiltering",
      headerName: "Applicant Filtering",
      flex: 1,
      editable: true,
      type: "boolean",
    },
    {
      field: "shortlisting",
      headerName: "Applicant Shortlisting",
      flex: 1,
      editable: true,
      type: "boolean",
    },
    {
      field: "customizedShortlisting",
      headerName: "Customized Shortlisting",
      flex: 1,
      editable: true,
      type: "boolean",
    },
    {
      field: "jobSpecificShortlisting",
      headerName: "Job Specific Shortlisting",
      flex: 1,
      editable: true,
      type: "boolean",
    },
    { field: "price", headerName: "Price(LKR)", flex: 1, editable: true },
  ];

  return <GridTable columns={columns} type="subscriptions" />;
}

export default Subscriptions;
