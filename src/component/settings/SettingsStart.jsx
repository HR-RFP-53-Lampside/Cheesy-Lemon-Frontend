/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from 'react';
import {
  Paper, Box, Typography,
} from '@material-ui/core';

import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';

import SpacingDesign from '../context/design/SpacingDesign';
import AccountSettings from './AccountSettings';
import PrivacySettings from './PrivacySetting';

const SettingsStart = () => {
  const [settingsFocus, setSettingsFocus] = useState('');
  const [goToPage, setGoToPage] = useState();

  const handleChange = (event, newValue) => {
    setSettingsFocus(newValue);
  };

  /*
      <Button
        variant="outlined"
        component="label"
      >
        <Typography variant="subtitle" color="textAction">
          change profile
        </Typography>
        <Icon className="fas fa-camera" style={SpacingDesign.marginLeft(1.5)} />
        <input type="file" hidden />
      </Button>
  */

  useEffect(() => {
    if (settingsFocus === 'account') {
      setGoToPage(<AccountSettings />);
    } else if (settingsFocus === 'privacy') {
      setGoToPage(<PrivacySettings />);
    }
  }, [settingsFocus]);

  return (
    <Box elevation={3} style={{ ...SpacingDesign.height(100), ...SpacingDesign.padding(3) }}>
      <Typography variant="h4" align="center">
        Settings
      </Typography>
      <Paper fullWidth>
        <ToggleButtonGroup value={settingsFocus} onChange={handleChange} aria-label="settings group" exclusive>
          <ToggleButton value="account" aria-label="account">
            <Typography>
              Account
            </Typography>
          </ToggleButton>
          <ToggleButton value="privacy" aria-label="privacy">
            <Typography>
              Privacy
            </Typography>
          </ToggleButton>
        </ToggleButtonGroup>
        {goToPage}
      </Paper>
    </Box>
  );
};

export default SettingsStart;