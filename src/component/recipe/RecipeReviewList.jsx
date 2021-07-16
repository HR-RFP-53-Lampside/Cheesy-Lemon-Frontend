/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import AddReviewForm from './AddReviewForm';
import ReviewList from '../social/review/ReviewList';

const RecipeReviewList = ({ recipieId }) => {
  const [updateReview, setUpdateReview] = useState(false);

  return (
    <>
      <AddReviewForm
        recipeId={recipieId}
        setUpdateReview={setUpdateReview}
        updateReview={updateReview}
      />
      <ReviewList updateReview={updateReview} />
    </>
  );
};
RecipeReviewList.propTypes = {
  recipieId: PropTypes.string.isRequired,
};

export default RecipeReviewList;
