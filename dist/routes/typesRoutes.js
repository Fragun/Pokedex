"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TypesController_1 = __importDefault(require("../controllers/TypesController"));
const express = require('express');
const router2 = express.Router();
router2.get('/', TypesController_1.default);
exports.default = router2;
