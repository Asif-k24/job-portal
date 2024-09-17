
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobsSchema = new Schema({
    jobTitle: { type: String },
    companyName: { type: String },
    minPrice: { type: String },
    maxPrice: { type: String },
    salaryType: { type: String },
    jobLocation: { type: String },
    postingDate: { type: String },
    experienceLevel: { type: String },
    employmentType: { type: String },
    description: { type: String },
    postedBy: { type: String },
    skills: { type: [] },
});

const JobsModel = mongoose.model('Jobs', jobsSchema);
module.exports = JobsModel;