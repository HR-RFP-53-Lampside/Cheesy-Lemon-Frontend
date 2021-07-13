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

const RecipeFocusStart = () => {

  const themeDesign = useTheme();
  const hardCodePic = "https://spoonacular.com/recipeImages/654901-556x370.jpg";
  const titleHardCode = {
    name: "UBER YUMMY TITLE",
  }
  return (

      <Box display="flex">
      <Container
        maxWidth="sm"
        style={{
          flexGrow: 1, flexBasis: '20%', alignSelf: 'center', maxHeight: '90vh', overflow: 'hidden', flexWrap: 'wrap',
        }}
      >
      <Image
        src={hardCodePic}
        cover
        imageStyle={{ width: '100%', height: '100%', overflow: 'hidden' }}
        style={{ height: '100%' }}
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
      </Container>
    </Box>
  );
};

export default RecipeFocusStart;