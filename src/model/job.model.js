const mongoose = require("mongoose");
const Joi = require("joi");

const jobSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  freelancerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  price: {
    type: Number,
    min: 1,
    max: 3000,
    required: true,
  },
  jobTitle: {
    type: String,
    minlength: 5,
    maxlength: 1024,
    required: true,
  },
  duration: {
    type: Number,
    min: 1,
    max: 365,
    required: true,
  },
  jobStatus: {
    type: String,
    enum: ["open", "inProgress", "closed"],
    required: "true",
  },
});

const Job = mongoose.model("Job", userSchema);

function validate(user) {
  const schema = Joi.object({
    freelancerId: Joi.objectId(),
    companyId: Joi.objectId().required(),
    price: Joi.number().min(1).max(3000).required(),
    jobTitle: Joi.string().min(5).max(1024).required(),
    duration: Joi.number().min(1).max(365).required(),
    jobStatus: Joi.string()
      .required()
      .valid("open", "inProgress", "closed")
      .insensitive(),
  });

  return schema.validate(user);
}

function validatePatch(user) {
  const schema = Joi.object({
    freelancerId: Joi.objectId(),
    companyId: Joi.objectId(),
    price: Joi.number().min(1).max(3000),
    jobTitle: Joi.string().min(5).max(1024),
    duration: Joi.number().min(1).max(365),
    jobStatus: Joi.string().valid("open", "inProgress", "closed").insensitive(),
  });

  return schema.validate(user);
}

exports.validatePatch = validatePatch;
exports.validate = validate;
exports.Job = Job;
