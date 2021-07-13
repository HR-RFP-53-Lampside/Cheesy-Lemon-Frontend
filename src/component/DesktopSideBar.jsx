/* eslint-disable import/no-unresolved */
import React, { useContext } from 'react';
import {
  Container, Card, Hidden, Button, Box, Avatar, Typography, Icon, CardActionArea,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Kitchen, Group, Settings } from '@material-ui/icons/';
import firebase from 'firebase/app';
import 'firebase/auth';

import SpacingDesign from './context/design/SpacingDesign';
import LogStatus from './context/auth/LogStatus';

const DekstopSideBar = () => {
  const history = useHistory();
  const [logStatus, setLogStatus] = useContext(LogStatus);
  const options = [
    {
      message: 'Favorites',
      link: '/favorites',
      icon: (<Icon className="fas fa-heart" style={SpacingDesign.marginx(2)} />),
    },
    {
      message: 'What\'s for dinner',
      link: '/wfd',
      icon: (<Icon className="fas fa-utensils" style={SpacingDesign.marginx(2)} />),
    },
    {
      message: 'Add Ingredients',
      link: '/addingredients',
      icon: (<Icon className="fas fa-egg" style={SpacingDesign.marginx(2)} />),
    },
    {
      message: 'My Pantry',
      link: '/pantry',
      icon: (<Kitchen style={SpacingDesign.marginx(2)} />),
    },
    {
      message: 'Social',
      link: '/social',
      icon: (<Group style={SpacingDesign.marginx(2)} />),
    },
    {
      message: 'Settings',
      link: '/settings',
      icon: (<Settings style={SpacingDesign.marginx(2)} />),
    },
  ];
  const buttonPaddings = 3;
  return (
    <Hidden mdDown>
      <Container style={{
        flexShrink: 1, position: 'absolute', left: '0', maxWidth: '27em',
      }}
      >
        <Card
          style={{
            ...SpacingDesign.marginTop(5),
            height: '100%',
          }}
        >
          <CardActionArea
            onClick={() => {
              history.push('/profile');
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
                  {logStatus.username}
                </Typography>
                <Box display="flex">
                  <Icon className="fas fa-cookie" />
                  <Typography variant="subtitle1" style={{ alignSelf: 'center', ...SpacingDesign.marginLeft(1) }}>
                    {logStatus.yummyPoints}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CardActionArea>
          <Box
            style={{
              height: 'calc(90% - 120px)',
              justifyContent: 'space-between',
              ...SpacingDesign.paddingTop(4),
            }}
            display="flex"
            flexDirection="column"
          >
            {options.map((item) => (
              <Button
                fullWidth
                style={{ justifyContent: 'flex-start', ...SpacingDesign.paddingy(buttonPaddings) }}
                onClick={() => {
                  history.push(item.link);
                }}
                key={item.message}
              >
                <Typography variant="h5">
                  {item.icon}
                  {item.message}
                </Typography>
              </Button>
            ))}
            <Button
              fullWidth
              style={{ justifyContent: 'flex-start', ...SpacingDesign.paddingy(buttonPaddings) }}
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
