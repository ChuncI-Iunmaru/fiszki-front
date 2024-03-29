import React, {Fragment, useContext} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import authContext from "../../context/auth/authContext";
import FlashcardContext from "../../context/flashcard/flashcardContext";
import SetContext from "../../context/flashcardSet/setContext";

const Navbar = ({title, icon}) => {
    const AuthContext = useContext(authContext);
    const flashcardContext = useContext(FlashcardContext);
    const setContext = useContext(SetContext);

    const {isAuthenticated, logout, user} = AuthContext;
    const {clearFlashcards} = flashcardContext;

    const onLogout = () => {
        logout();
        setContext.clearSets();
        clearFlashcards();
    };

    const authLinks = (
        <Fragment>
            <li>Witaj {user && user.username} </li>
            <li>
                <Link to="/myFlashcards">Fiszki</Link>
            </li>
            <li>
                <Link to="/sets">Zestawy</Link>
            </li>
            <li>
                <a onClick={onLogout} href="#!"><i className="fas fa-sign-out-alt"></i><span
                    className="hide-sm">Wyloguj</span></a>
            </li>
        </Fragment>
    );

    const studentLinks = (
        //Dodać tu też witaj i wyloguj
        <Fragment>
            <li>Witaj {user && user.username} </li>
            <li>
                <Link to="/allSets">Zapisz się</Link>
            </li>
            <li>
                <Link to="/mySubscriptions">Moje zestawy</Link>
            </li>
            <li>
                <a onClick={onLogout} href="#!"><i className="fas fa-sign-out-alt"></i><span
                    className="hide-sm">Wyloguj</span></a>
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

    const renderLinks = () => {
        if (isAuthenticated && user !== null) {
            if (user.role === "student") return studentLinks;
            else return authLinks;
        } else return guestLinks
    };

    return (
        <div className="navbar bg-primary">
            <h1>
                {title}
            </h1>
            <ul>
                {renderLinks()}
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