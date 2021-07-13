/* eslint-disable import/no-unresolved */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Drawer, Card, Box, Avatar, Typography, Button, Icon, CardActionArea,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Kitchen, Group, Settings } from '@material-ui/icons/';
import firebase from 'firebase/app';
import 'firebase/auth';

import SpacingDesign from './context/design/SpacingDesign';
import LogStatus from './context/auth/LogStatus';

const SideBar = ({ sidebarShow, setSidebarShow }) => {
  console.log('sidebar loading');
  const history = useHistory();
  const [logStatus, setLogStatus] = useContext(LogStatus);
  const buttonPaddings = 1.5;

  return (
    <Drawer
      anchor="left"
      open={sidebarShow}
      onClose={() => setSidebarShow(!sidebarShow)}
    >
      <Card
        style={{
          height: '100%',
        }}
      >
        <CardActionArea
          onClick={() => {
            setSidebarShow(false);
          }}
          disableRipple
        >
          <Box
            style={{
              ...SpacingDesign.height(20),
              ...SpacingDesign.padding(2),
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
              height: 'calc(100% - 160px)',
              justifyContent: 'space-between',
              ...SpacingDesign.paddingTop(4),
            }}
            display="flex"
            flexDirection="column"
          >
            <Button
              fullWidth
              style={{ justifyContent: 'flex-start', ...SpacingDesign.paddingy(buttonPaddings) }}
              onClick={() => history.push('/favorites')}
            >
              <Typography variant="h5">
                <Icon className="fas fa-heart" style={SpacingDesign.marginx(2)} />
                Favorites
              </Typography>
            </Button>
            <Button
              fullWidth
              style={{ justifyContent: 'flex-start', ...SpacingDesign.paddingy(buttonPaddings) }}
              onClick={() => history.push('/wfd')}
            >
              <Typography variant="h5">
                <Icon className="fas fa-utensils" style={SpacingDesign.marginx(2)} />
                {'What\'s for dinner'}
              </Typography>
            </Button>
            <Button
              fullWidth
              style={{ justifyContent: 'flex-start', ...SpacingDesign.paddingy(buttonPaddings) }}
              onClick={() => history.push('/addingredient')}
            >
              <Typography variant="h5">
                <Icon className="fas fa-egg" style={SpacingDesign.marginx(2)} />
                Add Ingredients
              </Typography>
            </Button>
            <Button
              fullWidth
              style={{ justifyContent: 'flex-start', ...SpacingDesign.paddingy(buttonPaddings) }}
              onClick={() => history.push('/pantry')}
            >
              <Typography variant="h5">
                <Kitchen style={SpacingDesign.marginx(2)} />
                My Pantry
              </Typography>
            </Button>
            <Button
              fullWidth
              style={{ justifyContent: 'flex-start', ...SpacingDesign.paddingy(buttonPaddings) }}
              onClick={() => history.push('/social')}
            >
              <Typography variant="h5">
                <Group style={SpacingDesign.marginx(2)} />
                Social
              </Typography>
            </Button>
            <Button
              fullWidth
              style={{ justifyContent: 'flex-start', ...SpacingDesign.paddingy(buttonPaddings) }}
              onClick={() => history.push('/settings')}
            >
              <Typography variant="h5">
                <Settings style={SpacingDesign.marginx(2)} />
                Settings
              </Typography>
            </Button>
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
        </CardActionArea>
      </Card>
    </Drawer>
  );
};

SideBar.propTypes = {
  sidebarShow: PropTypes.bool.isRequired,
  setSidebarShow: PropTypes.func.isRequired,
};

export default SideBar;
