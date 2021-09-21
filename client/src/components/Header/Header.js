import './Header.css'

const Header = () => {


  return (
    <div className="header-body">
      <div className="perspective-text">
        <div className="perspective-line">
          <p></p>
          <p>Usunę</p>
        </div>
        <div className="perspective-line">
          <p>Usunę</p>
          <p>Ci chętnie</p>
        </div>
        <div className="perspective-line">
          <p>Ci chętnie</p>
          <p>WSZYSTKIE</p>
        </div>
        <div className="perspective-line">
          <p>WSZYSTKIE</p>
          <p>Metadane</p>
        </div>
        <div className="perspective-line">
          <p>Metadane</p>
          <p></p>
        </div>
      </div>
    </div>
  );
}

export default Header;