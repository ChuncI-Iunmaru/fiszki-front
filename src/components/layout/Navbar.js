import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import authContext from "../../context/auth/authContext";

const Navbar = ({ title, icon }) => {
    const AuthContext = useContext(authContext);

    const { isAuthenticated, logout, user } = AuthContext;

    const onLogout = () => {
        logout();
    };

    const authLinks = (
      <Fragment>
          <li>Witaj { user && user.username} </li>
          <li>
              <a onClick={onLogout} href="#!"><i className="fas fa-sign-out-alt"></i><span className="hide-sm">Wyloguj</span></a>
          </li>
      </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <li>
                <Link to="/login">Zaloguj</Link>
            </li>
            <li>
                <Link to="/register">Nowe konto</Link>
            </li>
        </Fragment>
    );

    return (
        <div className="navbar bg-primary">
            <h1>
                <i className={icon}/> {title}
            </h1>
            <ul>
                {isAuthenticated ? authLinks : guestLinks}
            </ul>
        </div>
    )
};

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string
};

Navbar.defaultProps = {
    title: "Fiszki",
    icon: 'fas fa-id-card-alt'
};

export default Navbar;