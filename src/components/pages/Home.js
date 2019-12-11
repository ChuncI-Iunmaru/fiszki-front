import React, { useContext, useEffect } from 'react';
import authContext from "../../context/auth/authContext";
import Flashcards from "../flashcards/Flashcards";

const Home = () => {
    const AuthContext = useContext(authContext);

    useEffect(() => {
        console.log('Odświeżam');
        AuthContext.loadUser();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="grid-2">
            <div>
                {/*Flashcard form*/}
            </div>
            <div>
                <Flashcards/>
            </div>
        </div>
    )
};

export default Home;