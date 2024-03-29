import React, { useContext, useEffect } from 'react';
import authContext from "../../../context/auth/authContext";
import Flashcards from "../../flashcards/Flashcards";
import FlashcardForm from "../../flashcards/FlashcardForm";
import FlashcardFilter from "../../flashcards/FlashcardFilter";

const BrowseMyFlashcards = () => {
    const AuthContext = useContext(authContext);

    useEffect(() => {
        console.log('Odświeżam');
        AuthContext.loadUser();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="grid-2">
            <div>
                <FlashcardForm/>
            </div>
            <div>
                <FlashcardFilter/>
                <Flashcards checkOnly={false}/>
            </div>
        </div>
    )
};

export default BrowseMyFlashcards;