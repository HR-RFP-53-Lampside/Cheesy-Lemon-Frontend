/* eslint-disable import/no-unresolved */
import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Select,
  Button,
  CardActionArea,
} from '@material-ui/core';
import { ThumbUp, ThumbDown } from '@material-ui/icons';
import { Link, useHistory, useParams } from 'react-router-dom';
import Image from 'material-ui-image';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import SpacingDesign from '../../context/design/SpacingDesign';
import ReviewFocusComment from './ReviewFocusComment';
import endPoint from '../../../routing';
import AddCommentForm from './AddCommentForm';

import LogStatus from '../../context/auth/LogStatus';

const ReviewFocus = () => {
  const [reviewData, setReviewData] = useState({});
  const { recipeId, reviewId } = useParams();
  const [picture, setPicture] = useState('');
  const [makeUpdate, setUpdate] = useState(false);
  const logStatus = useContext(LogStatus);
  const history = useHistory();

  const getReviews = async () => {
    const { data } = await endPoint.reviews.getRecipeReviews(recipeId);
    const [reviewsData] = data;
    const review = reviewsData && reviewsData.reviews;
    if (review) {
      const [myData] = review.filter((fit) => fit._id === reviewId);
      if (myData.images) {
        setPicture(myData.images);
      }
      myData.comments.reverse();
      firebase.database().ref(`users/${myData.authorId}`).once('value').then((snapshot) => {
        const username = (snapshot.val() && snapshot.val().username) || 'anonymous';
        myData.authorName = username;
        setReviewData(myData);
      });
    }
  };

  useEffect(() => {
    getReviews();
  }, [recipeId]);

  useEffect(() => {
    getReviews();
  }, [makeUpdate]);

  return (
    <>
      <Paper style={{ ...SpacingDesign.padding(2) }}>
        <Image
          src={picture}
          cover
        />
        <CardActionArea component={Link} to={`/recipes/${recipeId}/reviews/`}>
          <Typography variant="h3">
            {reviewData.headline}
          </Typography>
        </CardActionArea>
        <Button onClick={() => {
          history.push(`/profile/${reviewData.authorId}`);
        }}
        >
          <Typography variant="h5">
            {reviewData.authorName}
          </Typography>
        </Button>
        <Typography variant="body1">
          {reviewData.body}
        </Typography>
        <Box display="flex" justifyContent="space-between" style={{ ...SpacingDesign.marginx(1), ...SpacingDesign.marginy(2) }}>
          <Button onClick={() => {
            // Alec do the thumbs up here
            console.log('I\'ve been clicked');
          }}
          >
            <ThumbUp />
            <Typography style={SpacingDesign.marginLeft(1)}>
              {reviewData.upvotes}
            </Typography>
          </Button>
          <Button onClick={() => {
            // Alec do the thumbs down here
            console.log('I\'ve been clicked');
          }}
          >
            <ThumbDown />
            <Typography style={SpacingDesign.marginLeft(1)}>
              {reviewData.downvotes}
            </Typography>
          </Button>
        </Box>
      </Paper>
      <Box display="flex" justifyContent="space-between" style={{ ...SpacingDesign.marginTop(3) }}>
        <Typography variant="h6">
          Comments
        </Typography>
        {/* <Select
          native
          variant="outlined"
        >
          <option value="yummies">Most Yummies</option>
          <option value="recent">Most Recent</option>
        </Select> */}
      </Box>
      <AddCommentForm
        recipeId={recipeId}
        reviewId={reviewId}
        setUpdate={setUpdate}
        makeUpdate={makeUpdate}
      />
      {reviewData.comments && reviewData.comments.map((row) => (
        <ReviewFocusComment
          key={`comment-${row._id}`}
          author={row.authorId}
          body={row.body}
        />
      ))}
    </>
  );
};

export default ReviewFocus;
