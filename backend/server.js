import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import listEndpoints from "express-list-endpoints";
import _ from "lodash";
import moment from "moment";

import User from "./models/User.js";
import Role from "./models/Role.js";
import Task from "./models/Task.js";
import CheckedTask from "./models/CheckedTask.js";
import Fact from "./models/EnviroFact.js";

const mongoUrl =
	process.env.MONGO_URL || "mongodb://localhost/eco-friendly-api";
mongoose.connect(mongoUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});
mongoose.Promise = Promise;

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Our own middleware that checks if the database is connected before going forward to our endpoints
app.use((req, res, next) => {
	if (mongoose.connection.readyState === 1) {
		next();
	} else {
		res.status(503).json({ error: "Service unavailable" });
	}
});

// Check if access token was sent with the request
const authenticateUser = async (req, res, next) => {
	const accessToken = req.header("Authorization");
	try {
		const user = await User.findOne({ accessToken });
		if (user) {
			next();
		} else {
			res.status(404).json({ response: "Please log in", success: false });
		}
	} catch (error) {
		res.status(400).json({
			response: error,
			message: "Something went wrong with the authorization...",
			success: false,
		});
	}
};

// Start defining your routes here
app.get("/", (req, res) => {
	res.send({
		"Welcome to ECO friendly API - by Sofia and Linnéa. See full documentation here 👉 ":
			listEndpoints(app),
	});
});

// Endpoint for signing up
app.post("/sign-up", async (req, res) => {
	const {
		username,
		password,
		email,
		firstName,
		lastName,
		description,
		country,
		city,
		role,
	} = req.body;
	try {
		const salt = bcrypt.genSaltSync();

		const queriedRole = await Role.findById(role);
		const newUser = await new User({
			username: username,
			password: bcrypt.hashSync(password, salt),
			firstName: firstName,
			lastName: lastName,
			description: description,
			email: email,
			country: country,
			city: city,
			role: queriedRole,
		}).save();

		res.status(201).json({
			response: newUser,
			success: true,
		});
	} catch (error) {
		if (
			(error.code === 11000 && error.keyValue.username) ||
			(error.code === 11000 && error.keyValue.email)
		) {
			res.status(400).json({
				response: error,
				message:
					"This username or email is already registered. Please choose another one or login.",
				success: false,
			});
		} else {
			res.status(400).json({
				response: error,
				message: "Something went wrong with signup...",
				success: false,
			});
		}
	}
});

// Endpoint for logging in
app.post("/login", async (req, res) => {
	const { username, password } = req.body;

	try {
		const user = await User.findOne({ username });

		if (user && bcrypt.compareSync(password, user.password)) {
			res.status(200).json({
				response: {
					userId: user._id,
					username: user.username,
					firstName: user.firstName,
					lastName: user.lastName,
					description: user.description,
					email: user.email,
					country: user.country,
					city: user.city,
					score: user.score,
					createdAt: user.createdAt,
					accessToken: user.accessToken,
				},
				success: true,
			});
		} else {
			res.status(404).json({
				message: "User not found or password incorrect",
				success: false,
			});
		}
	} catch (error) {
		res.status(400).json({
			response: error,
			message: "Something went wrong...",
			success: false,
		});
	}
});

// Endpoint for showing profile page
app.get("/user/:userId", authenticateUser);
app.get("/user/:userId", async (req, res) => {
	const userId = req.params.userId;

	try {
		const user = await User.findOne({ _id: userId });
		res.status(200).json({
			response: {
				username: user.username,
				firstName: user.firstName,
				lastName: user.lastName,
				description: user.description,
				email: user.email,
				country: user.country,
				city: user.city,
				score: user.score,
				createdAt: user.createdAt,
			},
			success: true,
		});
	} catch (error) {
		res.status(400).json({
			response: error,
			message: "Something went wrong...",
			success: false,
		});
	}
});

//using mongo operator to increase, $inc.  new is used to give back the latest count
app.patch("/user/:userId/score", authenticateUser);
app.patch("/user/:userId/score", async (req, res) => {
	const { userId } = req.params;
	const { taskId } = req.body;

	try {
		const task = await Task.findById({
			_id: taskId,
		});

		const taskScore = task.score;

		if (taskScore) {
			const updatedScore = await User.findByIdAndUpdate(
				userId,
				{ $inc: { score: taskScore } },
				{ new: true }
			);
			res.status(200).json({ response: updatedScore, success: true });
		} else {
			res.status(404).json({
				message: "Task not found",
				success: false,
			});
		}
	} catch (error) {
		res.status(400).json({ response: error, success: false });
	}
});

