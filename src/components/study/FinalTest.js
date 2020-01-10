import React, {useContext, useState, useEffect} from 'react';
import StudyContext from "../../context/study/studyContext";
import SubscriptionContext from "../../context/subscription/subscriptionContext";
import TestQuestion from "./TestQuestion";
import TestTimer from "./TestTimer";

const FinalTest = () => {
    const studyContext = useContext(StudyContext);
    const subscriptionContext = useContext(SubscriptionContext);

    const {currentTest, getFinalTestResults, clearTest} = studyContext;

    const {questions, time} = currentTest;

    const [questionsState, setQuestionsState] = useState([]);

    useEffect(() => {
        setQuestionsState(questions);
        // eslint-disable-next-line
    }, []);

    const onQuestionsChange = (id, value) => {
        const copyQuestions = questionsState.slice();
        copyQuestions.forEach(question => {
            if (question.flashcardId === id) {
                question.givenAnswer = value;
            }
        });
        setQuestionsState(copyQuestions);
    };

    const onCheckResults = () => {
        getFinalTestResults(currentTest, questionsState, subscriptionContext.currentId);
        clearTest();
    };

    return (
        <div>
            <h3 className="text-primary">Sprawdź wiedzę:</h3>
            {time !== 0 && <TestTimer time={time} onCountdownEnd={onCheckResults}/>}
            <div className="grid-2">
                {questionsState.map(question => <TestQuestion testQuestion={question} onAnswerChange={onQuestionsChange} key={question.flashcardId}/>)}
            </div>
            <button className="btn btn-block btn-success" onClick={onCheckResults}>Sprawdź wyniki</button>
        </div>
    )
};

export default FinalTest;