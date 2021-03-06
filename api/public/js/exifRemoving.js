import ExifTransformer from 'exif-be-gone';
import fs from "fs";
import path from 'path';

import { encodeImgName, decodeImgName } from './hashing';

const removeExif = (filePath, idDirName, newFileName, fileFormat) => {
    const newDirPath = path.join(process.env.OUTPUT_IMAGES, idDirName)
    const newFilePath = path.join(newDirPath, `${newFileName}.${fileFormat}`);

    const reader = fs.createReadStream(filePath);
    const writer = fs.createWriteStream(newFilePath);

    reader.pipe(new ExifTransformer()).pipe(writer);
}

const extractFileNameAndFormat = (file) => {
    const regexForFilePath = '(.*)\\.([^.]+)$';
    const regexMatches = file.match(regexForFilePath);

    return { fileName: regexMatches[1], fileFormat: regexMatches[2] };
}

const processImages = async (idDirName) => {
    let idDirPath = path.join(process.env.INPUT_IMAGES, idDirName)
    try {
        const filenames = await fs.promises.readdir(idDirPath);
        console.log("\nFilenames in directory:");
        filenames.forEach((fileNameAndFormat) => {
            const { fileName, fileFormat } = extractFileNameAndFormat(fileNameAndFormat);
            const filePath = path.join(idDirPath, fileNameAndFormat);
            const ciphertext = encodeImgName(fileName);

            removeExif(filePath, idDirName, ciphertext, fileFormat);

            const decipheredText = decodeImgName(ciphertext);
            console.log(`${decipheredText}.${fileFormat}`);
        });
    } catch (err) {
        console.error(err)
    }
}

export { processImages };