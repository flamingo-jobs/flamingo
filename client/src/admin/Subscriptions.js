import React from 'react'
import GridTable from './components/GridTable';

function Subscriptions() {
    
    const columns = [{ field: 'type', headerName: 'Name', flex: 1, editable: true },
    { field: 'maxJobs', headerName: 'Max. Jobs', flex: 1, editable: true },
    { field: 'maxResumes', headerName: 'Max. Resumes', flex: 1, editable: true },
    { field: 'maxUsers', headerName: 'Max. Users', flex: 1, editable: true },
    { field: 'shortlisting', headerName: 'Applicant Shortlisting', flex: 1, editable: true , type: 'boolean'},
    { field: 'customizedShortlisting', headerName: 'Customized Shortlisting', flex: 1, editable: true, type: 'boolean' },
    { field: 'applicantFiltering', headerName: 'Applicant Filtering', flex: 1, editable: true, type: 'boolean' }];
    
    return (
        <GridTable columns={columns} type="subscriptions" />
    )
}

export default Subscriptions
