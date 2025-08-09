import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
cloudinary.config({
    cloud_name:'dko7da9fu',
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
    secure: true
});
(async function(){
    const result = await cloudinary.uploader.upload('../images/test.png')
    console.log(result);
})();

export default cloudinary;