const { User } = require('../models/adminModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Attendance } = require('../models/adminModel');
const exp = require('constants');

exports.createEmployee = async (req, res) => {
    try {
        const { name, email, password, position, department, address, status, photo_profile } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists. Please use a different email.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: 'employee',
            photo_profile,
            position,
            department,
            address,
            status: status || 'active',
        });

        res.status(201).json({ message: 'Employee created successfully', data: user });

    } catch (error) {
        console.error('Create Employee Error:', error);

        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(400).json({ message: "Email is already registered. Please use a different email." });
        }

        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getAllAttendance = async (req, res) => {
    console.log('dapet gak');
    try {
        console.log('Get All Attendance');
        const attendance = await Attendance.findAll({ order: [['createdAt', 'DESC']] });
        res.status(200).json({ data: attendance });
        console.log(attendance);
    }
    catch (error) {
        console.log('masuk sini');
        console.error('Get All Attendance Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, position, department, address, status } = req.body;
        console.log("masuk sini update employee");
        const employee = await User.findByPk(id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        await User.update(
            { name, position, department, address, status },
            { where: { id } }
        );

        const updatedEmployee = await User.findByPk(id);

        res.status(200).json({
            message: 'Employee successfully updated',
            data: updatedEmployee
        });
    } catch (error) {
        console.error('Update Employee Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.destroy({ where: { id } });
        res.status(200).json({ message: 'Employee deleted', data: user });
    }
    catch (error) {
        console.error('Delete Employee Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.getEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);
        console.log("masuk get");
        if (!user) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json({
            message: 'Employee retrieved successfully',
            data: user
        });
    } catch (error) {
        console.error('Get Employee Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.getAllEmployees = async (req, res) => {
    try {
        const users = await User.findAll();

        if (users.length === 0) {
            return res.status(404).json({ message: 'No employees found' });
        }

        res.status(200).json({
            message: 'Employees retrieved successfully',
            count: users.length,
            data: users
        });
    } catch (error) {
        console.error('Get All Employees Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};




exports.getAttendance = async (req, res) => {
    try {
        const { id } = req.params;
        const attendance = await Attendance.findAll({ where: { user_id: id }, order: [['createdAt', 'DESC']] });
        res.status(200).json({ data: attendance });
    }
    catch (error) {
        console.error('Get Attendance Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

