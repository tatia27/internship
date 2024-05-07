import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/userContext";
import profile from "./../../../assets/icons/profileHeader.svg";
import logo from "./../../../assets/icons/logo.svg";
import "./headerIntern.css";

function HeaderIntern() {
  let navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const logout = () => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
    }
    if (setUser) {
      setUser(null);
    }
    navigate("/");
  };

  const navigateToProfile = () => {
    navigate("/intern/profile");
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__menu">
          <Link to="/">
            <img src={logo} alt="Логотип" />
          </Link>
          <div className="header__nav__intern">
            <ul>
              <li>
                <NavLink
                  to="/intern/my-applications"
                  className="header__nav__item"
                >
                  Мои заявки
                </NavLink>
              </li>
              <li>
                <NavLink to="/intern/internships" className="header__nav__item">
                  Стажировки
                </NavLink>
              </li>
              <li>
                <Link to={`/`} className="header__nav__item" onClick={logout}>
                  Выйти
                </Link>
              </li>
            </ul>
            <img src={profile} alt="Профиль" onClick={navigateToProfile}></img>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderIntern;
