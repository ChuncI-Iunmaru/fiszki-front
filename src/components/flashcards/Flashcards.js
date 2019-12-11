import React, { Fragment, useContext } from 'react';
import FlashcardContext from "../../context/flashcard/flashcardContext";
import FlashcardItem from "./FlashcardItem";

const Flashcards = () => {
    const flashcardContext = useContext(FlashcardContext);

    const { flashcards } = flashcardContext;

    return (
        <Fragment>
            {flashcards.map(flashcard => <FlashcardItem key={flashcard.id} flashcard={flashcard}/>)}
        </Fragment>
    )
};

export default Flashcards;