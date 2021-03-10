const express = require('express');
const path = require('path');
const router = express.Router();

const getPath = (name) => path.join(__dirname, '..', 'public', `${name}.html`);

router.get('/exercise', (req, res) => {
    res.sendFile(getPath('exercise'));
});

module.exports = router;