import React, { useContext, useEffect } from 'react';
import AuthContext from "../../../context/auth/authContext";
import SetForm from "../../sets/SetForm";
import Flashcards from "../../flashcards/Flashcards";
import FlashcardFilter from "../../flashcards/FlashcardFilter"

const EditSet = () => {
    const authContext = useContext(AuthContext);

    useEffect(() => {
        console.log('Odświeżam');
        authContext.loadUser();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="grid-2">
            <div>
                <SetForm/>
            </div>
            <div>
                <FlashcardFilter/>
                <Flashcards checkOnly={true}/>
            </div>
        </div>
    )
};

export default EditSet;