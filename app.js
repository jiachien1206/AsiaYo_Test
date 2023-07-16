import fs from 'fs';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
export const app = express();
const currency = fs.readFileSync('currency.json');
const { currencies } = JSON.parse(currency);
const currencyRegex = /^(-)?\$\d{1,3}(,\d{3})*(\.\d+)?$/;

import { convertDollarToNumber, excahnge, convertNumberToDollar } from './utils.js';

app.get('/exchange', (req, res) => {
    const { source, target, amount } = req.query;

    // Validate inputs
    if (!source || !target || !amount || !currencyRegex.test(amount)) {
        return res.status(400).json({ msg: 'Invalid input.' });
    }

    // Convert currency into number
    const num = convertDollarToNumber(amount);

    if (isNaN(num)) {
        return res.status(400).json({ msg: 'Invalid input.' });
    }

    if (!currencies[source] || !currencies[target]) {
        return res.status(400).json({ msg: 'Currency not supported.' });
    }

    // Exchange
    const exchanged = excahnge(source, target, num, currencies);

    // Format the number into currency format
    const result = convertNumberToDollar(exchanged);

    return res.status(200).json({ msg: 'success', amount: result });
});

app.listen(process.env.PORT, () => {
    console.log(`This application is running on local host: ${process.env.PORT}`);
});
