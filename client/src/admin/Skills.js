import React from 'react'
import GridTable from './components/GridTable';

function Skills() {
    
    const categoryColumns = [{ field: 'name', headerName: 'Name', flex: 1, editable: true }];

    return (
        <GridTable columns={categoryColumns} type="skills" />
    )
}

export default Skills
