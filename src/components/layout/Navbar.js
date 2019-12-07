import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const Navbar = ({ title, icon }) => {
    return (
        <div className="navbar bg-primary">
            <h1>
                <i className={icon}/> {title}
            </h1>
            <ul>
                <li>
                    <Link to="/">Strona główna</Link>
                </li>
                <li>
                    <Link to="/about">O aplikacji</Link>
                </li>
                <li>
                    <Link to="/login">Zaloguj</Link>
                </li>
                <li>
                    <Link to="/register">Nowe konto</Link>
                </li>
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