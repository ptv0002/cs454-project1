const express = require('express');
const morgan = require('morgan');
const app = express();

// Middleware: Morgan for logging all requests to the console
app.use(morgan('combined'));

// The core conversion endpoint
app.get('/convert', (req, res) => {
    //Check if the 'lbs' parameter exists and is a valid number
    if (req.query.lbs === undefined) {
        return res.status(400).json({ error: 'Query param lbs is required' });
    }

    const lbs = Number(req.query.lbs);

    if (Number.isNaN(lbs)) {
        return res.status(400).json({ error: 'Query param lbs must be a number' });
    }

    // Check if the number is non-negative
    if (!Number.isFinite(lbs)) {
        return res.status(422).json({ error: 'lbs must be a finite number' });
    }
    if (lbs < 0) {
        return res.status(422).json({ error: 'lbs must be a non-negative number' });
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

// Start the server on port 80
const port = 8080;
app.listen(port, () => {
    console.log(`CS454 Unit Converter service listening on port ${port}`);
});
