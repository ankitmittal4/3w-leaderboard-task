const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const userRoutes = require('./src/routes/user.route');

require('dotenv').config();
const app = express();

connectDB();
app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);

app.get("/", (req, res) => {
    res.send("<h1>Backend server is running</h1>");
});


const PORT = process.env.PORT || 3021;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
