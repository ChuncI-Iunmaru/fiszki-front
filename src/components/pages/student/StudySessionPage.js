import React, { useContext, useEffect } from 'react';
import AuthContext from "../../../context/auth/authContext";
import StudyFlashcards from "../../study/StudyFlashcards";

const StudySessionPage = () => {
    const authContext = useContext(AuthContext);

    useEffect(() => {
        console.log('Odświeżam');
        authContext.loadUser();
        // eslint-disable-next-line
    }, []);

    return (
        <div>

            <StudyFlashcards/>
            <button className="btn btn-block btn-success">Następny krok</button>
        </div>
    )
};

export default StudySessionPage;