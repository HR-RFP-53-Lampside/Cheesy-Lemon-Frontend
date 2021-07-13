import React, { useContext, useState } from 'react';
import {
  Paper, Box, Typography, TextField, Button, IconButton, Container, Hidden, ImageListItemBar,
} from '@material-ui/core';
import Image from 'material-ui-image';
import { Link } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';

import SpacingDesign from '../context/design/SpacingDesign';
import LogStatus from '../context/auth/LogStatus';
import backgroundBG from '../../assets/lowpoly2.png';
import RecipeIngredientsList from './RecipeIngredientsList';
import RecipeInstructionsList from './RecipeInstructionsList';
import RecipeDescription from './RecipeDescription';
import RecipeReviewList from './RecipeReviewList';

import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
// import ImageListItemBar from '@material-ui/core/ImageListItemBar';
// import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const RecipeFocusStart = () => {

  const themeDesign = useTheme();
  const hardCodePic = "https://spoonacular.com/recipeImages/654901-556x370.jpg";
  const titleHardCode = {
    name: "UBER YUMMY TITLE",
  }
  return (
    <Paper
      style={SpacingDesign.padding(3)}
    >
      <Image
        src={hardCodePic}
        cover
        // imageStyle={{ width: '100%', height: 'auto', overflow: 'hidden' }}
        // // style={{ height: '10%' }}
      />
        <Typography variant="h6" align="center" style={{ color: themeDesign.custom.muted.grey }}>
        RECIPE TITLE and put fav add/remove button here
        </Typography>
        <Typography variant="h6" align="left" style={{ color: themeDesign.custom.muted.grey }}>
        Description
        </Typography>
        <Typography variant="body1" align="left" style={{ color: themeDesign.custom.muted.grey }}>
        <RecipeDescription />
        </Typography>
        <Typography variant="h6" align="left" style={{ color: themeDesign.custom.muted.grey }}>
        Ingredients
        </Typography>
        <Typography variant="body1" align="left" style={{ color: themeDesign.custom.muted.grey }}>
        <RecipeIngredientsList />
        </Typography>
        <Typography variant="h6" align="left" style={{ color: themeDesign.custom.muted.grey }}>
        Instructions
        </Typography>
        <Typography variant="body1" align="left" style={{ color: themeDesign.custom.muted.grey }}>
        <RecipeInstructionsList />
        </Typography>
        <Typography variant="h6" align="left" style={{ color: themeDesign.custom.muted.grey }}>
        Reviews
        </Typography>
        <Typography variant="body1" align="left" style={{ color: themeDesign.custom.muted.grey }}>
        <RecipeReviewList />
        </Typography>
      </Paper>
  );
};

export default RecipeFocusStart;