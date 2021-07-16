/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Select,
  Button,
  CardActionArea,
} from '@material-ui/core';
import { ThumbUp, ThumbDown } from '@material-ui/icons';
import { Link, useParams } from 'react-router-dom';
import Image from 'material-ui-image';

import SpacingDesign from '../../context/design/SpacingDesign';
import ReviewFocusComment from './ReviewFocusComment';
import endPoint from '../../../routing';
import AddCommentForm from './AddCommentForm';

const ReviewFocus = () => {
  const [reviewData, setReviewData] = useState({});
  const { recipeId, reviewId } = useParams();
  const [picture, setPicture] = useState('');

  const getReviews = async () => {
    const { data } = await endPoint.reviews.getRecipeReviews(recipeId);
    const [reviewsData] = data;
    const review = reviewsData && reviewsData.reviews;
    if (review) {
      const [myData] = review.filter((fit) => fit._id === reviewId);
      console.log(myData);
      if (myData.images) {
        setPicture(myData.images);
      }
      setReviewData(myData);
    }
  };

  useEffect(() => {
    getReviews();
  }, [recipeId]);

  return (
    <>
      <Paper style={{ ...SpacingDesign.padding(2) }}>
        <Image
          src={picture}
          cover
        />
        <CardActionArea component={Link} to="/recipes/1/reviews/">
          <Typography variant="h3">
            {reviewData.headline}
          </Typography>
        </CardActionArea>
        <Typography variant="h5" style={{ ...SpacingDesign.marginBottom(2), ...SpacingDesign.marginLeft(3) }}>
          {reviewData.authorName}
        </Typography>
        <Typography variant="body1">
          {reviewData.body}
        </Typography>
        <Box display="flex" justifyContent="space-between" style={{ ...SpacingDesign.marginx(1), ...SpacingDesign.marginy(2) }}>
          <Button onClick={() => { console.log('I\'ve been clicked'); }}>
            <ThumbUp />
            <Typography style={SpacingDesign.marginLeft(1)}>
              {reviewData.upvotes}
            </Typography>
          </Button>
          <Button onClick={() => { console.log('I\'ve been clicked'); }}>
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
        <Select
          native
          variant="outlined"
        >
          <option value="yummies">Most Yummies</option>
          <option value="recent">Most Recent</option>
        </Select>
      </Box>
<<<<<<< HEAD
      {reviewData.comments && reviewData.comments.map((row) => (
=======
      <AddCommentForm recipeId={123456789} reviewId={'60f06d5a973b6050b9fa09e7'}/>
      {[1, 2, 3, 4, 5].map((row) => (
>>>>>>> main
        <ReviewFocusComment key={row} />
      ))}
    </>
  );
};

export default ReviewFocus;
