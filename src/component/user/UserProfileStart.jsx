/* eslint-disable import/no-unresolved */
import React, { useContext } from 'react';
import {
  Paper, Box, Typography, Avatar, Icon,
} from '@material-ui/core';

import SpacingDesign from '../context/design/SpacingDesign';
import LogStatus from '../context/auth/LogStatus';

const UserProfileStart = () => {
  const [logStatus] = useContext(LogStatus);

  return (
    <Paper style={SpacingDesign.padding(2)}>
      <Box display="flex">
        <Avatar
          title="UserProfilePicture"
          src={logStatus && logStatus.photoURL}
          style={{
            ...SpacingDesign.square(15),
            alignSelf: 'center',
          }}
        />
        <Box style={{ alignSelf: 'center', ...SpacingDesign.marginLeft(2), width: '100%' }}>
          <Typography variant="h4">
            {logStatus && `${logStatus.firstName} ${logStatus.lastName}`}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            {logStatus && `@${logStatus.username}`}
          </Typography>
          <Box display="flex">
            <Icon className="fas fa-cookie" color="textsecondary" />
            <Typography variant="subtitle1" style={{ alignSelf: 'center', ...SpacingDesign.marginLeft(1) }} color="textSecondary">
              {logStatus && logStatus.yummyPoints}
            </Typography>
          </Box>
        </Box>
      </Box>
      {logStatus && (
        <>
          <Box style={SpacingDesign.marginTop(2)}>
            <Typography variant="h4">
              About Me
            </Typography>
            <Typography variant="body1">
              {logStatus.aboutMe || 'I eat food, whole of course'}
            </Typography>
          </Box>
          <Box style={SpacingDesign.marginTop(2)}>
            <Typography variant="h4">
              Dietary Preference
            </Typography>
            <Typography variant="body1">
              {logStatus.dietaryPrefs || 'No preferences, a food enjoyer'}
            </Typography>
          </Box>
          <Box style={SpacingDesign.marginTop(2)}>
            <Typography variant="h4">
              My reviews
            </Typography>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default UserProfileStart;
