import React, { useState, useContext, useEffect } from 'react';
import StudyContext from "../../context/study/studyContext";
import TestQuestion from "./TestQuestion";
import SubscriptionContext from "../../context/subscription/subscriptionContext";

const StudyTest = () => {
    const studyContext = useContext(StudyContext);
    const subscriptionContext = useContext(SubscriptionContext);

    const { currentSession, getStudyTestResults, clearCurrentSession } = studyContext;

    const {firstBox, secondBox, thirdBox} = currentSession;

    const [firstBoxState, setFirstBoxState] = useState([]);
    const [secondBoxState, setSecondBoxState] = useState([]);
    const [thirdBoxState, setThirdBoxState] = useState([]);


    useEffect(() => {
        setFirstBoxState(firstBox);
        setSecondBoxState(secondBox);
        setThirdBoxState(thirdBox);
        // eslint-disable-next-line
    }, []);

    const onFirstBoxChange = (id, value) => {
        const questions = firstBoxState.slice();
        questions.forEach(question => {
            if (question.flashcardId === id) {
                question.givenAnswer = value;
            }
        });
        setFirstBoxState(questions);
    };

    const onSecondBoxChange = (id, value) => {
        const questions = secondBoxState.slice();
        questions.forEach(question => {
            if (question.flashcardId === id) {
                question.givenAnswer = value;
            }
        });
        setSecondBoxState(questions);
    };

    const onThirdBoxChange = (id, value) => {
        const questions = thirdBoxState.slice();
        questions.forEach(question => {
            if (question.flashcardId === id) {
                question.givenAnswer = value;
            }
        });
        setThirdBoxState(questions);
    };

    const onCheckResults = () => {
        getStudyTestResults(currentSession, firstBoxState, secondBoxState, thirdBoxState, subscriptionContext.currentId);
    };

    return (
        <div>
            <h3 className="text-primary">Krok 2: Sprawdź wiedzę</h3>
            <div className="grid-2">
                {firstBoxState.map(question => <TestQuestion testQuestion={question} onAnswerChange={onFirstBoxChange} key={question.flashcardId}/>)}
                {secondBoxState.map(question => <TestQuestion testQuestion={question} onAnswerChange={onSecondBoxChange} key={question.flashcardId}/>)}
                {thirdBoxState.map(question => <TestQuestion testQuestion={question} onAnswerChange={onThirdBoxChange} key={question.flashcardId}/>)}
            </div>
            <button className="btn btn-block btn-success" onClick={onCheckResults}>Sprawdź wyniki</button>
        </div>
    )
};

export default StudyTest;