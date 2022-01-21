import mongoose from "mongoose";

const CheckedTasksSchema = new mongoose.Schema({
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
	accessToken: {
		type: String,
		default: () => crypto.randomBytes(128).toString("hex"),
	},
	email: {
		type: String,
		lowercase: true,
		unique: true,
		required: true,
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
	country: {
		type: String,
		required: true,
	},
	city: {
		type: String,
	},
	score: {
		type: Number,
		default: 0,
	},
	checkedAt: {
		type: Date,
		default: () => Date.now(),
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
});

const CheckedTask = mongoose.model("CheckedTask", CheckedTaskSchema);

export default CheckedTask;
