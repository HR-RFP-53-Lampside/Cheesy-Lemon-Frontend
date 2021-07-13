/* eslint-disable import/no-unresolved */
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  TextField, Button, Typography,
  Box, Icon, Avatar,
} from '@material-ui/core';

import SpacingDesign from '../context/design/SpacingDesign';
import LogStatus from '../context/auth/LogStatus';

const ChangeFields = ({
  label, accountSettings, multiline, rows,
}) => {
  const [editValues, setEditValues] = useState(accountSettings);
  const [logStatus] = useContext(LogStatus);
  const handleChange = (event) => {
    setEditValues(event.target.value);
  };
  let display = ('');
  const settleDisplay = () => {
    if (accountSettings !== 'photoURL') {
      display = (
        <TextField
          label={label}
          variant="outlined"
          style={{ ...SpacingDesign.marginLeft(1), ...SpacingDesign.width(45) }}
          value={logStatus[accountSettings]}
          multiline={multiline}
          rows={rows}
          onChange={handleChange}
        />
      );
    } else {
      display = (
        <>
          <Box display="flex" justifyContent="center" style={SpacingDesign.marginy(3)}>
            {[1, 2, 3].map((row, index) => (
              <Avatar
                key={`photo-${index}`}
                title="UserProfilePicture"
                src={logStatus && logStatus.photoURL}
                style={{
                  ...SpacingDesign.square((index + 1) * 3),
                  alignSelf: 'center',
                  ...SpacingDesign.marginx(1),
                }}
              />
            ))}
          </Box>
          <Button
            variant="outlined"
            component="label"
            style={{ ...SpacingDesign.marginLeft(1), ...SpacingDesign.width(45) }}
          >
            <Typography variant="subtitle" color="textAction">
              change profile
            </Typography>
            <Icon className="fas fa-camera" style={SpacingDesign.marginLeft(1.5)} />
            <input type="file" hidden />
          </Button>
        </>
      );
    }
  };

  settleDisplay();

  return (
    <>
      {label
      && (
        <Box display="flex" flexDirection="column" justifyContent>
          {display}
          <Button
            style={{ alignSelf: 'flex-end', ...SpacingDesign.marginy(2) }}
            variant="contained"
            color="primary"
          >
            <Typography>
              Elevate changes
            </Typography>
          </Button>
        </Box>
      )}
    </>
  );
};

ChangeFields.propTypes = {
  label: PropTypes.string.isRequired,
  accountSettings: PropTypes.string.isRequired,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
};

ChangeFields.defaultProps = {
  multiline: false,
  rows: 1,
};

export default ChangeFields;
