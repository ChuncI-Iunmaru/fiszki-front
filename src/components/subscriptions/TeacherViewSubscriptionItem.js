import React, {useContext} from 'react';
import SetContext from "../../context/flashcardSet/setContext";
import formatDate from "../../utils/formatDate";

const TeacherViewSubscriptionItem = ({subscription}) => {
    const setContext = useContext(SetContext);
    const { current: { flashcards }} = setContext;

    const { user, learnedFlashcards, scores, subscriptionDate, secondBox} = subscription;

    let viewed = (secondBox.length/flashcards.length*100);
    let progress = (learnedFlashcards.length/flashcards.length*100);

    return (
        <div className="card bg-light">
            <h3 className="text-primary text-center">{user.username}</h3>
            <h4 className="text-dark text-left">Ostatnia sesja: {formatDate(subscriptionDate)}</h4>
            <h4 className="text-dark text-left">
                Przejrzane fiszki: {secondBox.length}/{flashcards.length}{' '}
                { viewed=== 100
                    ? <span style={{ color: 'green'}}>({viewed})%</span>
                    : <span>({viewed})%</span>}
            </h4>
            <h4 className="text-dark text-left">
                Nauczone fiszki: {learnedFlashcards.length}/{flashcards.length}{' '}
                { progress=== 100
                    ? <span style={{ color: 'green'}}>({progress})%</span>
                    : <span>({progress})%</span>}
            </h4>
            <h4 className="text-dark text-left">Wyniki testów: </h4>
            <ul className="list">
                {scores.map(score => <li>{formatDate(score.testDate)}: {score.score}%</li>)}
            </ul>
        </div>
    )
};

export default TeacherViewSubscriptionItem;