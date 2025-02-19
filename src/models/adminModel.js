const { DataTypes } = require('sequelize');
const { sequelize_auth, sequelize_employee } = require('../config/db');

const User = sequelize_auth.define('User', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('admin', 'employee'), allowNull: false, defaultValue: 'employee' },
    photo_profile: { type: DataTypes.STRING, allowNull: true },
    position: { type: DataTypes.STRING, allowNull: true },
    department: { type: DataTypes.STRING, allowNull: true },
    address: { type: DataTypes.STRING, allowNull: true },
    status: { type: DataTypes.ENUM('active', 'inactive'), allowNull: false, defaultValue: 'active' }
}, {
    timestamps: true
});

const Attendance = sequelize_employee.define('Attendance', {
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    clock_in: { type: DataTypes.DATE, allowNull: false },
    clock_out: { type: DataTypes.DATE, allowNull: true },
    evidence_photo_clockin: { type: DataTypes.STRING, allowNull: true },
    evidence_photo_clockout: { type: DataTypes.STRING, allowNull: true },
    location_clockin: { type: DataTypes.STRING, allowNull: true },
    location_clockout: { type: DataTypes.STRING, allowNull: true }
}, {
    timestamps: true
});


module.exports = { User, Attendance };
