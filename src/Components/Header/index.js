import logo from "../../Assets/Logo/logo.webp";
import "./style.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <img width={60} src={logo} alt="logo ChatDocEase" />

      <div className="content-navegar">
        <Link to="/Documentacao">
          <p className="navegar">Documentações</p>
        </Link>
        <p className="espaço">|</p>
        <Link to="/ChatIA">
          <p className="navegar">Fale com IA</p>
        </Link>
      </div>
    </div>
  );
};

export default Header;
