const { User } = require("../model/user.model");
const bcrypt = require("bcrypt");

class UserService {
  //Create new user
  async createUser(user) {
    const salt = await bcrypt.genSalt(10);
    // for hashing the password that is saved the database for security reasons
    user.password = await bcrypt.hash(user.password, salt);

    return await user.save();
  }

  async getUserById(userId) {
    return await User.findById(userId).select("-password");
  }

  async getAllFreelancers() {
    return await User.find({ role: "freelancer" }).select(
      "-company, -password"
    );
  }

  async getFreelancerById(freelancerId) {
    return await User.find({ role: "freelancer", _id: freelancerId }).select(
      "-company, -password"
    );
  }

  async getAllCompanies() {
    return await User.find({ role: "company" }).select(
      "-freelancer, -password"
    );
  }

  async getCompanyById(companyId) {
    return await User.find({ role: "company", _id: companyId }).select(
      "-freelancer, -password"
    );
  }

  async getUserByEmail(email) {
    return await User.findOne({ email }).select("-password");
  }

  async getUserByUsername(userName) {
    return await User.findOne({ userName }).select("-password");
  }

  async getAllUsers() {
    return await User.find().sort({ _id: -1 }).select("-password");
  }

  async updateUserById(id, user) {
    return await User.findByIdAndUpdate(
      id,
      {
        $set: user,
      },
      { new: true }
    );
  }

  async deleteUser(id) {
    return await User.findByIdAndRemove(id);
  }
}

module.exports = new UserService();
