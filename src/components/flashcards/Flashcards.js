import React, {Fragment, useContext, useEffect} from 'react';
import FlashcardContext from "../../context/flashcard/flashcardContext";
import FlashcardItem from "./FlashcardItem";
import Spinner from "../layout/Spinner";

const Flashcards = () => {
    const flashcardContext = useContext(FlashcardContext);

    const {flashcards, getFlashcards, loading, filtered} = flashcardContext;

    useEffect(() => {
        getFlashcards();
        // eslint-disable-next-line
    }, []);

    if (flashcards !== null && flashcards.length === 0 && !loading) {
        return (<h4>Brak fiszek</h4>);
    }

    return (
        <Fragment>
            {filtered !== null && filtered.length !== 0
                ? filtered.map(flashcard => <FlashcardItem key={flashcard.id} flashcard={flashcard}/>)
                : flashcards !== null && !loading
                    ? flashcards.map(flashcard => <FlashcardItem key={flashcard.id} flashcard={flashcard}/>)
                    : <Spinner/>}
        </Fragment>
    )
};

export default Flashcards;