const User = require('../models/user.model.js');
const History = require('../models/history.model.js');

exports.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

exports.addUser = async (req, res) => {
    const { name } = req.body;
    const newUser = new User({ name });
    await newUser.save();
    res.json(newUser);
};

exports.claimPoints = async (req, res) => {
    const { userId } = req.params;
    const points = Math.floor(Math.random() * 10) + 1;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    user.points += points;
    await user.save();

    const history = new History({ userId, points });
    await history.save();

    res.json({ user, points });
};

exports.getLeaderboard = async (req, res) => {
    const leaderboard = await User.find().sort({ points: -1 });
    res.json(leaderboard);
};

exports.getHistory = async (req, res) => {
    const history = await History.find().populate('userId', 'name').sort({ createdAt: -1 });
    res.json(history);
};
