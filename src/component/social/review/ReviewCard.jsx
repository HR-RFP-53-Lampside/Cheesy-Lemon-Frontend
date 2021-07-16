/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { ThumbUp, ThumbDown, RateReview } from '@material-ui/icons';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Icon,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import ShowMoreText from 'react-show-more-text';
import SpacingDesign from '../../context/design/SpacingDesign';
import endPoint from '../../../routing';
import LogStatus from '../../context/auth/LogStatus';

const ReviewCard = ({
  id, title, authorId, body, upvotes, downvotes, recipeId, date,
}) => {
  const [authorName, setAuthorName] = useState('');
  const [logStatus] = useContext(LogStatus);

  useEffect(() => {
    firebase.database().ref(`users/${authorId}`).once('value').then((snapshot) => {
      const username = (snapshot.val() && snapshot.val().username) || 'anonymous';
      setAuthorName(username);
    });
  }, []);

  const handleUpvote = () => {
    firebase.database().ref(`users/${authorId}`).once('value').then((snapshot) => {
      const upvotes = (snapshot.val() && snapshot.val());
      console.log(upvotes);
    });
    endPoint.reviews.putUpvoteRecipeReview(recipeId, id)
      .then((result) => {

      });
  };

  const handleDownvote = () => {

  };

  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };

  return (
    <Card style={{ ...SpacingDesign.marginy(3), ...SpacingDesign.padding(1) }} elevation={3}>
      <CardContent>
        <Typography variant="h4">
          {title}
        </Typography>
        <Typography variant="h5" style={SpacingDesign.marginBottom(2)}>
          {authorName}
        </Typography>
        <ShowMoreText
          more={<Icon className="fas fa-caret-down" color="primary" />}
          less={<Icon className="fas fa-caret-up" color="secondary" />}
          lines={4}
        >
          <Typography>
            {body}
          </Typography>
        </ShowMoreText>
        <Typography variant="subtitle">
          {/* {date.toLocaleDateString(undefined, dateOptions)} */}
          {new Date(date).toLocaleDateString(undefined, dateOptions)}
        </Typography>
      </CardContent>
      <Box
        display="flex"
        justifyContent="space-between"
        bgcolor="primary"
        style={{ ...SpacingDesign.paddingx(5), ...SpacingDesign.paddingy(2) }}
      >
        <Button onClick={handleUpvote}>
          <ThumbUp />
          <Typography style={SpacingDesign.marginLeft(1)}>
            {upvotes}
          </Typography>
        </Button>
        <Button component={Link} to={`/recipes/${recipeId}/reviews/${id}`}>
          <RateReview />
          <Typography style={SpacingDesign.marginLeft(1)}>
            {upvotes}
          </Typography>
        </Button>
        <Button onClick={handleDownvote}>
          <ThumbDown />
          <Typography style={SpacingDesign.marginLeft(1)}>
            {downvotes}
          </Typography>
        </Button>
      </Box>
    </Card>
  );
};

ReviewCard.propType = {
  id: PropTypes.number.isRequired,
  recipeId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  authorId: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  upvotes: PropTypes.number.isRequired,
  downvotes: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
};

export default ReviewCard;
