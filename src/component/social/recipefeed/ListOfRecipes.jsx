/* eslint-disable import/no-unresolved */
import React from 'react';
import {
  Box,
} from '@material-ui/core';
import PropTypes from 'prop-types';

import RecipeCard from './RecipeCard';

const ListOfRecipes = ({ data }) => (
  <Box style={{ width: '100%' }}>
    {data.map((item) => (
      <RecipeCard
        id={item.id}
        title={item.title}
        body={item.body}
        favorite={item.favorite}
        reviews={item.reviews}
        key={item.title}
      />
    ))}
  </Box>
);

ListOfRecipes.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.array.isRequired,
};

export default ListOfRecipes;
