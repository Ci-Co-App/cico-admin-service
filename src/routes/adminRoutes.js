const express = require("express");
const { authMiddleware, interceptorAdmin } = require("../middlewares/authAdminMiddleware");
const { createEmployee, getEmployee, getAllEmployees, updateEmployee, deleteEmployee, getAttendance } = require("../controllers/adminControllers");
const router = express.Router();

router.post("/add-employee", authMiddleware, interceptorAdmin, createEmployee);
router.get("/employee/:id", authMiddleware, interceptorAdmin, getEmployee);
router.get("/employee", authMiddleware, interceptorAdmin, getAllEmployees);
router.put("/employee/:id", authMiddleware, interceptorAdmin, updateEmployee);
router.delete("/employee/:id", authMiddleware, interceptorAdmin, deleteEmployee);
router.get("/employee/attendance/:id", authMiddleware, interceptorAdmin, getAttendance);

module.exports = router;
