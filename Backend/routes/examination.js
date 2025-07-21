const express = require('express');
const router = express.Router();
const { examineDocument } = require('../controllers/examinationController');

router.post('/examine', examineDocument);

module.exports = router;
