import { v2 as cloudinary } from 'cloudinary';
import type { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary'
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
cloudinary.config({
    cloud_name: 'dko7da9fu',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});
export function uploadToCloudinary(buffer: Buffer): Promise<string> {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: 'lessons' },
            (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
                if (error) return reject(error);
                if (!result || !result.secure_url) return reject(new Error("Upload failed, no URL returned"));
                resolve(result.secure_url);
            }
        );
        stream.end(buffer);
    });
}


export default cloudinary;