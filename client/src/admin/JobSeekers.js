import React from 'react'
import GridTable from './components/GridTable'

function Users() {

    const jobSeekerColumns = [{ field: 'name', headerName: 'Name', flex: 1, editable: false },
    { field: 'email', headerName: 'Email', flex: 1, editable: false },
    { field: 'mobile', headerName: 'Mobile No.', flex: 1, editable: false },
    { field: 'email', headerName: 'Email', flex: 1, editable: false }];

    return (

        <GridTable columns={jobSeekerColumns} type="jobseekers" addable={false}/>

    );
}

export default Users
