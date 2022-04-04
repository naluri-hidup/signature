const express = require("express");
const cors = require('cors');
const Utils = require("./util");
const app = express();
const port = 4000;
require('dotenv').config();

(async function main() {
    app.use(express.json());
    app.use(cors());
    app.use(
        express.urlencoded({
            extended: true,
        })
    );

    app.post('/', Utils.validateSignature, async (req, res) => {
        try {
            res.send("If you received this, it means everything went according to plan!");
        }
        catch (err) {
            console.log(err);
        }
    });

    app.listen(port, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`${process.pid} listening at port: ` + port);
        }
    });
})();

process.on("uncaughtException", async (error) => {
    console.log("uncaughtException", error);
});