// Endpoint to delete account
app.delete("/user/:userId", authenticateUser);
app.delete("/user/:userId", async (req, res) => {
	const userId = req.params.userId;

	try {
		await User.deleteOne({ _id: userId });
		res.status(200).json({
			message: "User is deleted",
			success: true,
		});
	} catch (error) {
		res.status(400).json({
			response: error,
			message: "Something went wrong...",
			success: false,
		});
	}
});

// Endpoint for adding new roles
app.post("/roles", async (req, res) => {
	const { description } = req.body;

	try {
		const newRole = await new Role({ description }).save();
		res.status(201).json({ response: newRole, success: true });
	} catch (error) {
		res.status(400).json({ response: error, success: false });
	}
});

app.get("/tasks/all-tasks", authenticateUser);
app.get("/tasks/all-tasks", async (req, res) => {
	const allTasks = await Task.find();
	try {
		res.status(200).json({
			response: allTasks,
			success: true,
		});
	} catch (error) {
		res.status(400).json({
			response: error,
			message: "Something went wrong...",
			success: false,
		});
	}
});

// Endpoint for checking task
app.post("/tasks/checked-tasks", authenticateUser);
app.post("/tasks/checked-tasks", async (req, res) => {
	const { userId, taskId } = req.body;

	try {
		const user = await User.findById(userId);
		if (user) {
			const checkedTask = await new CheckedTask({
				userId: userId,
				taskId: taskId,
			}).save();

			res.status(200).json({
				response: checkedTask,
				success: true,
			});
		} else {
			res.status(404).json({
				message: "User not found",
				success: false,
			});
		}
	} catch (error) {
		res.status(400).json({
			response: error,
			message: "Something went wrong while trying to find tasks...",
			success: false,
		});
	}
});

// Endpoint for showing checked tasks per user
app.get("/tasks/checked-tasks", authenticateUser);
app.get("/tasks/checked-tasks", async (req, res) => {
	const userId = req.header("userId");

	try {
		const allCheckedTasks = await CheckedTask.find({ userId: userId })
			.populate("taskId")
			.populate("userId");

		if (allCheckedTasks) {
			res.status(200).json({
				response: allCheckedTasks,
				success: true,
			});
		} else {
			res.status(404).json({
				message: "User not found",
				success: false,
			});
		}
	} catch (error) {
		res.status(400).json({
			response: error,
			message: "Something went wrong while trying to find checked tasks...",
			success: false,
		});
	}
});

// endpoint for deleting a task that has been checked as done
app.delete("/tasks/checked-tasks", authenticateUser);
app.delete("/tasks/checked-tasks", async (req, res) => {
	const { checkedTaskId } = req.body;

	try {
		const deletedTask = await CheckedTask.deleteOne({
			_id: checkedTaskId,
		});
		res.status(200).json({
			response: deletedTask,
			message: "Task deleted successfully",
			success: true,
		});
	} catch (error) {
		res.status(400).json({
			response: error,
			message: "Something went wrong while trying to delete task...",
			success: false,
		});
	}
});

// Endpoint for showing leaderboard, only for authenticated users
// app.get("/leaderboard", authenticateUser);
app.get("/leaderboard", async (req, res) => {
	const { country, timeSpan } = req.query;

	const currentDate = moment();

	try {
		let populatedTasks = await CheckedTask.find()
			.populate("taskId")
			.populate("userId");

		if (country) {
			populatedTasks = populatedTasks.filter(
				(task) => task.userId.country === country
			);
		}
		if (timeSpan) {
			populatedTasks = populatedTasks.filter((task) =>
				moment(task.checkedAt).isSame(currentDate, timeSpan)
			);
		}

		const summarisedUsers = _(populatedTasks)
			.groupBy("userId.username")
			.map((tasks, username) => ({
				user: username,
				userCreatedAt: tasks[0].userId.createdAt,
				score: _.sumBy(tasks, "taskId.score"),
			}))
			.orderBy(["score"], ["desc"]);

		res.status(200).json({
			response: summarisedUsers,
			success: true,
		});
	} catch (error) {
		res.status(400).json({
			response: error,
			message: "Something went wrong...",
			success: false,
		});
	}
});

// Endpoint for information, only for authenticated users
app.get("/information", authenticateUser);
app.get("/information", async (req, res) => {
	const allFacts = await Fact.find();

	try {
		res.status(200).json({
			response: allFacts,
			success: true,
		});
	} catch (error) {
		res.status(400).json({
			response: error,
			message: "Something went wrong...",
			success: false,
		});
	}
});

// Start the server
app.listen(port, () => {
	// eslint-disable-next-line
	console.log(`Server running on http://localhost:${port}`);
});
