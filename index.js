"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
let serveStatic = require('serve-static');
let path = require('path');
let bodyParser = require('body-parser');
const log4js = require("log4js");
log4js.configure("logger.config.json");
let logger = log4js.getLogger();
logger.level = "communication";
logger.atomic("Launch");
const api = (0, express_1.default)();
const port = process.env.API_PORT;
api.use(bodyParser.json());
api.all('*', (req, res, next) => {
    // @ts-ignore
    res.setHeader('Access-Control-Allow-Origin', process.env.APP_ENDPOINT);
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    logger.communication(`[${req.method}] ${req.path} - ${JSON.stringify(req.body)}`);
    next();
});
api.use('/photo-library/', require('./imgs'));
api.use('/logger/', require('./logger'));
api.get('/api/*', (req, res) => {
    res.send(`You'd like a function, eh?`);
});
if (process.env.APP_STATIC_FILES) {
    api.get('/*', serveStatic(process.env.APP_STATIC_FILES, { maxAge: 30 * 60 * 1000 }));
    api.get('/*', (req, res) => {
        res.set('Content-Type', 'text/html');
        res.sendFile(path.join(__dirname, process.env.APP_STATIC_FILES, 'index.html'));
    });
}
api.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
