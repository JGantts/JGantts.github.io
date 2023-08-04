"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const inkjet = require('inkjet');
const log4js = require("log4js");
let logger = log4js.getLogger();
const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');
const url = require('url');
let serveStatic = require('serve-static');
//const { JsonDB, Config } = require('node-json-db');
//const logger = log4js.getLogger();
/*
  Routers
*/
let logsRouter = express_1.default.Router();
logsRouter.all('*', (req, res, next) => {
    //logger.communication(req.path)
    next();
});
logsRouter.get('/level', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(JSON.stringify(logger.level)).end();
}));
logsRouter.post('/log', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let message = req.body.logmessage;
    switch (req.body.logtype) {
        case 'communication':
            logger.communication(message);
            break;
        case 'atomic':
            logger.atomic(message);
            break;
        case 'trace':
            logger.trace(message);
            break;
        case 'entry':
            logger.entry(message);
            break;
        case 'debug':
            logger.debug(message);
            break;
        case 'info':
            logger.info(message);
            break;
        case 'backdoor':
            logger.backdoor(message);
            break;
        case 'warn':
            logger.warn(message);
            break;
        case 'error':
            logger.error(message);
            break;
        case 'fatal':
            logger.fatal(message);
            break;
        default:
            logger.warn(message);
            break;
    }
    res.status(200).end();
}));
module.exports = logsRouter;
