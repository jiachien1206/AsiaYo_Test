import fs from 'fs';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const currency = fs.readFileSync('currency.json');
const { currencies } = JSON.parse(currency);
const currencyRegex = /^\$\d{1,3}(,\d{3})*(\.\d+)?$/;
const dollarFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

app.get('/exchange', (req, res) => {
    const { source, target, amount } = req.query;
    // Validate inputs
    if (!currencies[source] || !currencies[target]) {
        return res.status(400).json({ message: `Source or target currency is not included.` });
    }

    if (!currencyRegex.test(amount)) {
        return res.status(400).json({ msg: `Format of amount is wrong.` });
    }

    // Convert currency into number
    const num = amount.replace(/[^0-9.]/g, '');

    // Exchange
    let result = Math.round(num * currencies[source][target] * 100) / 100;

    // Format the number into currency format
    result = dollarFormatter.format(result);
    return res.status(200).json({ msg: 'success', amount: result });
});

app.listen(process.env.PORT, () => {
    console.log(`This application is running on local host: ${process.env.PORT}`);
});
