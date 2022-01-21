import mongoose from "mongoose";

const TaskSchema = mongoose.Schema({
	description: String,
});

const Task = mongoose.model("Task", TaskSchema);

export default Task;
