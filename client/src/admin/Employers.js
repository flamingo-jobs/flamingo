import React from 'react'
import GridTable from './components/GridTable'

function Employers() {

    const employerColumns = [{ field: 'name', headerName: 'Name', width: 150, editable: false },
    { field: 'email', headerName: 'Email', width: 150, editable: false },
    {
        field: 'dateRegistered', headerName: 'Registered Date', width: 200, editable: false, valueFormatter: (params) => {
            const valueFormatted = params.value.toString();
            return `${valueFormatted}`;
        },
    },
    { field: 'locations', headerName: 'Locations', width: 250, editable: false },
    { field: 'subscription', headerName: 'Subscription', width: 170, editable: false },
    {
        field: 'reviews', headerName: 'Ratings', width: 150, editable: false, valueFormatter: (params) => {
            var valueFormatted = 0;
            if (params.value) {
                valueFormatted = params.value.map(item => item.rating).reduce((a, x) => a + x, 0) / params.value.length;
            }
            
            return `${valueFormatted}`;
        },
    },
    { field: 'categories', headerName: 'Categories', width: 200, editable: false },
    { field: 'isFeatured', headerName: 'Is Featured', width: 170, editable: true },


    ];

    return (

        <GridTable columns={employerColumns} type="employers" label="Employer" addable={false} />

    );
}

export default Employers
