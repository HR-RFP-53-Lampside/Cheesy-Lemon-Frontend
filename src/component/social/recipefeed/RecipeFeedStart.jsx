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
    'Least Reviews',
    'Least Favorites',
  ];

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(filterOptions[0]);

  useEffect(() => {
    endPoint.recipes.getAllRecipes()
      .then((results) => {
        const resultData = results.data;
        setData(resultData);
      });
  }, []);

  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  useMemo(() => {
    if (data.length > 0) {
      const copy = data.slice().filter((item) => item && item);
      if (selected === 'Most Reviews') {
        copy.sort((a, b) => b.reviewCount - a.reviewCount);
      }
      if (selected === 'Most Favorites') {
        copy.sort((a, b) => b.favoriteCount - a.favoriteCount);
      }
      if (selected === 'Least Reviews') {
        copy.sort((a, b) => a.reviewCount - b.reviewCount);
      }
      if (selected === 'Least Favorites') {
        copy.sort((a, b) => a.favoriteCount - b.favoriteCount);
      }
      setData(copy);
    }
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
