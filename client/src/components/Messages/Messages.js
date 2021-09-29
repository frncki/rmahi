import './Messages.css';
import * as React from 'react';
import AppDataContext from "../../context/AppDataContext";

const Messages = () => {
    const appContext = React.useContext(AppDataContext);

    return (
        <div className="card-body">
            <div className={`card ${appContext.status}`}>
                <p className="message">{appContext.message}</p>
                <ul className="check-list">
                    {appContext.files.map((file, index) => <React.Fragment key={index}><li>{file.name}</li></React.Fragment>)}
                </ul>
            </div>
        </div>
    );
}

export default Messages;