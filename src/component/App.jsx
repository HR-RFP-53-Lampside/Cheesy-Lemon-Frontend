/* eslint-disable import/no-unresolved */
import React, { useState, useMemo, useEffect } from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import {
  CssBaseline, useMediaQuery, Container, Box,
} from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import PantryContext from './context/foodies/PantryContext';
import LogStatus from './context/auth/LogStatus';
import ThemeDesign from './context/design/ThemeDesign';
import SpacingDesign from './context/design/SpacingDesign';
import TopBar from './TopBar';
import BottomBar from './BottomBar';
import LoginStart from './login/LoginStart';
import RegisterStart from './register/RegisterStart';
import WhatsForDinnerStart from './foodcardlist/whatsfordinner/WhatsForDinnerStart';
import FavoritesStart from './foodcardlist/favorites/FavoritesStart';
import PantryStart from './foodcardlist/pantry/PantryStart';
import ReviewList from './social/review/ReviewList';
import ReviewFocus from './social/review/ReviewFocus';
import DekstopSideBar from './DesktopSideBar';
import SideBar from './SideBar';
import RecipeFeedStart from './social/recipefeed/RecipeFeedStart';
import UserProfileStart from './user/UserProfileStart';
import SettingsStart from './settings/SettingsStart';
import RecipeFocusStart from './recipe/RecipeFocusStart';

function App() {
  // Establish dark or light mode
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [darkMode, setDarkMode] = useState(false);
  const palleteType = darkMode ? 'dark' : 'light';
  const bgColor = darkMode ? grey[900] : grey[200];

  const [pantry, setPantry] = useState([]);
  const [logStatus, setLogStatus] = useState();
  // eslint-disable-next-line no-unused-vars
  const [sidebarShow, setSidebarShow] = useState(false);

  useEffect(() => {
    setDarkMode(prefersDarkMode);
  }, [prefersDarkMode]);

  useEffect(() => {
    if (!logStatus) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          firebase.database().ref(`users/${user.uid}`).on('value', (snap) => {
            setLogStatus(snap.val());
          });
        }
      });
    }
  }, [logStatus]);

  // create design for the project
  const themeDesign = useMemo(() => createTheme({
    ...ThemeDesign,
    palette: {
      ...ThemeDesign.palette,
      background: {
        default: bgColor,
      },
      type: palleteType,
    },
  }), [darkMode]);

  return (
    <Router>
      <ThemeProvider theme={themeDesign}>
        <PantryContext.Provider value={[pantry, setPantry]}>
          <LogStatus.Provider value={[logStatus, setLogStatus]}>
            <CssBaseline />
            <TopBar darkMode={darkMode} setDarkMode={setDarkMode} />
            <Switch>
              <Route exact path="/">
                {logStatus ? <Redirect push to="/pantry" /> : <Redirect to="/login" />}
              </Route>
              <Route exact path="/login">
                {logStatus ? <Redirect push to="/pantry" /> : <LoginStart />}
              </Route>
              <Route exact path="/register">
                {logStatus ? <Redirect push to="/pantry" /> : <RegisterStart />}
              </Route>
              <Box display="flex">
                {logStatus ? <Redirect push to="/pantry" /> : <Redirect to="/login" />}
                <SideBar sidebarShow={sidebarShow} setSidebarShow={setSidebarShow} />
                <DekstopSideBar />
                <Container maxWidth="sm" style={{ ...SpacingDesign.padding(3), marginBottom: '4em' }}>
                  <Route exact path="/favorites">
                    <FavoritesStart />
                  </Route>
                  <Route exact path="/wfd">
                    <WhatsForDinnerStart />
                  </Route>
                  <Route exact path="/pantry">
                    <PantryStart />
                  </Route>
                  <Route exact path="/addingredient">
                    add ingredient
                  </Route>
                  <Route exact path="/social">
                    <RecipeFeedStart />
                  </Route>
                  <Route exact path="/settings">
                    <SettingsStart />
                  </Route>
                  <Route exact path="/social/:reviewId">
                    social/reviewId
                  </Route>
                  <Route exact path="/profile">
                    <UserProfileStart />
                  </Route>
                  <Route path="/profile/:profileId">
                    <UserProfileStart />
                  </Route>
                  <Route exact path="/recipe/:recipeId">

                    <RecipeFocusStart />
                  </Route>
                  <Route exact path="/recipe/:recipeId/reviews">
                    <ReviewList />
                  </Route>
                  <Route exact path="/recipes/:recipeId/reviews/:reviewId">
                    <ReviewFocus />
                  </Route>
                  {/* More routes for later */}
                </Container>
              </Box>
            </Switch>
            {logStatus && <BottomBar sidebarShow={sidebarShow} setSidebarShow={setSidebarShow} />}
          </LogStatus.Provider>
        </PantryContext.Provider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
