import React, { useContext, useEffect, useState } from 'react';
import AuthContext from "../../../context/auth/authContext";
import StudyFlashcards from "../../study/StudyFlashcards";
import StudyTest from "../../study/StudyTest";
import StudyContext from "../../../context/study/studyContext";
import TestResultsList from "../../study/TestResultsList";
import Spinner from "../../layout/Spinner";
import SubscriptionContext from "../../../context/subscription/subscriptionContext";

const StudySessionPage = () => {
    const authContext = useContext(AuthContext);
    const studyContext = useContext(StudyContext);
    const subscriptionContext = useContext(SubscriptionContext);

    const { testResults, currentSession, loading, getStudySession } = studyContext;

    const [showFlashcards, setShowFlashcards] = useState(true);

    useEffect(() => {
        console.log('Odświeżam');
        authContext.loadUser();
        getStudySession(subscriptionContext.currentId);
        //Jeżeli nie ma currentSession redirect do zapisanych zestawów
        // eslint-disable-next-line
    }, []);

    const onGoToTest = () => {
        setShowFlashcards(false);
    };

    if (loading) {
        return <Spinner/>
    }

    return (
        <div>
            {showFlashcards && <StudyFlashcards/>}
            {showFlashcards && <button className="btn btn-block btn-success" onClick={onGoToTest}>Przejdź do testu</button>}
            {// To widoczne jak nie ma jeszcze wyników testu
                (!showFlashcards && testResults === null) && <StudyTest/>}
            {testResults !== null && <TestResultsList/>}
        </div>
    )
};

export default StudySessionPage;