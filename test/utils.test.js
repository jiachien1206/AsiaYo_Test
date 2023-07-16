import { convertDollarToNumber, excahnge, convertNumberToDollar } from '../utils.js';
const currencies = {
    TWD: {
        TWD: 1,
        JPY: 3.669,
        USD: 0.03281,
    },
    JPY: {
        TWD: 0.26956,
        JPY: 1,
        USD: 0.00885,
    },
    USD: {
        TWD: 30.444,
        JPY: 111.801,
        USD: 1,
    },
};

test('Convert dollar to number', () => {
    expect(convertDollarToNumber('$123.5')).toBe(123.5);
    expect(convertDollarToNumber('$0')).toBe(0);
    expect(convertDollarToNumber('$123,456.0')).toBe(123456);
    expect(convertDollarToNumber('$23,456.12')).toBe(23456.12);
    expect(convertDollarToNumber('-$1,456.12')).toBe(-1456.12);
    expect(convertDollarToNumber('-$1')).toBe(-1);
    expect(convertDollarToNumber('-$2.00')).toBe(-2);
});

test('Excahnge', () => {
    expect(excahnge('JPY', 'USD', 0, currencies)).toBe(0);
    expect(excahnge('TWD', 'USD', 0, currencies)).toBe(0);
    expect(excahnge('TWD', 'USD', 100, currencies)).toBe(3.28);
    expect(excahnge('TWD', 'JPY', 10000, currencies)).toBe(36690);
    expect(excahnge('JPY', 'TWD', 1.2, currencies)).toBe(0.32);
    expect(excahnge('USD', 'JPY', 2999, currencies)).toBe(335291.2);
    expect(excahnge('USD', 'TWD', -1000, currencies)).toBe(-30444);
});

test('Convert number to dollar', () => {
    expect(convertNumberToDollar(10)).toBe('$10.00');
    expect(convertNumberToDollar(0)).toBe('$0.00');
    expect(convertNumberToDollar(2222)).toBe('$2,222.00');
    expect(convertNumberToDollar(1000000.9)).toBe('$1,000,000.90');
    expect(convertNumberToDollar(-1000000)).toBe('-$1,000,000.00');
    expect(convertNumberToDollar(-123.88)).toBe('-$123.88');
});
