import React, { useContext } from 'react';
import StudyContext from "../../context/study/studyContext";
import TestQuestionAnswer from "./TestQuestionAnswer";
import {Link} from "react-router-dom";

const TestResultsList = () => {
    const studyContext = useContext(StudyContext);

    const { testResults: {questions, score}} = studyContext;

    return (
        <div>
            <h3 className="text-primary">Krok 3: Wyniki</h3>
            {questions.map(question => <TestQuestionAnswer testQuestion={question} key={question.flashcardId}/>)}
            <h4 className="text-center text-primary">Twój wynik: {score}%</h4>
            <li className="btn btn-block btn-success text-center">
                <Link to="/mySubscriptions">OK</Link>
            </li>
        </div>
    )
};

export default TestResultsList;