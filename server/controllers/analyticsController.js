const Jobs = require('../models/jobs');
const Employers = require("../models/employers");
const Jobseekers = require("../models/jobseeker");

const MONTHS = [
"January", "February", "March", "April", 
"May", "June", "July", "August", 
"September", "October", "November", "December"];

const getMonthlyJobs = async (req, res) => {
    var monthNames = [];

    const numberOfMonthsNeeded = 8;
    var monthlyJobCount;
    var pastNMonths = new Array(numberOfMonthsNeeded);
    var pastNMonthsJobCount = new Array(numberOfMonthsNeeded);

    for (var i=0; i < numberOfMonthsNeeded; i++) { // Set all elements to 0
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
        monthNames = [...MONTHS, ...MONTHS];
        // for(var i=0; i < 24; i++){
        //     monthlyJobCount[i] = Math.ceil(Math.random() * 100);
        // }
    } else {
        monthNames = [...MONTHS];
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

const getMonthlyUsers = async (req, res) => {
    var monthNames = [];

    const numberOfMonthsNeeded = 12;
    var monthlyUserCount;
    var pastNMonths = new Array(numberOfMonthsNeeded);
    var pastNMonthsUserCount = new Array(numberOfMonthsNeeded);

    for (var i=0; i < numberOfMonthsNeeded; i++) {
        pastNMonthsUserCount[i] = 0;
    }

    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    if(currentMonthIndex < numberOfMonthsNeeded-1){
        monthlyUserCount = new Array(24);
        for (var i=0; i < 24; i++) 
            monthlyUserCount[i] = 0;
        
        monthNames = [...MONTHS, ...MONTHS];
    } else {
        monthlyUserCount = new Array(12);
        for (var i=0; i < 12; i++) 
            monthlyUserCount[i] = 0;

        monthNames = [...MONTHS];  
    }
    
    try{
        var users = [];
        if(req.params.userRole === "jobseeker"){
            users = await Jobseekers.find();
        }
        else if(req.params.userRole === "employer"){
            users = await Employers.find();
        }

        users.map(user => {
            if(currentMonthIndex < numberOfMonthsNeeded-1){
                if(user.dateRegistered.getFullYear() === currentYear){ 
                    monthlyUserCount[user.dateRegistered.getMonth() + 12]++;
                } 

                else if(user.dateRegistered.getFullYear() + 1 === currentYear){
                    monthlyUserCount[user.dateRegistered.getMonth()]++;
                }
            } else {
                if(user.dateRegistered.getFullYear() === currentYear){ 
                    monthlyUserCount[user.dateRegistered.getMonth()]++;
                }
            }
        });

        if(currentMonthIndex < numberOfMonthsNeeded-1){
            const remainingMonths = numberOfMonthsNeeded - (currentMonthIndex + 1);
            pastNMonthsUserCount = monthlyUserCount.slice(12-remainingMonths, 12+currentMonthIndex+1);
            pastNMonths = monthNames.slice(12-remainingMonths, 12+currentMonthIndex+1);
        } else {
            pastNMonthsUserCount = monthlyUserCount.slice(currentMonthIndex-numberOfMonthsNeeded+1, currentMonthIndex+1);
            pastNMonths = monthNames.slice(currentMonthIndex-numberOfMonthsNeeded+1, currentMonthIndex+1);
        }
        res.status(200).json({ success: true, months: pastNMonths, userCount: pastNMonthsUserCount});
    }catch(err){
        res.status(400).json({ success: false, error: err });
    }

}

module.exports = {
    getMonthlyJobs,
    getMonthlyUsers,
}