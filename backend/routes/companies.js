import express from "express";
import { getAllCompanies, createCompany, getOneCompany, updateCompany, deleteCompany } from "../controllers/companies.js";
import { verifyJWT } from "../middleware/verifyJWT.js";

const router = express.Router();

router.use(verifyJWT)

router.get("/", getAllCompanies);
router.get("/:id", getOneCompany);
router.post("/", createCompany);
router.patch("/:id", updateCompany);
router.delete("/:id", deleteCompany);

export default router;
