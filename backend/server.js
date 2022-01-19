import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";
import listEndpoints from "express-list-endpoints";

const mongoUrl =
	process.env.MONGO_URL || "mongodb://localhost/eco-friendly-api";
mongoose.connect(mongoUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});
mongoose.Promise = Promise;

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
	accessToken: {
		type: String,
		default: () => crypto.randomBytes(128).toString("hex"),
	},
	email: {
		type: String,
		unique: true,
		required: true,
	},
	name: [
		{
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
		},
	],
	location: [
		{
			country: {
				type: String,
				required: true,
			},
			city: {
				type: String,
			},
		},
	],
	score: {
		type: Number,
		default: 0,
	},
	createdAt: {
		type: Date,
		default: () => Date.now(),
	},
	role: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Role",
	},
});

const User = mongoose.model("User", UserSchema);

const RoleSchema = mongoose.Schema({
	description: String,
});

const Role = mongoose.model("Role", RoleSchema);

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// check if accesstoken was sent with the request
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
			message: "Something went wrong...",
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

// endpoint for adding new roles
app.post("/role", async (req, res) => {
	const { description } = req.body;

	try {
		const newRole = await new Role({ description }).save();
		res.status(201).json({ response: newRole, success: true });
	} catch (error) {
		res.status(400).json({ response: error, success: false });
	}
});

app.post("/signup", async (req, res) => {
	const { username, firstName, lastName, email, country, password } = req.body;
	console.log(req.body);
	console.log(username, firstName, lastName, email, country, password);
	try {
		const salt = bcrypt.genSaltSync();

		// detta använde så att vi så att det verifierades innan ett error, vet inte vad för och nackdelar är.
		// const user = await User.findOne({ username });
		// const salt = bcrypt.genSaltSync();

		// // checks if user already exists, if user exists - asks user to sign-in instead
		// if (user) {
		// 	throw "This username is already registered. Please choose another one or login.";
		// }

		// // ensures the username length is minimum X characters
		// if (username.length < X) {
		// 	throw "Username has to be at least X characters";
		// }

		// // ensures the password length is minimum X characters
		// if (password.length < X) {
		// 	throw "Password has to be at least X characters";
		// }
		console.log("before newUser-save");
		const newUser = await new User({
			username,
			name: { firstName, lastName },
			email,
			location: { country, city },
			password: bcrypt.hashSync(password, salt),
		}).save();

		console.log(newUser);

		res.status(201).json({
			response: {
				userId: newUser._id,
				username: newUser.username,
				// firstName: newUser.name.firstName,
				// lastName: newUser.name.lastName,
				// email: newUser.email,
				// location: newUser.location.country,
				// role: newUser.role.description, //kan vi skicka detta? hur?
				accessToken: newUser.accessToken,
			},
			success: true,
		});
	} catch (error) {
		// if (error.code === 11000) {
		// 	res.status(400).json({
		// 		response: error,
		// 		message:
		// 			"This username is already registered. Please choose another one or login.",
		// 		success: false,
		// 	});
		// } else {
		res.status(400).json({
			response: error,
			message: "Something went wrong...",
			success: false,
		});
		// }
	}
});

app.post("/login", async (req, res) => {
	const { username, password } = req.body;

	try {
		const user = await User.findOne({ username });

		if (user && bcrypt.compareSync(password, user.password)) {
			res.status(200).json({
				userId: user._id,
				username: user.username,
				accessToken: user.accessToken,
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

app.get("/leaderboard", authenticateUser);
app.get("/leaderboard", async (req, res) => {
	const { country, timeSpan } = req.query;

	try {
		const topUser = await User.find().sort({ score: "desc" }).exec();
		let filteredLeaderboard;

		if (country) {
			filteredLeaderboard = filteredLeaderboard
				.filter((item) => item.country === topUser.country)
				.exec();
		}

		if (timeSpan) {
			filteredLeaderboard = filteredLeaderboard.filter().exec();
		}

		filteredLeaderboard = filteredLeaderboard
			.sort({ score: "desc" })
			.limit(20)
			.exec();

		res.status(200).json({
			response: filteredLeaderboard,
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

app.get("/information", authenticateUser);
app.get("/information", async (req, res) => {
	try {
		res.status(200).json({
			response,
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
