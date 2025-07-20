const express = require('express');
const multer = require('multer');
const router = express.Router();
const { uploadDocument, getUserDocuments } = require('../controllers/documentController');

const upload = multer({
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('text/')) {
      cb(null, true);
    } else {
      cb(new Error(`File type '${file.mimetype}' not allowed.`));
    }
  }
});

router.post('/upload', upload.single('document'), uploadDocument);
router.get('/user/:user_id', getUserDocuments);

module.exports = router;
