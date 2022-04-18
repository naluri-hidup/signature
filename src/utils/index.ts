import CryptoJS from 'crypto-js';
import getConfig from '../config'


const Utils = {
    sortObject: (object: any) => {
        const sortedObject = Object.keys(object).sort().reduce(
            (obj: any, key: string) => {
                obj[key] = object[key];
                return obj;
            },
            {}
        );
        return sortedObject;
    },
    generateSignature: (payload: any) => {
        const sortedPayload = Utils.sortObject(payload);
        console.log(sortedPayload);
        let concatinatedString = "";
        Object.keys(sortedPayload).forEach(key => {
            concatinatedString += `${key}=${sortedPayload[key]}`;
        });
        console.log(concatinatedString);
        const signature = CryptoJS
            .HmacSHA256(concatinatedString, getConfig().API_KEY)
            .toString(CryptoJS.enc.Hex);
        return signature;
    },
    validateTimestamp: (timestamp: number) => {
        const maxDurationInMilli = 900000;
        if (Date.now() - timestamp > maxDurationInMilli) {
            return false;
        }
        return true;
    },
    validateApiKey: (api_key: string) => {
        if (api_key === process.env.API_KEY) return true;
        return false;
    },
    validateSignature: (req: any, res: any, next: any) => {
        const incomingPayload = req.body;
        const incomingSignature = req.headers.signature;
        const timestamp = req.headers.timestamp;
        const api_key = req.headers.api_key;
        if (!incomingSignature) {
            return res.status(400).json({
                code: "SignatureNotFound",
                message: "There was no signature"
            });
        }
        if (!timestamp) {
            return res.status(400).json({
                code: "TimestampNotFound",
                message: "There was no timestamp"
            });
        }
        incomingPayload.timestamp = timestamp;
        if (!Utils.validateTimestamp(timestamp)) {
            return res.status(400).json({
                code: "InvalidTimestamp",
                message: "Timestamp has overdued"
            });
        }
        if (!Utils.validateApiKey(api_key)) {
            return res.status(400).json({
                code: "Invalidapi_key",
                message: "Api Key is invalid"
            });
        }
        const signature = Utils.generateSignature(incomingPayload);
        if (signature === incomingSignature) console.log("Signature Matched");
        else console.log("Signature Not Matched");
        console.log({
            incomingSignature,
            generatedSignature: signature
        });
        if (signature === incomingSignature) next();
        else return res.status(400).json({
            code: "InvalidSignature",
            message: "Signature is invalid"
        });
    }
};

export default Utils;