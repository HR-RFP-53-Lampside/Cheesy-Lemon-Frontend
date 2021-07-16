/* eslint-disable import/no-unresolved */
import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Typography,
  Select,
} from '@material-ui/core';
import ListOfRecipes from './ListOfRecipes';
import endPoint from '../../../routing';

const RecipeFeed = () => {
  // user data will be data about recipes and display the title, body and favorite/#ofreviews
  // be able to filter recipe info from select tag by most liked or most commented or my reviews
  const filterOptions = [
    'Most Reviews',
    'Most Favorites',
  ];

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(filterOptions[0]);

  useEffect(() => {
    endPoint.recipes.getAllRecipes()
      .then((results) => {
        const resultData = results.data;
        console.log(resultData);
        setData(resultData);
      });
  }, []);

  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  useMemo(() => {
    const copy = data.slice();
    if (selected === filterOptions[0]) {
      copy.sort((a, b) => b.reviews - a.reviews);
    }
    if (selected === filterOptions[1]) {
      copy.sort((a, b) => b.favorite - a.favorite);
    }
    setData(copy);
  }, [selected]);

  return (
    <Box>
      <Typography
        variant="h2"
        align="center"
      >
        Recipe Feed
      </Typography>
      <Select
        native
        value={selected}
        onChange={handleChange}
        variant="outlined"
        fullWidth
      >
        {filterOptions.map((rows) => (
          <option key={rows} value={rows}>{rows}</option>
        ))}
      </Select>
      {data.length > 0 && (
      <ListOfRecipes
        data={data}
      />
      )}
    </Box>
  );
};

export default RecipeFeed;
