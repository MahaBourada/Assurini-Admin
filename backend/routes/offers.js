import express from "express";
import { getAllOffers, createOffer, getOneOffer, updateOffer, deleteOffer } from "../controllers/offers.js";
import { verifyJWT } from "../middleware/verifyJWT.js";

const router = express.Router();

router.use(verifyJWT)

router.get("/", getAllOffers);
router.get("/:id", getOneOffer);
router.post("/", createOffer);
router.patch("/:id", updateOffer);
router.delete("/:id", deleteOffer);

export default router;
