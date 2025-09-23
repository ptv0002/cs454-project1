const express = require('express');
const morgan = require('morgan');
const app = express();

// Middleware: Morgan for logging all requests to the console
app.use(morgan('combined'));

// The core conversion endpoint
app.get('/convert', (req, res) => {
    const lbs = Number(req.query.lbs);

    // Missing param or not a number → 400
    if (req.query.lbs === undefined || Number.isNaN(lbs)) {
        return res.status(400).json({ error: 'Query param lbs is required and must be a number' });
    }

    // Negative or non-finite → 422
    if (!Number.isFinite(lbs) || lbs < 0) {
        return res.status(422).json({ error: 'lbs must be a non-negative, finite number' });
    }

    // Perform the conversion
    const kg = Math.round(lbs * 0.45359237 * 1000) / 1000;

    // Send the JSON response
    res.json({
        lbs: lbs,
        kg: kg,
        formula: 'kg = lbs * 0.45359237'
    });
});

// Start the server (with env support)
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`CS454 Unit Converter service listening on port ${port}`);
});
