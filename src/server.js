require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize_auth, sequelize_employee } = require("./config/db");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(express.json());
app.use("/api/cico/admin", adminRoutes);

(async () => {
    try {
        console.log("Connecting to Authentication DB...");
        await sequelize_auth.authenticate();
        console.log("✅ Authentication DB Connected!");

        console.log("Connecting to Employee DB...");
        await sequelize_employee.authenticate();
        console.log("✅ Employee DB Connected!");

        await sequelize_auth.sync();   
        await sequelize_employee.sync();
        console.log("✅ Database Synced Successfully!");
    } catch (error) {
        console.error("❌ Database connection error:", error);
    }
})();


const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`🚀 Admin Service Running on Port ${PORT}`));
