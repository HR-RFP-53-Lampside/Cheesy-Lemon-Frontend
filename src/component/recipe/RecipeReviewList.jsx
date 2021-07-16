/* eslint-disable import/no-unresolved */
import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import AddReviewForm from './AddReviewForm';
import ReviewList from '../social/review/ReviewList';

const RecipeReviewList = ({ recipieId }) => (
  <>
    <AddReviewForm
      recipeId={recipieId}
    />
    <ReviewList />
  </>
);

RecipeReviewList.propTypes = {
  recipieId: PropTypes.string.isRequired,
};

export default RecipeReviewList;
