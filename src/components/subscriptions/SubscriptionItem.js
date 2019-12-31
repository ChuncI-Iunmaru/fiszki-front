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
    const { getStudySession, getFinalTest, clearTestResults } = studyContext;

    const { id, user,  flashcardSet, learnedFlashcards, scores, subscriptionDate} = subscription;

    const onUnsub = () => {
        unsubscribe(id);
        clearCurrentId();
    };

    const onStudy = () => {
        clearTestResults();
        setCurrentId(id);
        // Pobierz i załaduj sesję
        getStudySession(id);
        //Przejdź do strony sesji
        history.push("/studySession");
    };

    const onTest = () => {
        clearTestResults();
        setCurrentId(id);
        getFinalTest(id);
        history.push("/finalTest");
    };

    let progress = (learnedFlashcards.length/flashcardSet.flashcards.length*100);

    return (
        <div className="card bg-light">
            {subscribedView && <SetItem set={flashcardSet} subscribedView={true}/>}
            { subscribedView &&
            <p>
                {progress !==100
                    ? <button className="btn btn-success btn-sm" onClick={onStudy}>Ucz się</button>
                    : <button className="btn btn-light btn-sm">Nauka zakończona</button>}
                <button className="btn btn-dark btn-sm" onClick={onTest}>Test</button>
                <button className="btn btn-sm btn-danger"  style={{float: 'right'}} onClick={onUnsub}>Wypisz się</button>
            </p>
            }
            <br></br>
            <h3 className="text-primary text-center">{!subscribedView && user.username}</h3>
            <h4 className="text-dark text-left">Zapisany: {getSubscriprionDateFromString(subscriptionDate)}</h4>
            <h4 className="text-dark text-left">
                Postęp nauki: {learnedFlashcards.length}/{flashcardSet.flashcards.length}{' '}
                { progress=== 100
                    ? <span style={{ color: 'green'}}>({progress})%</span>
                    : <span>({progress})%</span>}
            </h4>
            <h4 className="text-dark text-left">Wyniki testów: </h4>
        </div>
    )
};

SubscriptionItem.propTypes = {
    subscription: PropTypes.object.isRequired,
    subscribedView: PropTypes.bool,
};

export default withRouter(SubscriptionItem);