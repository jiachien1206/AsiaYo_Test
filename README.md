# AsiaYo Test

This is an API that allows you to exchange currencies. The server is written in Node.js, so please make sure you have Node.js installed, preferably version 18 or higher.

## Deployment

1. Install the required packages: `npm install`
2. Create config: `.env`
3. Set `PORT` number that is available for you
4. Start server: `node app.js`

## How to use the exchange API

Once the server is running, you can use the GET method to perform currency exchange.

### API Endpoint

`http://localhost:{your port number}/exchange?source={Source Currency}&target={Target Currency}&amount={Amount you want to excahnge}`

### Rules

-   Now the API supports exchange between USD, TWD, JPY
-   Please add comma separators as thousands separators
-   The amount should start with the $ symbol.

### Example

http://localhost:3000/exchange?source=USD&target=JPY&amount=$1,525

## Run tests

To run the unit tests and API tests, use the command `npm run test`.
