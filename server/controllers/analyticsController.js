const Jobs = require('../models/jobs');
const Employers = require("../models/employers");
const Jobseekers = require("../models/jobseeker");
const Category = require("../models/categories");

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

    const numberOfMonthsNeeded = 8;
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

const getJobCategories = async (req, res) => {
    try{
        var uniqueCategories = await Category.find().select("name -_id");
        var postedJobCats = await Jobs.find().select('category -_id');

        var catCount = [];
        // set count of all the unique categories to 0
        uniqueCategories.map(cat => {
            catCount.push({
                name: cat.name,
                count: 0
            });
        });

        postedJobCats.map(cat => {
            catCount.map(obj => {
                if(obj.name === cat.category){
                    obj.count++;
                }
            });
        });

        catCount.sort((a, b) => {
            return b.count - a.count;
        });

        var catNames = [];
        var count = [];
        for(var i=0; i<5; i++){
            catNames.push(catCount[i].name);
            count.push(catCount[i].count);
        }

        var otherCount = 0;
        for(var i=5; i<catCount.length; i++){
            otherCount = otherCount + catCount[i].count
        }
        catNames.push("other");
        count.push(otherCount);

        res.status(200).json({ success: true, categories: catNames, count: count});
    }catch(err){
        res.status(400).json({ success: false, error: err });
    }
}

const getMonthlyResumes = async (req, res) => {
    var monthNames = [];

    const numberOfMonthsNeeded = 8;
    var monthlyResumeCount;
    var pastNMonths = new Array(numberOfMonthsNeeded);
    var pastNMonthsResumeCount = new Array(numberOfMonthsNeeded);

    for (var i=0; i < numberOfMonthsNeeded; i++) {
        pastNMonthsResumeCount[i] = 0;
    }

    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    if(currentMonthIndex < numberOfMonthsNeeded-1){
        monthlyResumeCount = new Array(24);
        for (var i=0; i < 24; i++) 
            monthlyResumeCount[i] = 0;
        
        monthNames = [...MONTHS, ...MONTHS];
    } else {
        monthlyResumeCount = new Array(12);
        for (var i=0; i < 12; i++) 
            monthlyResumeCount[i] = 0;

        monthNames = [...MONTHS];  
    }

    try{
        const jobs = await Jobs.find().select("applicationDetails -_id");

        var appliedDates = [];
        jobs.map(job => {
            job.applicationDetails.map(item => {
                if(currentMonthIndex < numberOfMonthsNeeded-1){
                    if(item.appliedDate.getFullYear() === currentYear){ 
                        monthlyResumeCount[item.appliedDate.getMonth() + 12]++;
                    } 
    
                    else if(item.appliedDate.getFullYear() + 1 === currentYear){
                        monthlyResumeCount[item.appliedDate.getMonth()]++;
                    }
                } else {
                    if(item.appliedDate.getFullYear() === currentYear){ 
                        monthlyResumeCount[item.appliedDate.getMonth()]++;
                    }
                }
            })
        });

        if(currentMonthIndex < numberOfMonthsNeeded-1){
            const remainingMonths = numberOfMonthsNeeded - (currentMonthIndex + 1);
            pastNMonthsResumeCount = monthlyResumeCount.slice(12-remainingMonths, 12+currentMonthIndex+1);
            pastNMonths = monthNames.slice(12-remainingMonths, 12+currentMonthIndex+1);
        } else {
            pastNMonthsResumeCount = monthlyResumeCount.slice(currentMonthIndex-numberOfMonthsNeeded+1, currentMonthIndex+1);
            pastNMonths = monthNames.slice(currentMonthIndex-numberOfMonthsNeeded+1, currentMonthIndex+1);
        }

        res.status(200).json({ success: true, months: pastNMonths, resumeCount: pastNMonthsResumeCount});
    }catch(err){
        res.status(400).json({ success: false, error: err });

    }
}

