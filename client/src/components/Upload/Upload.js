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

    const handleSubmit = async (e) => {
        e.preventDefault();
        for (const image of appContext.files) {
            const base64 = await createBase64Image(image);
            setBase64Files(base64Files => base64Files.concat({
                base64Image: base64,
                fileName: image.name
            }));
        }
        if (base64Files.length > 0) {
            axios.post('api/images/base64', {
                id: appContext.id,
                base64Files: base64Files
            })
                .then(data => appContext.setMessage(data.data.message))
                .catch((error) => appContext.setMessage('Error'));
            setBase64Files([]);
        }
    }

    return (
        <Button type="upload" handleAction={handleSubmit} />
    );
}

export default Upload;