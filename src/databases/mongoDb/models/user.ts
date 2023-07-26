import mongoose from "mongoose";

/// Basic details of a user, you can add more
const userSchema = new mongoose.Schema(
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
		date_of_birth: {
			type: Date,
		},
		gender: {
			type: String,
		},
		address: {
			type: String,
		},
		pin: {
			type: String,
			select: false,
			default: "",
		},
		is_pin_set: {
			type: Boolean,
			default: false,
		},
		security_question: {
			type: String,
		},
		security_answer: {
			type: String,
		},
		is_active: {
			type: Boolean,
			default: false,
		},
		password_changed_at: {
			type: Date,
			select: false,
		},
		password_reset_token: {
			type: String,
			select: false,
		},
		password_reset_expires: Date,
	},
	{
		timestamps: true,
	},
);

export default mongoose.model<mongoose.Document>("User", userSchema);
