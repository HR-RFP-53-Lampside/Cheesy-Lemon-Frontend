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

const RecipeIngredient = ({ingredients}) => {

  const firstHalfFaykeIng = ingredients.slice(0, Math.ceil(ingredients.length / 2));
  const secondHalfFaykeDataIng = ingredients.slice(Math.ceil(ingredients.length / 2));
  // 50% width max height
  return (

    <Box
    display="flex"
    flexDirection="col"
    flexWrap="nowrap"

    style={SpacingDesign.padding(3)}
    >
    <div style={{width: '50%'}}>{firstHalfFaykeIng.map((item) => (
  <p style={{flexDirection: "col"}}>{item}</p>
))}</div>
    <div style={{width: '50%'}}>{secondHalfFaykeDataIng.map((item) => (
  <p style={{flexDirection: "col"}}>{item}</p>
))}</div>
      </Box>
  );
};

export default RecipeIngredient;

// {faykeIngeredients.map((item) => (
//   <p style={{flexDirection: "col"}}>{item}</p>
// ))}