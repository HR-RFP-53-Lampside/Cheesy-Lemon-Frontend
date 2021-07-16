/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import {
  Typography,
  Card,
  Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import SpacingDesign from '../../context/design/SpacingDesign';

const ReviewFocusComment = ({ author, body }) => {
  const [authorName, setAuthorName] = useState(author);
  const history = useHistory();

  useEffect(() => {
    firebase.database().ref(`users/${author}`).once('value').then((snapshot) => {
      const username = (snapshot.val() && snapshot.val().username) || 'anonymous';
      setAuthorName(username);
    });
  }, []);

  return (
    <Card style={{ ...SpacingDesign.padding(2), ...SpacingDesign.marginy(2) }}>
      <Button
        onClick={() => {
          history.push(`/profile/${author}`);
        }}
      >
        <Typography variant="subtitle1">
          {authorName}
        </Typography>
      </Button>
      <Typography
        variant="body1"
        style={{ ...SpacingDesign.paddingx(2), ...SpacingDesign.paddingy(1), borderLeft: '1px solid' }}
      >
        {body}
      </Typography>
    </Card>
  );
};

ReviewFocusComment.propTypes = {
  author: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

export default ReviewFocusComment;
