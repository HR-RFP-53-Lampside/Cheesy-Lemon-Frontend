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

const RecipeInstruction = ({instructions}) => {

  const instructionsArr = instructions.split('.');

  return (
    <ol>
      {instructionsArr.slice(0, instructionsArr.length - 1).map((inst) => (
        <li>{inst + '.'}</li>
      ))}
    </ol>
  );
};

export default RecipeInstruction;
