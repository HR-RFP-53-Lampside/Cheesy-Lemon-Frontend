/* eslint-disable import/no-unresolved */
import React, { useContext, useEffect, useState } from 'react';
import {
  Paper, Box, Typography, Avatar, Icon,
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import SpacingDesign from '../context/design/SpacingDesign';
import LogStatus from '../context/auth/LogStatus';
import UserProfileReviews from './UserProfileReviews';

const UserProfileStart = () => {
  const [logStatus] = useContext(LogStatus);
  const { profileId } = useParams();
  const [displayUser, setDisplayUser] = useState(logStatus);
  const [displayPrefs, setDisplayPrefs] = useState('');

  const setDiet = (account) => {
    const dietPref = account ? account.dietaryPrefs : '';
    const prefText = dietPref.split(/(?=[A-Z])/).map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    setDisplayPrefs(prefText);
  };

  useEffect(() => {
    if (profileId) {
      firebase.database().ref(`users/${profileId}`).once('value').then((snapshot) => {
        const profile = (snapshot.val() && snapshot.val());
        setDisplayUser(profile);
      });
    }
  }, [profileId]);

  useEffect(() => {
    if (displayUser) {
      setDiet(displayUser);
    }
  }, [displayUser]);

  useEffect(() => {
    if (logStatus) {
      setDiet(logStatus);
    }
  }, [logStatus]);

  return (
    <>
      <Paper>
        <Box display="flex" bgcolor="primary.main" style={SpacingDesign.padding(2)} borderRadius={3}>
          <Avatar
            title="UserProfilePicture"
            src={displayUser && displayUser.photoURL}
            style={{
              ...SpacingDesign.square(15),
              alignSelf: 'center',
            }}
          />
          <Box style={{ alignSelf: 'center', ...SpacingDesign.marginLeft(2), width: '100%' }}>
            <Typography variant="h4">
              {displayUser && `${displayUser.firstName} ${displayUser.lastName}`}
            </Typography>
            <Typography variant="h6" color="textPrimary">
              {displayUser && `@${displayUser.username}`}
            </Typography>
            <Box display="flex">
              <Icon className="fas fa-cookie" />
              <Typography variant="subtitle1" style={{ alignSelf: 'center', ...SpacingDesign.marginLeft(1) }} color="textPrimary">
                {displayUser && displayUser.yummyPoints}
              </Typography>
            </Box>
          </Box>
        </Box>
        {displayUser && (
        <Box style={SpacingDesign.padding(3)}>
          <Box>
            <Typography variant="h4">
              About Me
            </Typography>
            <Typography variant="body1">
              {displayUser.aboutMe || 'I eat food, whole of course'}
            </Typography>
          </Box>
          <Box style={SpacingDesign.marginTop(2)}>
            <Typography variant="h4">
              Dietary Preference
            </Typography>
            <Typography variant="body1">
              {displayPrefs || 'No preferences, a food enjoyer' }
            </Typography>
          </Box>
        </Box>
        )}
      </Paper>
      <Box style={SpacingDesign.marginTop(2)}>
        <Typography variant="h4" style={SpacingDesign.marginLeft(4)}>
          My reviews
        </Typography>
        <UserProfileReviews
          userId={profileId || displayUser.uid}
          userReviews={displayUser.myReviews}
        />
      </Box>
    </>
  );
};

export default UserProfileStart;
