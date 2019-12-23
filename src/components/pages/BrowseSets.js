import React, { useContext, useEffect } from 'react';
import AuthContext from "../../context/auth/authContext";
import SetContext from "../../context/flashcardSet/setContext";
import { withRouter } from 'react-router-dom';
import Sets from "../sets/Sets";
import SetFilter from "../sets/SetFilter";

const BrowseSets = (props) => {
    const authContext = useContext(AuthContext);
    const setContext = useContext(SetContext);

    const { clearCurrentSet } = setContext;

    useEffect(() => {
        console.log('Odświeżam');
        authContext.loadUser();
        // eslint-disable-next-line
    }, []);

    const onNewSet = () => {
        clearCurrentSet();
        props.history.push("/editSet");
    };

    return (
        <div>
            <div className="grid-2">
                <button className="btn-primary btn-block" onClick={onNewSet}>Nowy zestaw</button>
                <SetFilter/>
            </div>
            <Sets/>
        </div>
    )
};

export default withRouter(BrowseSets);