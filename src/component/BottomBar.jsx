/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  BottomNavigation, BottomNavigationAction, Box, Icon, Hidden,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Menu, Kitchen, Group } from '@material-ui/icons/';

const BottomBar = ({ sidebarShow, setSidebarShow }) => {
  const [navValue, setNavValue] = useState(-1);
  const themeDesign = useTheme();

  return (
    <Hidden lgUp>
      <Box
        component={BottomNavigation}
        value={navValue}
        onChange={(event, newValue) => {
          setNavValue(newValue);
        }}
        showLabels
        borderTop={1}
        borderColor="primary.light"
        style={{
          width: '100%', position: 'fixed', bottom: '.5em', height: '3.5em',
        }}
      >
        <BottomNavigationAction label="More" color="secondary" icon={<Icon className="fas fa-hamburger" />} onClick={() => setSidebarShow(!sidebarShow)} />
        <BottomNavigationAction component={Link} to="/wfd" label="WFDinner" color="secondary" icon={<Icon className="fas fa-utensils" />} />
        <BottomNavigationAction component={Link} to="/pantry" label="Pantry" color="secondary" icon={<Kitchen />} />
        <BottomNavigationAction component={Link} to="/social" label="Community" color="secondary" icon={<Group />} />
      </Box>
      <Box style={{
        width: '100%', position: 'fixed', bottom: '0', height: '.5em', backgroundColor: themeDesign.palette.primary.light,
      }}
      />
    </Hidden>
  );
};

BottomBar.propTypes = {
  sidebarShow: PropTypes.bool.isRequired,
  setSidebarShow: PropTypes.func.isRequired,
};

export default BottomBar;
