/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
import Button from '../Button/Button';
import React from 'react';
import AppDataContext from "../../context/AppDataContext";
import axios from 'axios';

const Download = () => {
    const appContext = React.useContext(AppDataContext);

    const handleSubmit = async (e) => {
        console.log(appContext.id)
        axios.get(`api/images/base64/${appContext.id}`)
            .then(data => appContext.setMessage(data.data.message))
            .catch((error) => appContext.setMessage('Error'));
    }

    return (
        <Button type="download" handleAction={handleSubmit} />
    );
}

export default Download;