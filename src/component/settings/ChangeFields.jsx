/* eslint-disable import/no-unresolved */
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  TextField, Button, Typography,
  Box, Icon, Avatar,
} from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
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
  const [userMessage, setUserMessage] = useState('');
  const [selected, setSelected] = useState((logStatus && logStatus.dietaryPrefs) || null);

  const status = {
    dairyFree: 'Dairy Free',
    glutenFree: 'Gluten Free',
    ketogenic: 'Ketogenic',
    pescatarian: 'Pescatarian',
    vegan: 'Vegan',
    vegetarian: 'Vegetarian',
  };

  const maxLength = accountSettings === 'aboutMe' ? 250 : 15;

  const handleChange = (event) => {
    if (accountSettings !== 'photoURL') {
      setEditValues(event.target.value);
    } else {
      const formData = new FormData();
      const files = Array.from(event.target.files);
      formData.append('file', files[0]);
      axios.post('http://localhost:8000/api/image', formData)
        .then((result) => {
          const { url } = result.data[0];
          firebase.database().ref(`users/${logStatus.uid}/${accountSettings}`).set(url).catch(console.error);
        })
        .catch(console.error);
    }
  };
  const handleClick = () => {
    if (accountSettings === 'username' && editValues === '') {
      firebase.database().ref(`users/${logStatus.uid}/${accountSettings}`).set(logStatus.email.split('@')[0])
      .then(() => {
        setUserMessage('Profile Updated');
        setTimeout(setUserMessage, 2000, '');
      })
      .catch((error) => console.error(error));
    } else {
      firebase.database().ref(`users/${logStatus.uid}/${accountSettings}`).set(editValues)
        .then(() => {
          setUserMessage('Profile Updated');
          setTimeout(setUserMessage, 2000, '');
        })
        .catch((error) => console.error(error));
    }
  };
  const changeDiet = (event, newVal) => {
    if (newVal) {
      firebase.database().ref(`users/${logStatus.uid}/${accountSettings}`).set(newVal)
        .then(() => {
          setSelected(newVal);
        })
        .catch((error) => console.error(error));
    } else {
      firebase.database().ref(`users/${logStatus.uid}/${accountSettings}`).set('')
      .then(() => {
        setSelected(newVal);
      })
      .catch((error) => console.error(error));
    }
  };
  let display = ('');
  const settleDisplay = () => {
    if (accountSettings === 'photoURL') {
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
    } else if (accountSettings === 'dietaryPrefs') {
      //
      display = (
        <ToggleButtonGroup orientation="vertical" value={selected} onChange={changeDiet} exclusive>
          { Object.keys(status).map((key) => (
            <ToggleButton key={key} value={key} aria-label={`account-${status[key]}`}>
              {status[key]}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      );
    } else {
      display = (
        <>
          <TextField
            label={label}
            variant="outlined"
            value={editValues}
            inputProps={{
              maxLength,
            }}
            multiline={multiline}
            rows={rows}
            onChange={handleChange}
            fullWidth
          />
          { userMessage
            ? (
              <Box bgcolor="info.main" align="center" borderRadius={5} style={{ ...SpacingDesign.padding(1), ...SpacingDesign.marginTop(2) }}>
                <Typography color="textPrimary">
                  {userMessage}
                </Typography>
              </Box>
            )
            : null}
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
