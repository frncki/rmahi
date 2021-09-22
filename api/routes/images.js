import express from "express";
const router = express.Router();

router.get('/', (req, res) => {
    return res.send('Images');
});

router.post('/', (req, res) => {
    return res.send('Hello express 🚂');
});

module.exports = router;