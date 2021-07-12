/* eslint-disable import/no-unresolved */
import React, { useState, useMemo } from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import {
  CssBaseline, useMediaQuery, Container,
} from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

import PantryContext from './context/foodies/PantryContext';
import LogStatus from './context/auth/LogStatus';
import ThemeDesign from './context/design/ThemeDesign';
import SpacingDesign from './context/design/SpacingDesign';
import TopBar from './TopBar';
import BottomBar from './BottomBar';
import LoginStart from './login/LoginStart';
import RegisterStart from './register/RegisterStart';

function App() {
  // Establish dark or light mode
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [darkMode, setDarkMode] = useState(prefersDarkMode);
  const palleteType = darkMode ? 'dark' : 'light';
  const bgColor = darkMode ? grey[900] : grey[200];

  const [pantry, setPantry] = useState({});
  const [logStatus, setLogStatus] = useState();

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
                {logStatus ? <Redirect push to="/wfd" /> : <Redirect to="/login" />}
              </Route>
              <Route exact path="/login">
                {logStatus ? <Redirect push to="/wfd" /> : <Redirect to="/login" />}
                <LoginStart />
              </Route>
              <Route exact path="/register">
                {logStatus ? <Redirect push to="/wfd" /> : null}
                <RegisterStart />
              </Route>
              <Container maxWidth="sm" style={{ ...SpacingDesign.padding(3), marginBottom: '4em' }}>
                {logStatus ? <Redirect push to="/wfd" /> : <Redirect to="/login" />}
                <Route exact path="/wfd">
                  {'what\'s for dinner'}
                </Route>
                <Route exact path="/pantry">
                  pantry
                </Route>
                <Route exact path="/social">
                  social
                </Route>
                <Route exact path="/social/:reviewId">
                  social/reviewId
                </Route>
                {/* More routes for later */}
              </Container>
            </Switch>
            {logStatus ? <BottomBar /> : null}
          </LogStatus.Provider>
        </PantryContext.Provider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
