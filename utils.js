const convertDollarToNumber = (dollar) => {
    return Number(dollar.replace(/[^-0-9.]/g, ''));
};

const excahnge = (source, target, amount, currencies) => {
    return Math.round(amount * currencies[source][target] * 100) / 100;
};

const convertNumberToDollar = (number) => {
    const dollarFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    return dollarFormatter.format(number);
};

export { convertDollarToNumber, excahnge, convertNumberToDollar };
