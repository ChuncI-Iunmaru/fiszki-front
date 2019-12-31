import React, {useContext, useEffect} from 'react';
import AuthContext from "../../../context/auth/authContext";
import StudyContext from "../../../context/study/studyContext";
import Spinner from "../../layout/Spinner";
import TestResultsList from "../../study/TestResultsList";
import FinalTest from "../../study/FinalTest";

const FinalTestPage = () => {
    const authContext = useContext(AuthContext);
    const studyContext = useContext(StudyContext);

    const {testResults, loading} = studyContext;

    useEffect(() => {
        console.log('Odświeżam');
        authContext.loadUser();
        //Jeżeli nie ma currentSession redirect do zapisanych zestawów
        // eslint-disable-next-line
    }, []);

    if (loading) {
        return <Spinner/>
    }

    return (
        <div>
            {// To widoczne jak nie ma jeszcze wyników testu
                (testResults === null) && <FinalTest/>}
            {testResults !== null && <TestResultsList/>}
        </div>
    )
};

export default FinalTestPage;