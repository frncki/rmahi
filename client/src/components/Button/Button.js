/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
import './Button.css';
//import axios from 'axios';

const Button = ({ type }) => {

    const load = async (e) => {
        e.preventDefault();

        switch (type) {
            case "upload":
                // const response = await axios.post(`${process.env.REACT_APP_API_URL}images`, {
                //     images: 'foobar'
                // })
                // console.log(response.data)
                console.log('uploaded')
                break;
                
            case "download":
                // const response = await axios.get(`${process.env.REACT_APP_API_URL}images`)
                // console.log(response.data)
                console.log('downloaded')
                break;

            default:
                console.log('try once more, young padawan');
        }
    }

    return (
        <div className="btn-body">
            <span className="btn">
                <a
                    href="#"
                    className={`btn-a ${type}`}
                    onClick={load}
                >
                </a>
            </span>
        </div>
    );
}

export default Button;