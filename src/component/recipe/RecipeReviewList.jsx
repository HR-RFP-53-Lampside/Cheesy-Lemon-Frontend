/* eslint-disable import/no-unresolved */
import React from 'react';
import PropTypes from 'prop-types';
import RecipeReviewItem from './RecipeReviewItem';
import AddReviewForm from './AddReviewForm';

const RecipeReviewList = ({ recipeId }) => (
  <>
    <AddReviewForm recipeId={recipeId} />
    <RecipeReviewItem />
  </>
);

RecipeReviewList.propTypes = {
  recipeId: PropTypes.number.isRequired,
};

export default RecipeReviewList;
