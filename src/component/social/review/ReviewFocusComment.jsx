/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import {
  Typography,
  Card,
} from '@material-ui/core';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import SpacingDesign from '../../context/design/SpacingDesign';

const ReviewFocusComment = ({ author, body }) => {
  const [authorName, setAuthorName] = useState(author);

  useEffect(() => {
    firebase.database().ref(`users/${author}`).once('value').then((snapshot) => {
      const username = (snapshot.val() && snapshot.val().username) || 'anonymous';
      setAuthorName(username);
    });
  }, []);

  return (
    <Card style={{ ...SpacingDesign.padding(2), ...SpacingDesign.marginy(2) }}>
      <Typography variant="subtitle1">
        {authorName}
      </Typography>
      <Typography
        variant="body1"
        style={{ ...SpacingDesign.paddingx(2), ...SpacingDesign.paddingy(1), borderLeft: '1px solid' }}
      >
        {body}
      </Typography>
    </Card>
  );
};

export default ReviewFocusComment;
