module.exports = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    // Validate the API key
    if (apiKey !== process.env.VALID_API_KEY) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
  