const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//import routes
const userRoutes = require('./routes/users');
const jobRoutes = require('./routes/jobs');
const categoryRoutes = require('./routes/categories');
const typeRoutes = require('./routes/types');
const employerRoutes = require('./routes/employers');
const jobSeekerRoutes = require('./routes/jobseeker');

// app middleware
app.use(bodyParser.json());
app.use(cors());

// route middleware
app.use(userRoutes);
app.use(jobRoutes);
app.use(categoryRoutes);
app.use(typeRoutes);
app.use(employerRoutes);
app.use(jobSeekerRoutes);

const PORT = 8000;

const DB_URL = 'mongodb+srv://flam_root:flamingoroot123@flamingocluster1.wlgjg.mongodb.net/flamingoDb?retryWrites=true&w=majority';

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB connected");
}).catch((err) => {
    console.log("Error in DB connection", err);
})

app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
});