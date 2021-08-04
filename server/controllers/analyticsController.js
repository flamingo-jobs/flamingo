const Jobs = require('../models/jobs');



const getMonthlyJobs = async (req, res) => {
    var monthNames = [
    "January", "February", "March", "April", 
    "May", "June", "July", "August", 
    "September", "October", "November", "December"];

    const numberOfMonthsNeeded = 8;
    var monthlyJobCount;
    var pastNMonths = new Array(numberOfMonthsNeeded);
    var pastNMonthsJobCount = new Array(numberOfMonthsNeeded);
    for (var i=0; i < 24; i++) { // Set all elements to 0
        pastNMonthsJobCount[i] = 0;
    }

    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    if(currentMonthIndex < numberOfMonthsNeeded-1){
        monthlyJobCount = new Array(24);
        for (var i=0; i < 24; i++) { // Set all elements to 0
            monthlyJobCount[i] = 0;
        }
        // Double the month names because we need past year as well
        monthNames = [...monthNames, ...monthNames];
        // for(var i=0; i < 24; i++){
        //     monthlyJobCount[i] = Math.ceil(Math.random() * 100);
        // }
    } else {
        monthlyJobCount = new Array(12);
        for (var i=0; i < 12; i++) { // Set all elements to 0
            monthlyJobCount[i] = 0;
        }
    }

    try{
        const jobs = await Jobs.find();

        jobs.map(job => {
            if(currentMonthIndex < numberOfMonthsNeeded-1){
                // Jobs in current year
                if(job.postedDate.getFullYear() === currentYear){ 
                    monthlyJobCount[job.postedDate.getMonth() + 12]++;
                } 
                // Jobs in previous year
                else if(job.postedDate.getFullYear() + 1 === currentYear){
                    monthlyJobCount[job.postedDate.getMonth()]++;
                }
            } else {
                if(job.postedDate.getFullYear() === currentYear){ 
                    monthlyJobCount[job.postedDate.getMonth()]++;
                }
            }
        });

        if(currentMonthIndex < numberOfMonthsNeeded-1){
            const remainingMonths = numberOfMonthsNeeded - (currentMonthIndex + 1);
            pastNMonthsJobCount = monthlyJobCount.slice(12-remainingMonths, 12+currentMonthIndex+1);
            pastNMonths = monthNames.slice(12-remainingMonths, 12+currentMonthIndex+1);
        } else {
            pastNMonthsJobCount = monthlyJobCount.slice(currentMonthIndex-numberOfMonthsNeeded+1, currentMonthIndex+1);
            pastNMonths = monthNames.slice(currentMonthIndex-numberOfMonthsNeeded+1, currentMonthIndex+1);
        }
        res.status(200).json({ success: true, months: pastNMonths, jobCount: pastNMonthsJobCount});
    }catch(err){
        res.status(400).json({ success: false, error: err });
    }
    
}






module.exports = {
    getMonthlyJobs,
}