/* eslint-disable import/no-unresolved */
import React, { useContext } from 'react';
import {
  Paper, Box, Typography, TextField, Button, Icon,
} from '@material-ui/core';

import SpacingDesign from '../context/design/SpacingDesign';
import LogStatus from '../context/auth/LogStatus';

const SettingsStart = () => {
  const [logStatus] = useContext(LogStatus);

  return (
    <Paper elevation={3} style={SpacingDesign.padding(3)}>
      <Typography variant="h5" align="center">
        Settings
      </Typography>
      <TextField
        fullWidth
        label="Username"
        variant="filled"
        defaultValue={logStatus && logStatus.username}
        style={SpacingDesign.marginy(1.5)}
      />
      <Box display="flex" flexWrap="wrap" justifyContent="space-between" style={SpacingDesign.marginy(1.5)}>
        <TextField
          label="First Name"
          variant="filled"
          defaultValue={logStatus && logStatus.firstName}
          style={{
            flexGrow: 1, flexBasis: '45%', minWidth: '10em', ...SpacingDesign.margin(1),
          }}
        />
        <TextField
          label="Last Name"
          variant="filled"
          defaultValue={logStatus && logStatus.lastName}
          style={{
            flexGrow: 1, flexBasis: '45%', minWidth: '10em', ...SpacingDesign.margin(1),
          }}
        />
      </Box>
      <TextField
        fullWidth
        label="About Me"
        variant="outlined"
        defaultValue={logStatus && logStatus.aboutMe}
        multiline
        rows={5}
        style={SpacingDesign.marginy(1.5)}
      />
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
    </Paper>
  );
};

export default SettingsStart;
