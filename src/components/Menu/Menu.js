import "./Menu.css";
import closeIcon from "../../img/icons/close.png";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import profile from "../../img/profile.png";

import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

const Menu = ({ setMenuIsOpen }) => {
  const { isLoggedIn, logOutUser, user } = useContext(AuthContext);

  return (
    <div className="menu-container">
      <img
        className="close-icon"
        src={closeIcon}
        onClick={() => setMenuIsOpen(false)}
      />

      <div className="login-menu-container">
        <div className="superior">
          <div className="avatar-menu-login">
            {isLoggedIn ? (
              <Avatar
                alt=""
                src={user.profileImg}
                sx={{ width: 90, height: 90 }}
              />
            ) : (
              <Avatar alt="" sx={{ width: 45, height: 45 }} />
            )}
            <span>
              {isLoggedIn
                ? `Bem vindo ${user.name}`
                : "entre ou cadastre-se :)"}
            </span>
          </div>
          {isLoggedIn ? (
            <div className="login-buttons-container">
              <Link to="/user/signin">
                <Button
                  variant="contained"
                  onClick={() => {
                    logOutUser();
                    setMenuIsOpen(false);
                  }}
                >
                  sair
                </Button>
              </Link>
            </div>
          ) : (
            <div className="login-buttons-container">
              <Link to="/user/signin">
                <Button
                  variant="contained"
                  onClick={() => setMenuIsOpen(false)}
                >
                  entrar
                </Button>
              </Link>
              <Link to="/user/signup">
                <Button variant="outlined" onClick={() => setMenuIsOpen(false)}>
                  cadastrar
                </Button>
              </Link>
            </div>
          )}
        </div>

        <div className="button-company">
          <Link to="/company/signin">
            <Button
              variant="outlined"
              onClick={() => {
                logOutUser();
                setMenuIsOpen(false);
              }}
            >
              Cadastro/Login de empresa
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Menu;