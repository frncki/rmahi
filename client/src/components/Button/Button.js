/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
import './Button.css';

const Button = ({ type, handleAction }) => {

    return (
        <div className="btn-body">
            <span className="btn">
                <a
                    href="#"
                    className={`btn-a ${type}`}
                    onClick={handleAction}
                >
                </a>
            </span>
        </div>
    )
}

export default Button;