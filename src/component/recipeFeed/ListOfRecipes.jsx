import React, { useState } from 'react';
import {
  Paper, Box, Typography, TextField, Button, Container, Hidden, Card, Icon,
} from '@material-ui/core';
import Image from 'material-ui-image';
import { Link } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';

const listOfRecipes = ({data, selected}) => {

    const handleClick = () => {
        // on click of title redirect to card of recipe reviews
    }
    // filter results by selected 
        // if most reviewed === selected filter first
            // if most favorited === selected filter
            //or my reviews === selected filter
    return (
        <Card >
        <Typography variant="h2" align="center" style={{ color: themeDesign.custom.muted.grey }} onClick={handleClick()}>
       { title }
      </Typography>
       <Typography variant="h2" align="center" style={{ color: themeDesign.custom.muted.grey }}>
       { body }
     </Typography>
      <Typography variant="h2" align="center" style={{ color: themeDesign.custom.muted.grey }}>
      Favorite <Icon class="fas fa-hashtag"></Icon>
      <Typography variant="h2" align="center" style={{ color: themeDesign.custom.muted.grey }} >
      <Icon class="fas fa-hashtag"></Icon>
          Reviews
        </Typography>
    </Typography>
    </Card>
    )
}


export default listOfRecipes