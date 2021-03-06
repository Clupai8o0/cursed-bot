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
exports.findPlayerByName = exports.findPlayer = void 0;
const mongodb_1 = require("../mongodb");
const response_1 = __importDefault(require("../../lib/response"));
/**
 * Using the id provided, find the player in the database.
 * @param id {number | string} Discord user id
 * @returns null if not found, otherwise the player object
 */
const findPlayer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id)
        return;
    return findOne({ id });
});
exports.findPlayer = findPlayer;
/**
 * Using the name provided, find the player in the database.
 * @param name {string} player name ingame
 * @returns null if not found, otherwise the player object
 */
const findPlayerByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    if (!name)
        return;
    return yield findOne({ name });
});
exports.findPlayerByName = findPlayerByName;
/**
 * Refactored code
 * @param query {object} MongoDB query object
 * @returns Promise<Response>
 */
const findOne = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, mongodb_1.getDb)();
    try {
        const data = yield db.collection("players").findOne(query);
        return data
            ? (0, response_1.default)(true, "Player found", data)
            : (0, response_1.default)(true, "Player not found", data);
    }
    catch (err) {
        console.error(err);
        return (0, response_1.default)(false, "Error finding player", err.message);
    }
});
