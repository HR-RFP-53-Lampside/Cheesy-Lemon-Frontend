/* eslint-disable import/no-unresolved */
import React, { useContext, useState } from 'react';
import {
  Paper, Box, Typography, TextField, Button, IconButton, Container, Hidden,
} from '@material-ui/core';
import Image from 'material-ui-image';
import { Link } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import SpacingDesign from '../context/design/SpacingDesign';
import LogStatus from '../context/auth/LogStatus';
import backgroundBG from '../../assets/lowpoly.png';

const LoginStart = () => {
  const themeDesign = useTheme();
  // eslint-disable-next-line no-unused-vars
  const [logStatus, setLogStatus] = useContext(LogStatus);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userMessage, setUserMessage] = useState('');

  const validationMessage = (message) => {
    if (message === 'auth/wrong-password') {
      setUserMessage('Wrong password');
    } else if (message === 'auth/user-not-found') {
      setUserMessage('User not found');
    } else {
      setUserMessage('Something went wrong');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    firebase.auth().signInWithEmailAndPassword(username, password)
      .then((userCredential) => {
        const { user } = userCredential;
        firebase.database().ref(`users/${user.uid}`).on('value', (snap) => {
          setLogStatus(snap.val());
        });
      })
      .catch((error) => {
        validationMessage(error.code);
        throw error;
      });
  };

  const OAuthLogin = (provider) => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        // eslint-disable-next-line no-unused-vars
        const { credential, user } = result;
        // const { accessToken } = credential;
        firebase.database().ref(`users/${user.uid}`).on('value', (snap) => {
          if (!snap.val()) {
            const dbUser = {
              dietaryPrefs: '',
              email: user.email,
              favRecipes: {},
              firstName: '',
              lastName: '',
              pantry: {},
              photoURL: user.photoURL || '',
              username: user.displayName || user.email.split('@')[0],
              yummyPoints: 0,
            };
            firebase.database().ref(`users/${user.uid}`).set(dbUser).catch((error) => new Error(error));
          }
          setLogStatus(snap.val());
        });
      })
      .catch((error) => {
        const {
          code,
          message,
          email,
          credential,
        } = error;
        console.log(code, message, email, credential);
      });
  };

  return (
    <Box display="flex">
      <Hidden mdDown>
        <Paper
          style={{
            flexBasis: '40%',
            flexGrow: 0.5,
            height: 'calc(90vh + 3.5em)',
            overflow: 'hidden',
            borderRadius: '0',
          }}
          elevation={20}
        >
          <Image
            src={backgroundBG}
            cover
            imageStyle={{ width: '100%', height: '100%', overflow: 'hidden' }}
            style={{ height: '100%' }}
          />
        </Paper>
      </Hidden>
      <Container
        maxWidth="sm"
        style={{
          flexGrow: 1, flexBasis: '20%', alignSelf: 'center', maxHeight: '90vh',
        }}
      >
        <Typography variant="h2" align="center" style={{ color: themeDesign.custom.muted.grey }}>
          Login
        </Typography>
        <Typography variant="h5" align="center" style={{ color: themeDesign.custom.muted.grey }}>
          Stay elevated
        </Typography>
        <Paper elevation={3} style={{ ...SpacingDesign.margin(3), ...SpacingDesign.padding(3) }}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              helperText="email@mail.com"
              variant="filled"
              type="email"
              required
              style={{ width: '100%' }}
              onChange={(event) => setUsername(event.target.value)}
            />
            <TextField
              label="Password"
              helperText="account password"
              variant="filled"
              required
              inputProps={{ minLength: 3 }}
              type="password"
              style={{ width: '100%' }}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Box align="right">
              <Button
                variant="contained"
                color="primary"
                style={{ ...SpacingDesign.paddingx(5), ...SpacingDesign.marginy(2) }}
                type="submit"
                align="right"
              >
                <Typography color="textPrimary">
                  ELEVATE
                </Typography>
              </Button>
            </Box>
          </form>
          { userMessage
            ? (
              <Box bgcolor="warning.main" align="center" borderRadius={5} style={SpacingDesign.padding(1)}>
                <Typography color="textPrimary">
                  {userMessage}
                </Typography>
              </Box>
            )
            : null}
          <Typography style={{
            color: themeDesign.custom.muted.grey,
            ...SpacingDesign.marginTop(1),
            ...SpacingDesign.marginLeft(1),
          }}
          >
            Elevate with our partners
          </Typography>
          <Box display="flex">
            <IconButton
              aria-label="social media"
              className="fab fa-facebook"
              onClick={() => OAuthLogin(new firebase.auth.FacebookAuthProvider())}
              style={{
                ...SpacingDesign.padding(2),
                fontSize: 32,
                ...themeDesign.custom.facebook,
              }}
            />
            <IconButton
              aria-label="social media"
              className="fab fa-google"
              onClick={() => OAuthLogin(new firebase.auth.GoogleAuthProvider())}
              style={{
                ...SpacingDesign.padding(2),
                fontSize: 32,
                ...themeDesign.custom.google,
                ...SpacingDesign.marginx(3),
              }}
            />
            <IconButton
              aria-label="social media"
              className="fab fa-twitter"
              onClick={() => OAuthLogin(new firebase.auth.TwitterAuthProvider())}
              style={{
                ...SpacingDesign.padding(2),
                fontSize: 32,
                ...themeDesign.custom.twitter,
              }}
            />
          </Box>
          <Button component={Link} to="../register">
            <Typography style={{ color: themeDesign.palette.info.light }}>
              Not elevated? Join us!
            </Typography>
          </Button>
        </Paper>

      </Container>
    </Box>
  );
};

export default LoginStart;
