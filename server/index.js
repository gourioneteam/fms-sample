require('dotenv').config();

const express=require('express')
const connectDB = require('./src/config/db');

const cors = require("cors");

connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

const allowedOrigins = ["http://localhost:5173", "https://fms-sample-fe.vercel.app/"];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,  // Allow cookies if needed
}));
app.get('/',(req,res)=>{
    res.send("welcome")
})

app.use("/api/auth", require("./src/routes/authRoutes"));  // Authentication Routes
app.use("/api/admin", require("./src/routes/adminroute"));  // Admin Routes
app.use("/api/student", require("./src/routes/studentroute"));  // student Routes
app.use("/api/admin", require("./src/routes/batchallocationroutes"));//admin
app.use("/api/trainer", require("./src/routes/trainerroutes"));//admin



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
