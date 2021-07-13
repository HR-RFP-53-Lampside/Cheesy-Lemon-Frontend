/* eslint-disable import/no-unresolved */
import React, { useContext, useEffect, useState } from 'react';
import {
  Box, Typography, Icon, TextField,
} from '@material-ui/core';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';

import SpacingDesign from '../context/design/SpacingDesign';
import LogStatus from '../context/auth/LogStatus';

const AccountSettings = () => {
  const [logStatus] = useContext(LogStatus);
  const [accountSettings, setAccountSettings] = useState();
  const [editingSetting, setEditingSetting] = useState();

  const textInputs = {
    username: 'Username',
    firstName: 'First Name',
    lastName: 'Last Name',
  };

  const handleChange = (event, newValue) => {
    setAccountSettings(newValue);
  };

  useEffect(() => {
    if (accountSettings === 'username' || accountSettings === 'firstName' || accountSettings === 'lastName') {

    }
  }, [accountSettings]);

  return (
    <Box display="flex" style={SpacingDesign.marginTop(2)}>
      <ToggleButtonGroup exclusive value={accountSettings} onChange={handleChange} orientation="vertical">
        {Object.keys(textInputs).map((key) => (
          <ToggleButton key={key} value={key} aria-label={`account-${textInputs[key]}`}>
            {textInputs[key]}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      {editingSetting}
    </Box>
  );
};

export default AccountSettings;
