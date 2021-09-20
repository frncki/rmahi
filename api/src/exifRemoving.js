import ExifTransformer from 'exif-be-gone';
import fs from "fs";

const removeExif = (filePath) => {
    const reader = fs.createReadStream(filePath)
    const writer = fs.createWriteStream('public/out.jpg')
    
    reader.pipe(new ExifTransformer()).pipe(writer)
}

export { removeExif };