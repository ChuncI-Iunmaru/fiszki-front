import React, { useContext } from 'react';
import StudyContext from "../../context/study/studyContext";
import FlashcardStudentView from "../flashcards/FlashcardStudentView";
import Spinner from "../layout/Spinner";

const StudyFlashcards = () => {
    const studyContext = useContext(StudyContext);

    const { currentSession, loading } = studyContext;

    const { flashcards } = currentSession;

    if (flashcards !== null && flashcards.length === 0 && !loading) {
        return (<h4>Brak fiszek w sesji!</h4>);
    }

    return (
        <div>
            <h3 className="text-primary">Krok 1: Przejrzyj i zapamiętaj fiszki</h3>
            <div className="grid-2">
                { flashcards !== null && !loading
                    ? flashcards.map(flashcard => <FlashcardStudentView key={flashcard.id} flashcard={flashcard}/>)
                    : <Spinner/>}
            </div>
        </div>
    )
};

export default StudyFlashcards;