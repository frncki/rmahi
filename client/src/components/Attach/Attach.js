/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
import Button from '../Button/Button';
import * as React from 'react';
import AppDataContext from "../../context/AppDataContext";

const Attach = () => {
    const filesContext = React.useContext(AppDataContext);
    const inputRef = React.useRef(null);
    const formRef = React.useRef(null);

    const handleClick = () => inputRef && inputRef.current && inputRef.current.click();
    const handleFiles = async (e) => filesContext.setFiles(e.target.files ? Array.from(e.target.files) : []);

    return (
        <form ref={formRef}>
            <Button type="attach" handleAction={handleClick} />
            <input type="file" ref={inputRef} onChange={handleFiles} style={{ display: 'none' }} multiple accept="image/*" />
        </form>
    );
}

export default Attach;