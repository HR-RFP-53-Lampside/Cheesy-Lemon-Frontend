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

const RecipeDescription = () => {

  return (
    <div>
      <div>Fancy BowTie Pasta, Tiny little trees Delicious, Delicious Bacon and a dusting of Parmasean cheese. Also that may or may not be a chunk of chicken in the middle of the picture there...Bon appetite!</div>
    </div>
  );
};

export default RecipeDescription;