/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import {
  Box,
} from '@material-ui/core';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';

import SpacingDesign from '../context/design/SpacingDesign';
import ChangeFields from './ChangeFields';

const AccountSettings = () => {
  const [accountSettings, setAccountSettings] = useState();
  const [changeFields, setChangeFields] = useState();

  const textInputs = {
    username: 'Username',
    firstName: 'First Name',
    lastName: 'Last Name',
    aboutMe: 'About Me',
    dietaryPrefs: 'Dietary',
    photoURL: 'Profile Pic',
  };

  const handleChange = (event, newValue) => {
    setAccountSettings(newValue);
  };

  useEffect(() => {
    if (accountSettings) {
      setChangeFields(
        <ChangeFields
          label={textInputs[accountSettings]}
          accountSettings={accountSettings}
          multiline={accountSettings === 'aboutMe' && true}
          rows={accountSettings === 'aboutMe' ? 6 : 1}
        />,
      );
    }
  }, [accountSettings]);

  return (
    <Box display="flex" style={{ ...SpacingDesign.marginTop(2) }}>
      <ToggleButtonGroup exclusive value={accountSettings} onChange={handleChange} orientation="vertical">
        {Object.keys(textInputs).map((key) => (
          <ToggleButton key={key} value={key} aria-label={`account-${textInputs[key]}`}>
            {textInputs[key]}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      {changeFields}
    </Box>
  );
};

export default AccountSettings;
