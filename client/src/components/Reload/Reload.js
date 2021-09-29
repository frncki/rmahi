import Button from '../Button/Button';
//import AppDataContext from "../../context/AppDataContext";
const Reload = () => {
    //const appContext = React.useContext(AppDataContext);

    const handleClick = () => {
        window.location.reload();
    };

    return (
        <Button type="reload" handleAction={handleClick} />
    );
}

export default Reload;