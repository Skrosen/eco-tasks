import mongoose from "mongoose";

const CheckedTasksSchema = new mongoose.Schema({
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

const CheckedTask = mongoose.model("CheckedTask", CheckedTasksSchema);

export default CheckedTask;
