"use strict";
exports.__esModule = true;
exports.ProductModel = exports.productSchema = void 0;
var mongoose_1 = require("mongoose");
exports.productSchema = new mongoose_1["default"].Schema({
    name: {
        type: String,
        required: [true, 'product name must be provided']
    },
    price: {
        type: Number,
        required: [true, 'product price must be provided']
    },
    featured: {
        type: Boolean,
        "default": false
    },
    rating: {
        type: Number,
        "default": 4.5
    },
    createdAt: {
        type: Date,
        "default": Date.now()
    },
    company: {
        type: String,
        "enum": {
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: '{VALUE} is not supported'
        }
    }
});
exports.ProductModel = mongoose_1["default"].model('Product', exports.productSchema);
