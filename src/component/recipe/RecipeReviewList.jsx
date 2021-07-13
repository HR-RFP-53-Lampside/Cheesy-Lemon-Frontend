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

const RecipeReviewList = () => {
  const themeDesign = useTheme();
  return (
    <div>
    <div>map of three reviews here?</div>
      <Button style={{ color: themeDesign.custom.muted.grey }} >add Review</Button>
    </div>
  );
};

export default RecipeReviewList;