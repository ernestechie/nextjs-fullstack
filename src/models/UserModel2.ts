import mongoose from "mongoose";

const userSchema2 = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Provide valid username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
  otpCode: String,
  otpCodeExpiry: Date,
});

const UserModel2 =
  mongoose.models.UserModel2 || mongoose.model("UserModel2", userSchema2);
export default UserModel2;
