import React, { useContext, useState } from 'react';
import {
  Card, CardActionArea, CardActions, CardContent, CardMedia, Paper, Box, Typography, TextField, Button, IconButton, Container, Hidden,
 } from '@material-ui/core';
import Image from 'material-ui-image';
import { Link } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';

import SpacingDesign from '../context/design/SpacingDesign';
import LogStatus from '../context/auth/LogStatus';
import backgroundBG from '../../assets/lowpoly2.png';

const RecipeReviewItem = ({reviewDeets}) => {

  const themeDesign = useTheme();
  // place holder  until we get actual review data... just have to change map to map over reviedeets
  const faykeReviewsList = [
    {
     title: 'No more Onions!',
     auth: 'Bargle',
     body: 'I\'ve had it with all of these onions in this kitchen!',
  },
  {
     title: 'Needs more Onions!',
     auth: 'NotAnOnionFarmer',
     body: 'This recipe was pretty good, but it needed more onion! I recommend duodecupleing the ammount of onions.',
  },
  {
    title: 'New Family Favorite!',
    auth: 'DominicToretto',
    body: 'Made this for the Family and they loved it, and Family is everything!',
  }
];

  return (
    <Card
      style={{ ...SpacingDesign.margin(2), border: "none"}}
      elevation={0}
    >
        <div
        style={{width: 'auto'} }
        >
          {faykeReviewsList.map((item) => (
              <Paper
              style={{...SpacingDesign.padding(1), ...SpacingDesign.marginBottom(2), border: "1px solid lightgrey", color: themeDesign.custom.muted.grey}}
              elevation={3}
              >
                <Typography component="div">
                  <Box
                  align="center"
                  fontWeight="fontWeightBold"
                >
                  {item.title}
                  </Box>
                </Typography>
                <Typography component="div">
                  <Box
                    style={SpacingDesign.padding(1)}
                    align="left"
                  >
                    {item.auth}
                  </Box>
                </Typography>
                <Typography component="div">
                  <Box
                  align="left"
                >
                  {item.body}
                  </Box>
                </Typography>
          </Paper>
        ))}</div>
    </Card>
  );
};

export default RecipeReviewItem;
