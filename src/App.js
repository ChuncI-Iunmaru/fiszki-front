import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Navbar from "./components/layout/Navbar";
import AuthState from "./context/auth/AuthState";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import AlertState from "./context/alert/AlertState";
import Alerts from "./components/layout/Alerts";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./components/routing/PrivateRoute";
import FlashcardState from "./context/flashcard/FlashcardState";
import SetState from "./context/flashcardSet/SetState";
import BrowseSets from "./components/pages/BrowseSets";
import EditSet from "./components/pages/EditSet";
import Subscription from "./components/pages/Subscription";
import SubscriptionState from "./context/subscription/SubscriptionState";
import './App.css';

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    return (
        <AuthState>
            <AlertState>
                <SetState>
                    <FlashcardState>
                        <SubscriptionState>
                            <Router>
                                <Fragment>
                                    <Navbar/>
                                    <div className="container">
                                        <Alerts/>
                                        <Switch>
                                            <PrivateRoute exact path='/' component={Home}/>
                                            <PrivateRoute exact path='/sets' component={BrowseSets}/>
                                            <PrivateRoute exact path='/editSet' component={EditSet}/>
                                            <PrivateRoute exact path='/subscription' component={Subscription}/>
                                            <Route exact path='/about' component={About}/>
                                            <Route exact path='/register' component={Register}/>
                                            <Route exact path='/login' component={Login}/>
                                        </Switch>
                                    </div>
                                </Fragment>
                            </Router>

                        </SubscriptionState>
                    </FlashcardState>
                </SetState>
            </AlertState>
        </AuthState>
    );
};

export default App;
