const express = require("express");
const { authMiddleware, interceptorAdmin } = require("../middlewares/authAdminMiddleware");
const { createEmployee, getEmployee, getAllEmployees, updateEmployee, deleteEmployee, getAttendance, getAllAttendance } = require("../controllers/adminControllers");
const router = express.Router();

router.post("/add-employee", authMiddleware, interceptorAdmin, createEmployee);
router.get("/employee", authMiddleware, interceptorAdmin, getAllEmployees);
router.get("/employee/attendance", authMiddleware, interceptorAdmin, getAllAttendance);
router.put("/employee/:id", authMiddleware, interceptorAdmin, updateEmployee);
router.delete("/employee/:id", authMiddleware, interceptorAdmin, deleteEmployee);
router.get("/employee/attendance/:id", authMiddleware, interceptorAdmin, getAttendance);
router.get("/employee/:id", authMiddleware, interceptorAdmin, getEmployee);


module.exports = router;
