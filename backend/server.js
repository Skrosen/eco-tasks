import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import listEndpoints from "express-list-endpoints";

import User from "./models/User.js";
import Role from "./models/Role.js";

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
      res
        .status(404)
        .json({ response: "Please log in", success: false });
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

// Endpoint for adding new roles
app.post("/role", async (req, res) => {
  const { description } = req.body;

  try {
    const newRole = await new Role({ description }).save();
    res.status(201).json({ response: newRole, success: true });
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

// Endpoint for signing up
app.post("/signup", async (req, res) => {
  console.log(req.body);
  const {
    username,
    password,
    email,
    firstName,
    lastName,
    country,
    city,
    role,
  } = req.body;
  try {
    console.log("i am in try");
    const salt = bcrypt.genSaltSync();

    // detta använde så att vi så att det verifierades innan ett error, vet inte vad för och nackdelar är.
    // const user = await User.findOne({ username });

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
    const queriedRole = await Role.findById(role);
    const newUser = await new User({
      username: username,
      password: bcrypt.hashSync(password, salt),
      firstName: firstName,
      lastName: lastName,
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

// Endpoint to delete account
app.delete("/deleteuser", authenticateUser);
app.delete("/deleteuser", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (user && bcrypt.compareSync(password, user.password)) {
      await User.deleteOne({ username });
      res.status(200).json({
        message: `${username} is deleted`,
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

// Endpoint for showing leaderboard, only for authenticated users
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

// Endpoint for information, only for authenticated users
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

// //finds book info based on id
// app.get("/books/id/:id", async (req, res) => {
// 	const id = req.params.id;
// 	const bookById = await Book.find({ bookID: id });
// 	try {
// 		if (!bookById) {
// 			res.status(404).json({
// 				response: "Book not found",
// 				success: false,
// 			});
// 		} else {
// 			res.json({
// 				response: bookById,
// 				success: true,
// 			});
// 		}
// 	} catch {
// 		res.status(400).json({
// 			response: "Id is invalid",
// 			success: false,
// 		});
// 	}
// });

// Endpoint for showing profile page
app.get("/username/:username", authenticateUser);
app.get("/username/:username", async (req, res) => {
  const username = req.params.username;
  console.log("username", username);

  try {
    const user = await User.findOne({ username: username });
    console.log(user);
    res.status(200).json({
      response: user,
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

// Endpoint for tasks
app.get("/:username/tasks", authenticateUser);
app.get("/:username/tasks", async (req, res) => {
  try {
  } catch {
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
