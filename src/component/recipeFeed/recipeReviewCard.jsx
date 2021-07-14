import React, { useState } from 'react';
import {
  Paper, Box, Typography, TextField, Button, Container, Hidden, Card, Icon,
} from '@material-ui/core';
import Image from 'material-ui-image';
import { Link } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';

const recipeReviewCard = ({ userData }) =>
// create a card like template like for individual recipe that shows all reviews of recipe
  (
    <Typography>
      All Reviews for recipe id 135446

    </Typography>
  );

export default recipeReviewCard;
