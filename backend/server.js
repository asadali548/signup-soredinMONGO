
//-------------------------------------------//

const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const PORT = 5000;
const SECRET_KEY = "your_secret_key"; // Replace with a strong secret key

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

// MongoDB connection with enhanced error handling
async function connectDB() {
    try {
        await mongoose.connect("mongodb://localhost:27017/react-form", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}
connectDB();

// Define schemas and models
const signUpSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
});

const formDataSchema = new mongoose.Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    dob: { type: Date, required: true },
    batch: { type: String, required: true },
});

// Models
const SignUp = mongoose.model("SignUp", signUpSchema);
const FormData = mongoose.model("FormData", formDataSchema);

// Middleware to verify JWT token
function authMiddleware(req, res, next) {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).send("Access denied. No token provided.");

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send("Invalid token.");
    }
}

// Sign up route
app.post("/signup", async (req, res) => {
    const { name, age, gender, email, password } = req.body;

    try {
        const user = new SignUp({ name, age, gender, email, password });
        await user.save();
        res.status(201).send("User signed up successfully");
    } catch (error) {
        console.error("Error signing up user:", error);
        res.status(400).json({ message: "Error signing up: " + error.message, status: "failure" });
    }
});


// Login route
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await SignUp.findOne({ email });
        if (!user) return res.status(404).send("User not found");

        if (user.password !== password) {
            return res.status(401).send("Invalid password");
        }

        const token = jwt.sign({ email }, SECRET_KEY);
        res.status(200).json({ token, message: "User logged in successfully" });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(400).json({ message: "Error logging in: " + error.message, status: "failure" });
    }
});

// Form data submission (only accessible by logged-in users)
app.post("/form", authMiddleware, async (req, res) => {
    const { email } = req.user; // Get email from token
    const { username, dob, batch } = req.body;



    try {
        const formData = new FormData({ email, username, dob, batch });
        await formData.save();
        res.status(201).send("Form data saved successfully");
    } catch (error) {
        console.error("Error saving form data:", error);
        res.status(400).json({ message: "Error saving form data: " + error.message, status: "failure" });
    }
});

// Retrieve form data for logged-in user
app.get("/form", authMiddleware, async (req, res) => {
    const { email } = req.user;
    try {
        const userFormData = await FormData.find({ email });
        res.status(200).json(userFormData);
    } catch (error) {
        console.error("Error retrieving form data:", error);
        res.status(400).json({ message: "Error retrieving form data: " + error.message, status: "failure" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


