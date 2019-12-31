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
import BrowseMySets from "./components/pages/teacher/BrowseMySets";
import EditSet from "./components/pages/teacher/EditSet";
import Subscription from "./components/pages/teacher/Subscription";
import SubscriptionState from "./context/subscription/SubscriptionState";
import BrowseFlashcardsFromSet from "./components/pages/student/BrowseFlashcardsFromSet";
import BrowseMyFlashcards from "./components/pages/teacher/BrowseMyFlashcards";
import SubscribeToSet from "./components/pages/student/SubscribeToSet";
import BrowseAllSets from "./components/pages/student/BrowseAllSets";
import BrowseMySubscriptions from "./components/pages/student/BrowseMySubscriptions";
import StudySessionPage from "./components/pages/student/StudySessionPage";
import StudyState from "./context/study/StudyState";
import FinalTestPage from "./components/pages/student/FinalTestPage";
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
                            <StudyState>
                                <Router>
                                    <Fragment>
                                        <Navbar/>
                                        <div className="container">
                                            <Alerts/>
                                            <Switch>
                                                <PrivateRoute exact path='/' component={Home}/>
                                                <PrivateRoute exact path='/sets' component={BrowseMySets}/>
                                                <PrivateRoute exact path='/allSets' component={BrowseAllSets}/>
                                                <PrivateRoute exact path='/editSet' component={EditSet}/>
                                                <PrivateRoute exact path='/subscription' component={Subscription}/>
                                                <PrivateRoute exact path='/mySubscriptions' component={BrowseMySubscriptions}/>
                                                <PrivateRoute exact path='/myFlashcards' component={BrowseMyFlashcards}/>
                                                <PrivateRoute exact path='/setFlashcards' component={BrowseFlashcardsFromSet}/>
                                                <PrivateRoute exact path='/subscribeForm' component={SubscribeToSet}/>
                                                <PrivateRoute exact path='/studySession' component={StudySessionPage}/>
                                                <PrivateRoute exact path='/finalTest' component={FinalTestPage}/>
                                                <Route exact path='/about' component={About}/>
                                                <Route exact path='/register' component={Register}/>
                                                <Route exact path='/login' component={Login}/>
                                            </Switch>
                                        </div>
                                    </Fragment>
                                </Router>
                            </StudyState>
                        </SubscriptionState>
                    </FlashcardState>
                </SetState>
            </AlertState>
        </AuthState>
    );
};

export default App;