const getMonthlySubscriptions = async (req, res) => {
    var monthNames = [];

    const numberOfMonthsNeeded = 6;
    var monthlyBasic;
    var monthlyStandard;
    var monthlyPremium;

    var pastNMonths = new Array(numberOfMonthsNeeded);
    var pastNMonthsBasic = new Array(numberOfMonthsNeeded);
    var pastNMonthsStandard = new Array(numberOfMonthsNeeded);
    var pastNMonthsPremium = new Array(numberOfMonthsNeeded);

    for (var i=0; i < numberOfMonthsNeeded; i++) { 
        pastNMonthsBasic[i] = 0;
        pastNMonthsStandard[i] = 0;
        pastNMonthsPremium[i] = 0;
    }

    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    if(currentMonthIndex < numberOfMonthsNeeded-1){
        monthlyBasic = new Array(24);
        monthlyStandard = new Array(24);
        monthlyPremium = new Array(24);

        for (var i=0; i < 24; i++) {
            monthlyBasic[i] = 0;
            monthlyStandard[i] = 0;
            monthlyPremium[i] = 0;
        }
        monthNames = [...MONTHS, ...MONTHS];
    } else {
        monthlyBasic = new Array(12);
        monthlyStandard = new Array(12);
        monthlyPremium = new Array(12);

        for (var i=0; i < 12; i++) {
            monthlyBasic[i] = 0;
            monthlyStandard[i] = 0;
            monthlyPremium[i] = 0;
        }
        monthNames = [...MONTHS];
    }
    
    var employers;
    try{
        employers = await Employers.find().select("subscription -_id");
        
        employers.map(emp => {
            if(currentMonthIndex < numberOfMonthsNeeded-1){
                if(emp.subscription.startDate.getFullYear() === currentYear){ 
                    if(emp.subscription.type == "Basic"){
                        monthlyBasic[emp.subscription.startDate.getMonth() + 12]++;
                    }
                    if(emp.subscription.type === "Standard"){
                        monthlyStandard[emp.subscription.startDate.getMonth() + 12]++;
                    }
                    if(emp.subscription.type === "Premium"){
                        monthlyPremium[emp.subscription.startDate.getMonth() + 12]++;
                    }
                } 

                else if(emp.subscription.startDate.getFullYear() + 1 === currentYear){
                    if(emp.subscription.type == "Basic"){
                        monthlyBasic[emp.subscription.startDate.getMonth()]++;
                    }
                    if(emp.subscription.type === "Standard"){
                        monthlyStandard[emp.subscription.startDate.getMonth()]++;
                    }
                    if(emp.subscription.type === "Premium"){
                        monthlyPremium[emp.subscription.startDate.getMonth()]++;
                    }
                }
            } else {
                if(emp.subscription.startDate.getFullYear() === currentYear){ 
                    if(emp.subscription.type == "Basic"){
                        monthlyBasic[emp.subscription.startDate.getMonth()]++;
                    }
                    if(emp.subscription.type === "Standard"){
                        monthlyStandard[emp.subscription.startDate.getMonth()]++;
                    }
                    if(emp.subscription.type === "Premium"){
                        monthlyPremium[emp.subscription.startDate.getMonth()]++;
                    }
                }
            }
        });

        if(currentMonthIndex < numberOfMonthsNeeded-1){
            const remainingMonths = numberOfMonthsNeeded - (currentMonthIndex + 1);
            pastNMonthsBasic = monthlyBasic.slice(12-remainingMonths, 12+currentMonthIndex+1);
            pastNMonthsStandard = monthlyStandard.slice(12-remainingMonths, 12+currentMonthIndex+1);
            pastNMonthsPremium = monthlyPremium.slice(12-remainingMonths, 12+currentMonthIndex+1);
            pastNMonths = monthNames.slice(12-remainingMonths, 12+currentMonthIndex+1);
        } else {
            pastNMonthsBasic = monthlyBasic.slice(currentMonthIndex-numberOfMonthsNeeded+1, currentMonthIndex+1);
            pastNMonthsStandard = monthlyStandard.slice(currentMonthIndex-numberOfMonthsNeeded+1, currentMonthIndex+1);
            pastNMonthsPremium = monthlyPremium.slice(currentMonthIndex-numberOfMonthsNeeded+1, currentMonthIndex+1);
            pastNMonths = monthNames.slice(currentMonthIndex-numberOfMonthsNeeded+1, currentMonthIndex+1);
        }

        res.status(200).json({ 
            success: true, 
            months: pastNMonths, 
            basic: pastNMonthsBasic, 
            standard: pastNMonthsStandard, 
            premium: pastNMonthsPremium
        }); 
        // res.status(200).json({ success: true, months: monthNames, monthlyBasic: monthlyBasic}); 
        // res.status(200).json({ success: true }); 
    }catch(err){
        res.status(400).json({ success: false, error: err });
    }
}

const getNewUsers = async (req, res) => {
    
    try{
        const currentDate = new Date();
        const currentMonthIndex = currentDate.getMonth();

        const jobseekers = await Jobseekers.find().select("dateRegistered");
        const employers = await Employers.find().select("dateRegistered");

        var newJobseekers = 0; // new jobseekers
        var newEmployers = 0; // new employers
        var allNewUsers = 0; // new employers and jobseekers
        jobseekers.map(user => {
            if(user.dateRegistered.getMonth() === currentMonthIndex){
                allNewUsers++;
                if(req.params.userRole === "jobseeker"){
                    newJobseekers++;
                }
            }
        });

        employers.map(user => {
            if(user.dateRegistered.getMonth() === currentMonthIndex){
                allNewUsers++;
                if(req.params.userRole === "employer"){
                    newEmployers++;
                }
            }
        });

        if(req.params.userRole === "jobseeker"){
            var percentage = Math.ceil(newJobseekers/allNewUsers * 100);
            res.status(200).json({ success: true, newJobseekers: newJobseekers, percentage: percentage});
        }
        if(req.params.userRole === "employer"){
            var percentage = Math.ceil(newEmployers/allNewUsers * 100);
            res.status(200).json({ success: true, newEmployers: newEmployers, percentage: percentage});
        }


    }catch(err){
        res.status(400).json({ success: false, error: err });
    }
        
}


module.exports = {
    getMonthlyJobs,
    getMonthlyUsers,
    getJobCategories,
    getMonthlyResumes,
    getMonthlySubscriptions,
    getNewUsers,
}