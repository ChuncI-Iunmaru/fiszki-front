import React, { useContext } from 'react';
import getSubscriprionDateFromString from "../../utils/getSubscriprionDateFromString";
import PropTypes from 'prop-types';
import SetItem from "../sets/SetItem";
import SubscriptionContext from "../../context/subscription/subscriptionContext";
import { withRouter } from 'react-router-dom';
import StudyContext from "../../context/study/studyContext";

const SubscriptionItem = ({ subscription, subscribedView = false, history }) => {
    const subscriptionContext = useContext(SubscriptionContext);
    const studyContext = useContext(StudyContext);

    const {setCurrentId, clearCurrentId, unsubscribe} = subscriptionContext;
    const {clearTestResults } = studyContext;

    const { id, user,  flashcardSet, learnedFlashcards, scores, subscriptionDate, secondBox} = subscription;
    const {testAttempts, testAccessible, flashcards } = flashcardSet;


    const onUnsub = () => {
        unsubscribe(id);
        clearCurrentId();
    };

    const onStudy = () => {
        clearTestResults();
        // Ustaw id żeby móc później załadować sesję
        setCurrentId(id);
        //Przejdź do strony sesji
        history.push("/studySession");
    };

    const onTest = () => {
        clearTestResults();
        setCurrentId(id);
        history.push("/finalTest");
    };

    let viewed = (secondBox.length/flashcards.length*100);

    let progress = (learnedFlashcards.length/flashcards.length*100);

    let ONE_SESSION_A_DAY = true;

    const renderStudyButton = () => {
        if (progress === 100) {
            //Sprawdź czy nie 100% nauki => jak 100%, zablokuj guzik
            return <button className="btn btn-light btn-sm">Nauka zakończona</button>
            //Sprawdź czy one session a day włączone => nie, daj guzik uczenia
        } else if (ONE_SESSION_A_DAY) {
            //Jeżeli włączone, sprawdź datę => jeżeli inna od ostatniej sesji, włącz guzik,
            const today = new Date();
            const formattedDate = today.getDate().toLocaleString('en', {minimumIntegerDigits:2, maximumSignificantDigits:2}) + "." + today.getMonth()+1 + "." + today.getFullYear();
            if (formattedDate !== getSubscriprionDateFromString(subscriptionDate)) {
                return <button className="btn btn-success btn-sm" onClick={onStudy}>Ucz się</button>
            } else return <button className="btn btn-light btn-sm">Sesja skończona</button>;
            // inaczej daj koniec nauki na dziś
        } else return <button className="btn btn-success btn-sm" onClick={onStudy}>Ucz się</button>
    };

    const renderTestButton = () => {
        //Sprawdź czy są jeszcze podejścia
        if (testAttempts === 0 || testAttempts > scores.length){
            //Sprawdź czy zawsze dostępny
            //Jeżeli nie, sprawdź czy nauka skończona
            if (testAccessible === 'ALWAYS' || progress === 100) {
                return <button className="btn btn-dark btn-sm" onClick={onTest}>Test</button>
            } else return <button className="btn btn-light btn-sm">Test niedostępny</button>
        } else return <button className="btn btn-light btn-sm">Brak podejść</button>
    };

    return (
        <div className="card bg-light">
            {subscribedView && <SetItem set={flashcardSet} subscribedView={true}/>}
            { subscribedView &&
            <p>
                {renderStudyButton()}
                {renderTestButton()}
                <button className="btn btn-sm btn-danger"  style={{float: 'right'}} onClick={onUnsub}>Wypisz się</button>
            </p>
            }
            <br></br>
            <h3 className="text-primary text-center">{!subscribedView && user.username}</h3>
            <h4 className="text-dark text-left">Ostatnia sesja: {getSubscriprionDateFromString(subscriptionDate)}</h4>
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
                {scores.map(score => <li>{score.score}%</li>)}
            </ul>
        </div>
    )
};

SubscriptionItem.propTypes = {
    subscription: PropTypes.object.isRequired,
    subscribedView: PropTypes.bool,
};

export default withRouter(SubscriptionItem);