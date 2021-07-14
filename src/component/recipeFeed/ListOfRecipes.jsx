/* eslint-disable import/no-unresolved */
import React from 'react';
import {
  Box,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import RecipeCard from './RecipeCard';

const listOfRecipes = ({ data, selected, test }) => {
  const themeDesign = useTheme();

  // filter results by selected
  // if most reviewed === selected filter first
  // if most favorited === selected filter
  // or my reviews === selected filter

  // add buttons for reviews and favorites. Route to go to all reviews when onClick
  return (
    <Box style={{ width: '100%' }}>
      {test.map((item) => (
        <RecipeCard item={item} key={item.title} />
      ))}
    </Box>
  );
};

export default listOfRecipes;
