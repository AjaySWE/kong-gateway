const express = require('express');
const router = express.Router();

// Example API endpoint
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'API is running fine' });
});

module.exports = router;