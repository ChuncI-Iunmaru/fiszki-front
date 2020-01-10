import AuthContext from "../../../context/auth/authContext";
import SubscriptionContext from "../../../context/subscription/subscriptionContext";
import SubscriptionItem from "../../subscriptions/SubscriptionItem";
import Spinner from "../../layout/Spinner";
import React, {useEffect, useContext} from "react";
import StudyContext from "../../../context/study/studyContext";
import AlertContext from "../../../context/alert/alertContext";
import formatDate from "../../../utils/formatDate";

const BrowseMySubscriptions = () => {
    const authContext = useContext(AuthContext);
    const subscriptionContext = useContext(SubscriptionContext);
    const studyContext = useContext(StudyContext);
    const alertContext = useContext(AlertContext);

    const { subscriptions, getMySubscriptions, loading } = subscriptionContext;
    const { clearTestResults, clearCurrentSession, clearTest } = studyContext;

    useEffect(() => {
        console.log('Odświeżam');
        authContext.loadUser();
        getMySubscriptions();
        clearTestResults();
        clearCurrentSession();
        clearTest();
        const today = new Date();
        const formattedDate = today.getDate().toLocaleString('en', {minimumIntegerDigits:2, maximumSignificantDigits:2}) + "." + today.getMonth()+1 + "." + today.getFullYear();
        subscriptions.forEach(sub => {
            let progress = (sub.learnedFlashcards.length/sub.flashcardSet.flashcards.length*100);
            if (formattedDate !== formatDate(sub.subscriptionDate) && progress !== 100) {
                alertContext.setAlert(`Możesz uczyć się z zestawu ${sub.flashcardSet.title}!`, "primary", 10000)
            }
        });
        // eslint-disable-next-line
    }, []);

    if (subscriptions !== null && subscriptions.length === 0 && !loading) {
        return (<h4>Nie zapisano na żaden zestaw!</h4>)
    }

    return (
        <div className="grid-2">
            {subscriptions !== null && !loading
                ? subscriptions.map(subscription => (<SubscriptionItem key={subscription.id} subscription={subscription} subscribedView={true}/>))
                : <Spinner/>}
        </div>
    )
};

export default BrowseMySubscriptions;