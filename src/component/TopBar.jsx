/* eslint-disable import/no-unresolved */
import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, Typography, Toolbar, Switch, Icon, Hidden, Box, Button,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import SpacingDesign from './context/design/SpacingDesign';

const TopBar = ({ darkMode, setDarkMode }) => {
  const history = useHistory();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Hidden mdUp>
          <Box style={{ flexGrow: 0.25 }} />
        </Hidden>
        <Box style={{ flexGrow: 1 }} align="center">
          <Button style={SpacingDesign.marginLeft(5)} aria-label="Go to home screen" onClick={() => history.push('/wfd')}>
            <Icon className="fa fa-cloud-meatball" color="action" />
            <Hidden mdDown>
              <Typography
                style={{ ...SpacingDesign.marginx(3) }}
                color="textSecondary"
              >
                Whats for dinner
              </Typography>
            </Hidden>
          </Button>
        </Box>
        <Switch check={darkMode.toString()} onChange={() => setDarkMode(!darkMode)} color="secondary" aria-label="dark mode toggling" />
      </Toolbar>
    </AppBar>
  );
};
TopBar.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired,
};

export default TopBar;
