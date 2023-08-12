const { Job } = require("../model/job.model");
const userServices = require("../services/user.services");
const { MESSAGES } = require("../common/constants.common");
const {
  errorMessage,
  successMessage,
  unAuthMessage,
} = require("../common/messages.common");
const jobServices = require("../services/job.services");

class JobController {
  async getStatus(req, res) {
    res.status(200).send({ message: MESSAGES.DEFAULT, success: true });
  }
  //Create a new job

  async createJob(req, res) {
    const { freelancerId, companyId, jobStatus, price, jobTitle, duration } =
      req.body;

    const company = await userServices.getCompanyById(companyId);
    const freelancer = await userServices.getFreelancerById(freelancerId);

    if (!company) res.status(404).send(errorMessage("company"));
    if (!freelancer) res.status(404).send(errorMessage("freelancer"));

    // makes sure the authenticated user is the same person as the user passed in the body of request
    let job = new Job({
      freelancerId,
      companyId,
      jobStatus,
      price,
      jobTitle,
      duration,
    });

    await jobServices.createJob(job);

    // Sends the created job as response
    res.send(successMessage(MESSAGES.CREATED, job));
  }

  //get all jobs in the job collection/table
  async fetchAllJobs(req, res) {
    const jobs = await jobServices.getAllJobs();

    res.send(successMessage(MESSAGES.FETCHED, jobs));
  }

  //get job from the database, using their email
  async getJobById(req, res) {
    const job = await jobServices.getJobById(req.params.id);

    if (job) {
      res.send(successMessage(MESSAGES.FETCHED, job));
    } else {
      res.status(404).send(errorMessage("job"));
    }
  }

  async getJobsByCompanyId(req, res) {
    const job = await jobServices.getJobsByCompanyId(req.params.id);

    if (job) {
      res.send(successMessage(MESSAGES.FETCHED, job));
    } else {
      res.status(404).send(errorMessage("job", "post"));
    }
  }

  //Update/edit job data
  async updateJob(req, res) {
    let job = await jobServices.getJobById(req.params.id);

    if (!job) return res.status(404).send(errorMessage("job"));

    job = await jobServices.updateJobById(req.params.id, req.body);

    res.send(successMessage(MESSAGES.UPDATED, job));
  }

  //Delete job account entirely from the database
  async deleteJob(req, res) {
    let job = await jobServices.getJobById(req.params.id);

    if (!job) return res.status(404).send(errorMessage("job"));

    await jobServices.deleteJob(req.params.id);

    res.send(successMessage(MESSAGES.DELETED, job));
  }
}

module.exports = new JobController();
