"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieSchema = void 0;
const mongoose_1 = require("mongoose");
exports.MovieSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    director: { type: String, required: false },
    image: { type: String, required: false },
    releaseDate: { type: Date, required: false },
    duration: { type: Number, required: false },
    genre: { type: String, required: false },
    publishedYear: { type: Number, required: true },
}, { timestamps: true });
//# sourceMappingURL=movie.schema.js.map