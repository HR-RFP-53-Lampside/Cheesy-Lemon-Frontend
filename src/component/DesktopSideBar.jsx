/* eslint-disable import/no-unresolved */
import React, { useState, useContext } from 'react';
import {
  Container, Card, Hidden, Button, Box, Avatar, Typography, Icon,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Kitchen, Group, Settings } from '@material-ui/icons/';
import firebase from 'firebase/app';
import 'firebase/auth';

import SpacingDesign from './context/design/SpacingDesign';
import LogStatus from './context/auth/LogStatus';

const DekstopSideBar = () => {
  const [setting, setSetting] = useState('');
  const [logStatus, setLogStatus] = useContext(LogStatus);

  return (
    <Hidden mdDown>
      <Container maxWidth="xs">
        <Card
          style={{
            ...SpacingDesign.marginTop(5),
            height: '100%',
          }}
        >
          <Box
            style={{
              ...SpacingDesign.height(15),
              ...SpacingDesign.padding(3),
            }}
            bgcolor="primary.main"
            display="flex"
          >
            <Avatar
              title="UserProfilePicture"
              src={logStatus && logStatus.photoURL}
              style={{
                height: '64px',
                width: '64px',
                alignSelf: 'center',
              }}
            />
            <Box style={{ alignSelf: 'center', ...SpacingDesign.marginLeft(2) }}>
              <Typography variant="h5">
                USERNAME
              </Typography>
              <Box display="flex">
                <Icon className="fas fa-cookie" />
                <Typography variant="subtitle1" style={{ alignSelf: 'center', ...SpacingDesign.marginLeft(1) }}>
                  100
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            style={{
              height: 'calc(90% - 120px)',
              justifyContent: 'space-between',
              ...SpacingDesign.paddingTop(4),
            }}
            display="flex"
            flexDirection="column"
          >
            <Button
              fullWidth
              style={{ justifyContent: 'flex-start', ...SpacingDesign.paddingy(3) }}
            >
              <Typography variant="h5">
                <Icon className="fas fa-heart" style={SpacingDesign.marginx(2)} />
                Favorites
              </Typography>
            </Button>
            <Button
              fullWidth
              style={{ justifyContent: 'flex-start', ...SpacingDesign.paddingy(3) }}
            >
              <Typography variant="h5">
                <Icon className="fas fa-utensils" style={SpacingDesign.marginx(2)} />
                {'What\'s for dinner'}
              </Typography>
            </Button>
            <Button
              fullWidth
              style={{ justifyContent: 'flex-start', ...SpacingDesign.paddingy(3) }}
            >
              <Typography variant="h5">
                <Icon className="fas fa-egg" style={SpacingDesign.marginx(2)} />
                Add Ingredients
              </Typography>
            </Button>
            <Button
              fullWidth
              style={{ justifyContent: 'flex-start', ...SpacingDesign.paddingy(3) }}
            >
              <Typography variant="h5">
                <Kitchen style={SpacingDesign.marginx(2)} />
                My Pantry
              </Typography>
            </Button>
            <Button
              fullWidth
              style={{ justifyContent: 'flex-start', ...SpacingDesign.paddingy(3) }}
            >
              <Typography variant="h5">
                <Group style={SpacingDesign.marginx(2)} />
                Social
              </Typography>
            </Button>
            <Button
              fullWidth
              style={{ justifyContent: 'flex-start', ...SpacingDesign.paddingy(3) }}
            >
              <Typography variant="h5">
                <Settings style={SpacingDesign.marginx(2)} />
                Settings
              </Typography>
            </Button>
            <Button
              fullWidth
              style={{ justifyContent: 'flex-start', ...SpacingDesign.paddingy(3) }}
              onClick={() => {
                firebase.auth().signOut()
                  .then(() => {
                    setLogStatus();
                    // history.push('/login');
                  });
              }}
            >
              <Typography variant="h5">
                <Icon className="fas fa-sign-out-alt" style={SpacingDesign.marginx(2)} />
                Signout
              </Typography>
            </Button>
          </Box>
        </Card>
      </Container>
    </Hidden>
  );
};

export default DekstopSideBar;
