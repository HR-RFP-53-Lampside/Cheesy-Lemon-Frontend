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
import AddReviewForm from './AddReviewForm';

const RecipeReviewList = ({recipieId, reviewDeets}) => {
  const themeDesign = useTheme();

  return (
    <div>
      <AddReviewForm
        // Expects current recipeId as a prop
        recipeId={recipieId}
      />
      <div>
        <RecipeReviewItem reviewDeets={reviewDeets}/>
      </div>
      <div style={{ align: "center" }}>
      </div>
    </div>
  );
};

export default RecipeReviewList;