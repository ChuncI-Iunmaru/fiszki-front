import React, {useContext, useEffect} from 'react';
import FlashcardContext from "../../context/flashcard/flashcardContext";
import FlashcardStudentView from "../flashcards/FlashcardStudentView";
import authContext from "../../context/auth/authContext";
import Spinner from "../layout/Spinner";

const BrowseFlashcardsFromSet = () => {
    const flashcardContext = useContext(FlashcardContext);
    const AuthContext = useContext(authContext);

    const {flashcards, getFlashcards, loading} = flashcardContext;

    useEffect(() => {
        console.log('Odświeżam');
        AuthContext.loadUser();
        getFlashcards();
        // eslint-disable-next-line
    }, []);

    if (flashcards !== null && flashcards.length === 0 && !loading) {
        return (<h4>Brak fiszek</h4>);
    }


    // TODO Ten div może na środku
    return (
        <div className="grid-2">
            {flashcards !== null && !loading
                ? flashcards.map(flashcard => (<FlashcardStudentView key={flashcard.id} flashcard={flashcard}/>))
                : <Spinner/> }
        </div>
    )
};


export default BrowseFlashcardsFromSet;