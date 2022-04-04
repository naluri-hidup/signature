# Naluri Signature Generation

This project is an example of how signature is generated for RESTapi(s).

## How it works

It generates a signature using the crypto-js lib based on the timestamp, api_key, and the request body. Generation of signatures will take place in both frontend and backend. In-order to validate the signature, the backend will compare the signature generated with the signature generated from the frontend and the backend. If both the signatures match, it means that the request body was not tempered with.

## Installation

The project requires [Node.js](https://nodejs.org/) to run.
Install the dependencies and start the server.

```sh
npm install
npm start
```

## How to use on postman

For simplicity, feel free to test with this postman collection.
https://www.getpostman.com/collections/f8f52940970b6ca40292

## How it works (Technical Level)

The request body is sorted based on its keys. It is then concatinated into a string along with a timestamp in a sorted manner.
For example,

```sh
password=testpasswordtimestamp=1649083456808username=testusername
```

It is then encrypted using sha256 along with the api_key,

```sh
const signature = CryptoJS
    .HmacSHA256(concatinatedString, process.env.API_KEY)
    .toString(CryptoJS.enc.Hex);
```

This happens in both frontend and backend in order to check for the signature's validity.
