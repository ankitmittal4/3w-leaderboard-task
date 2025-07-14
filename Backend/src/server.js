require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user.route');

const allowedOrigins = process.env.CORS_ORIGIN;
// console.log(allowedOrigins);
const app = express();

connectDB();
// app.use(cors());
app.use(
    cors({
        origin: allowedOrigins
    })
);

app.use(express.json());
app.use('/api', userRoutes);

app.get("/", (req, res) => {
    res.send("<h1>Backend server is running</h1>");
});


const PORT = process.env.PORT || 3021;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
