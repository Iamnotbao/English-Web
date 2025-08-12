"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToCloudinary = uploadToCloudinary;
const cloudinary_1 = require("cloudinary");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
cloudinary_1.v2.config({
    cloud_name: 'dko7da9fu',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});
function uploadToCloudinary(buffer) {
    return new Promise((resolve, reject) => {
        const stream = cloudinary_1.v2.uploader.upload_stream({ folder: 'lessons' }, (error, result) => {
            if (error)
                return reject(error);
            if (!result || !result.secure_url)
                return reject(new Error("Upload failed, no URL returned"));
            resolve(result.secure_url);
        });
        stream.end(buffer);
    });
}
exports.default = cloudinary_1.v2;
