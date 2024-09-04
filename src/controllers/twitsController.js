import { Router } from "express";
import { TwitsService } from "../service/twitsService.js";
import { authMiddleware } from "../middlewares/auth.js";

const twitsService = new TwitsService();

const twitsRouter = Router();

twitsRouter.post("/", authMiddleware, (req, res) => {
	if(!req.body?.text?.length) {
		res.status(404).json({
			message: "Test is required"
		})
	}
	const twit = twitsService.createTwit(req.body);
	res.status(201).json(twit);
});

export { twitsRouter };
