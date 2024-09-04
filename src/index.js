import express from "express";
import dotenv from "dotenv";
import { twitsRouter } from "./controllers/twitsController.js";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

app.use(express.json());

const PORT = process.env.PORT || 8000;

app.use("/api/twits", twitsRouter);

app.get("/profile", (req, res) => {
	res.render("profile", {
		user: {
			name: "Nazarii",
			age: 20,
		},
	});
});

app.get("/error", (req, res) => {
	throw new Error("This is a test error");
});

app.use("*", (req, res) => {
	res.status(404).json({
		message: "Not found",
	});
});

app.use((err, req, res, next) => {
	console.log(err.stack);
	res.status(500).json({ message: "Something went wrong" });
});

app.listen(PORT, () => {
	console.log(`Server us running on port ${PORT}`);
});
