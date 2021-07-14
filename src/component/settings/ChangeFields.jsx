/* eslint-disable import/no-unresolved */
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  TextField, Button, Typography,
  Box, Icon, Avatar,
} from '@material-ui/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import SpacingDesign from '../context/design/SpacingDesign';
import LogStatus from '../context/auth/LogStatus';

const ChangeFields = ({
  label, accountSettings, multiline, rows,
}) => {
  // eslint-disable-next-line no-unused-vars
  const [logStatus] = useContext(LogStatus);
  const [editValues, setEditValues] = useState(logStatus ? logStatus[accountSettings] : '');
  const handleChange = (event) => {
    if (accountSettings !== 'photoURL') {
      setEditValues(event.target.value);
    } else {
      const formData = new FormData();
      const files = Array.from(event.target.files);
      formData.append('file', files[0]);
      setEditValues(formData);
    }
  };
  const handleClick = () => {
    if (accountSettings !== 'photoURL') {
      firebase.database().ref(`users/${logStatus.uid}/${accountSettings}`).set(editValues).catch((error) => console.error(error));
    } else {
      axios.post('http://localhost:8000/api/image', editValues)
        .then((result) => {
          const { url } = result.data[0];
          firebase.database().ref(`users/${logStatus.uid}/${accountSettings}`).set(url).catch((error) => console.error(error));
        })
        .catch(console.error);
    }
  };
  let display = ('');
  const settleDisplay = () => {
    if (accountSettings !== 'photoURL') {
      display = (
        <>
          <TextField
            label={label}
            variant="outlined"
            value={editValues}
            multiline={multiline}
            rows={rows}
            onChange={handleChange}
            fullWidth
          />
          <Button
            style={{ alignSelf: 'flex-end', ...SpacingDesign.marginy(2) }}
            variant="contained"
            color="primary"
            onClick={handleClick}
          >
            <Typography>
              Elevate changes
            </Typography>
          </Button>
        </>
      );
    } else {
      display = (
        <Box fullWidth display="flex" style={{ flexDirection: 'column' }}>
          <Box display="flex" style={{ ...SpacingDesign.marginy(3), width: '100%' }} justifyContent="center">
            {[1, 2, 3].map((row) => (
              <Avatar
                key={`photo-card${row}`}
                title="UserProfilePicture"
                src={logStatus && logStatus.photoURL}
                style={{
                  ...SpacingDesign.square(row * 3),
                  alignSelf: 'center',
                }}
              />
            ))}
          </Box>
          <Button
            variant="outlined"
            component="label"
            htmlFor="profile-image"
            style={{ alignSelf: 'center', ...SpacingDesign.marginy(2) }}
          >
            <Typography variant="body2">
              change profile
            </Typography>
            <Icon className="fas fa-camera" />
            <input type="file" id="profile-image" onChange={(event) => handleChange(event)} hidden />
          </Button>
        </Box>
      );
    }
  };

  useEffect(() => {
    setEditValues(logStatus[accountSettings]);
  }, [accountSettings]);

  settleDisplay();

  return (
    <Box style={{ width: '100%' }}>
      {label
      && (
        <Box display="flex" flexDirection="column" fullWidth>
          {display}
        </Box>
      )}
    </Box>
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
