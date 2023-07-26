import mongoose from "mongoose";

/// Basic details of an admin, you can add more
const adminSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "Please tell us your first name!"],
    },
    last_name: {
      type: String,
      required: [true, "Please tell us your last name!"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "Please provide your phone number"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 8,
      select: false,
    },
    role: {
      type: String,
      required: [true, "Please provide the admin role"],
      enum: ["super admin", "admin", "audit"],
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },
    last_login: Date,
    last_login_location: {
      type: Object,
    },
    last_login_device: {
      type: Object,
    },
    password_changed_at: Date,
    password_reset_token: {
      type: String,
      select: false,
    },
    password_reset_expires: Date,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<mongoose.Document>("Admin", adminSchema);
