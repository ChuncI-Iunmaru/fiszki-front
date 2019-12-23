import React, {useContext, useEffect} from 'react';
import FlashcardContext from "../../context/flashcard/flashcardContext";
import FlashcardStudentView from "../flashcards/FlashcardStudentView";
import authContext from "../../context/auth/authContext";
import Spinner from "../layout/Spinner";
import SetContext from "../../context/flashcardSet/setContext";

const BrowseFlashcardsFromSet = () => {
    const flashcardContext = useContext(FlashcardContext);
    const AuthContext = useContext(authContext);
    const setContext = useContext(SetContext);

    const {flashcards, getSetFlashcards, loading} = flashcardContext;
    const { current } = setContext;

    useEffect(() => {
        console.log('Odświeżam');
        AuthContext.loadUser();
        getSetFlashcards(current.id);
        // eslint-disable-next-line
    }, []);

    if (flashcards !== null && flashcards.length === 0 && !loading) {
        return (<h4>Brak fiszek</h4>);
    }


    // TODO Ten spinner może na środku
    return (
        <div>
            <h3 className="text-dark">Fiszki z zestawu: <span className="text-primary">{current.title}</span></h3>
            <div className="grid-2">
                {flashcards !== null && !loading
                    ? flashcards.map(flashcard => (<FlashcardStudentView key={flashcard.id} flashcard={flashcard}/>))
                    : <Spinner/> }
            </div>
        </div>
    )
};


export default BrowseFlashcardsFromSet;