const express = require('express');
const router = express.Router();
const {
    getUsers,
    addUser,
    claimPoints,
    getLeaderboard,
    getHistory
} = require('../controllers/user.controller');

router.get('/get-users', getUsers);
router.post('/add-user', addUser);
router.post('/claim/:userId', claimPoints);
router.get('/leaderboard', getLeaderboard);
router.get('/history', getHistory);

module.exports = router;
