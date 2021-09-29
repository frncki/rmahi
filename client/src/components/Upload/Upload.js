/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
import Button from '../Button/Button';
import * as React from 'react';
import AppDataContext from "../../context/AppDataContext";
import axios from 'axios';

const Upload = () => {
    const appContext = React.useContext(AppDataContext);
    const [base64Files, setBase64Files] = React.useState([]);

    const createBase64Image = (file) => {
        const reader = new FileReader();
        return new Promise(function (resolve, reject) {
            reader.onload = function (event) {
                resolve(event.target.result)
            }
            reader.readAsDataURL(file);
        })
    }

    const convertImages = async () => {
        for (const image of appContext.files) {
            const base64 = await createBase64Image(image);
            setBase64Files(base64Files => base64Files.concat({
                base64Image: base64,
                fileName: image.name
            }));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await convertImages();
        if (base64Files.length > 0) {
            try {
                const { data } = await axios.post('api/images/base64', {
                    id: appContext.id,
                    base64Files: base64Files
                })
                appContext.setMessage(data.message);
                appContext.setStatus('download');
                setBase64Files([]);
            } catch (error) {
                console.error(error);
                appContext.setMessage('Error! Coś poszło nie tak :(');
                appContext.setStatus('error');
                appContext.setFiles([]);
            }
        }
    }

    return (
        <Button type="upload" handleAction={handleSubmit} />
    );
}

export default Upload;