import express from "express";
import Auth from "./v1/auth";
import v1 from "./v1/goal";

const router = express.Router();
console.log("route");

router.use("/auth", Auth);
router.use("/v1", v1);

export default router;
