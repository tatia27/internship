import { Link, NavLink } from "react-router-dom";
import logo from "./../../../assets/icons/logo.svg";
import "./header.css";

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header__menu">
          <Link to="/">
            <img src={logo} alt="Логотип" />
          </Link>
          <div className="header__nav">
            <ul>
              <li>
                <NavLink to="/internships" className="header__nav__item">
                  Стажировки
                </NavLink>
              </li>
              <li>
                <NavLink to="/registration" className="header__nav__item">
                  Регистрация
                </NavLink>
              </li>
              <li>
                <Link to="/login" className="header__nav-btn">
                  Вход
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
