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

const RecipeInstruction = ({ instructions }) => {
  if (instructions !== null) {
    instructions = instructions.split('.');
  }
  return (
    <ol dangerouslySetInnerHTML={{
      __html: instructions !== null ? instructions.slice(0, instructions.length - 1).map((inst) => (
        `${inst}.`
      )) : 'No instructions. Good Luck',
    }}
    />
  );
};

export default RecipeInstruction;
