import mongoose from "mongoose";
import crypto from "crypto";

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true,
		minlength: 3,
		maxlength: 50,
	},
	password: {
		type: String,
		required: true,
		minlength: 8,
	},
	firstName: {
		type: String,
		required: true,
		trim: true, //trims down excess spaces
	},
	lastName: {
		type: String,
		required: true,
		trim: true,
	},
	description: {
		type: String,
		maxlength: 140,
	},
	email: {
		type: String,
		lowercase: true,
		unique: true,
		required: true,
	},
	country: {
		type: String,
		required: true,
	},
	city: {
		type: String,
	},
	role: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Role",
	},
	score: {
		type: Number,
		default: 0,
	},
	createdAt: {
		type: Date,
		default: () => Date.now(),
	},
	accessToken: {
		type: String,
		default: () => crypto.randomBytes(128).toString("hex"),
	},
});

const User = mongoose.model("User", UserSchema);

export default User;
