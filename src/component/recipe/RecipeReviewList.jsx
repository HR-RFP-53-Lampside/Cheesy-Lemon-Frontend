import React, { useContext, useState } from 'react';
import {
  Paper, Box, Typography, TextField, Button, IconButton, Container, Hidden,
} from '@material-ui/core';
import Image from 'material-ui-image';
import { Link } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';

import SpacingDesign from '../context/design/SpacingDesign';
import LogStatus from '../context/auth/LogStatus';
import backgroundBG from '../../assets/lowpoly2.png';
import RecipeReviewItem from './RecipeReviewItem';

const RecipeReviewList = () => {
  const themeDesign = useTheme();

  return (
    <div>
      <div>
        <RecipeReviewItem />
      </div>
    <div style={{align: "center"}}>
    <Button
  variant="contained"
  color="primary"
  style={{ ...SpacingDesign.paddingx(5), ...SpacingDesign.marginy(2) }}
  type="submit"
  align="center"
>
  <Typography color="textPrimary">
    Review Recipe
  </Typography>
</Button>
  </div>
    </div>
  );
};

export default RecipeReviewList;