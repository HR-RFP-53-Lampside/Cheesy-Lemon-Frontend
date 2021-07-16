/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  Select,
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import ReviewCard from './ReviewCard';
import endPoint from '../../../routing';

const ReviewList = () => {
  const { recipeId } = useParams();
  const [reviews, setReviews] = useState();
  const [recipeTitle, setRecipeTitle] = useState('');
  const [sort, setSort] = useState('yummies');

  const getReviews = async () => {
    const { data } = await endPoint.reviews.getRecipeReviews(recipeId);
    const recipeData = await endPoint.recipes.getRecipeById(recipeId);
    const reviewsData = data[0].reviews;
    setReviews(reviewsData);
    setRecipeTitle(recipeData && recipeData.data.status.title);
  };

  useEffect(() => {
    getReviews();
  }, [recipeId]);

  useMemo(() => {
    if (reviews) {
      const copy = reviews.slice();
      if (sort === 'yummies') {
        copy.sort((a, b) => (b.upvotes - a.upvotes));
      }
      if (sort === 'recent') {
        copy.sort((a, b) => (new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()));
      }
      if (sort === 'oldest') {
        copy.sort((a, b) => (new Date(a._createdAt).getTime() - new Date(b._createdAt).getTime()));
      }
      setReviews(copy);
    }
  }, [sort]);

  const handleChange = (e) => {
    setSort(e.target.value);
  };

  return (
    <Box>
      <Typography
        variant="h3"
        align="center"
      >
        {recipeTitle}
      </Typography>
      <Typography
        variant="h4"
        align="center"
        color="textSecondary"
      >
        reviews
      </Typography>

      <Select
        native
        onChange={handleChange}
        inputProps={{
          name: 'sort',
          id: 'sort',
        }}
        fullWidth
        variant="outlined"
      >
        <option value="yummies">Most Yummies</option>
        <option value="recent">Most Recent</option>
        <option value="oldest">Oldest</option>
      </Select>
      {reviews && reviews.map((review) => (
        <ReviewCard
          key={review._id}
          reviewId={review._id}
          title={review.headline}
          authorId={review.authorId}
          body={review.body}
          upvotes={review.upvotes}
          downvotes={review.downvotes}
          recipeId={recipeId}
          date={review._createdAt}
          comments={review.comments}
          images={review.images}
        />
      ))}
    </Box>
  );
};

export default ReviewList;
