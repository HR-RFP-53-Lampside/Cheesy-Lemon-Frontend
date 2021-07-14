import React, { useState } from 'react';
import {
  Paper, Box, Typography, TextField, Button, Container, Hidden, Select,
} from '@material-ui/core';
import Image from 'material-ui-image';
import { Link } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import axios from 'axios';
import listOfRecipes from './ListOfRecipes';

const RecipeFeed = ({ userData }) => {
// user data will be data about recipes and display the title, body and favorite/#ofreviews
  // add click listener to recipe title that will take user to all info about recipe
  // be able to filter recipe info from select tag by most liked or most commented or my reviews
  const [filterOptions, setFilterOptions] = useState(['Most Reviews', 'My Reviewed', 'Most Favorites']);
  const [selected, setSelected] = useState('');
  const handleNewFilter = (e) => {
    setSelected(e.target.value);
  };

  return (
    <Box display="flex">
      <Container
        maxWidth="sm"
        style={{
          flexGrow: 1, flexBasis: '20%', alignSelf: 'center', maxHeight: '90vh',
        }}
      >
        <Select value={filterOptions} onChange={handleNewFilter}>
          {filterOptions.map((item) => (
            { item }
          ))}
        </Select>
        <Typography variant="h2" align="center" style={{ color: themeDesign.custom.muted.grey }}>
          Recipe Feed
        </Typography>
        <listOfRecipes data={userData} selected={selected} />
      </Container>
    </Box>
  );
};

export default RecipeFeed;
