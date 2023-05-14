"use strict";
exports.__esModule = true;
exports.connectDb = void 0;
var mongoose_1 = require("mongoose");
var connectDb = function (url) {
    return mongoose_1["default"].set('strictQuery', false), mongoose_1["default"].connect(url);
};
exports.connectDb = connectDb;
