import React, { useState } from 'react';
import {
  Paper, Box, Typography, TextField, Button, Container, Hidden, Select,
} from '@material-ui/core';
import Image from 'material-ui-image';
import { Link } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import axios from 'axios'
import listOfRecipes  from './ListOfRecipes';
const RecipeFeed = ({userData}) => {
//user data will be data about recipes and display the title, body and favorite/#ofreviews
    // add click listener to recipe title that will take user to all info about recipe
    // be able to filter recipe info from select tag by most liked or most commented or my reviews
const [filterOptions, setFilterOptions] = useState(['Most Reviews', 'My Reviewed', 'Most Favorites'])
const [selected, setSelected] = useState('')
const handleNewFilter = (e) => {
setSelected(e.target.value)
}

const test = [
  {
    title: 'banana',
    body: 'this banana is the wworst in the world I hate bananas besides this one',
    favorite: 5,
    reviews: 3
  },
  {
    title: 'grapes',
    body: 'this banana is the wworst in the world I hate bananas besides this one',
    favorite: 5,
    reviews: 3
  },
  {
    title: 'steak dinner',
    body: 'this banana is the wworst in the world I hate bananas besides this one tgere us ou reason to east meant',
    favorite: 5,
    reviews: 3
  },
  {
    title: 'hariy peanuts',
    body: 'this banana is the wworst in the world I hate bananas besides this one I love peanuts bc I am an eleeghan',
    favorite: 5,
    reviews: 3
  },
  {
    title: 'my guy is so good',
    body: 'this banana is the wworst in the world I hate bananas besides this one and I cant wait to eat this banana',
    favorite: 5,
    reviews: 3
  },
]


// this will be directed to from social file
return (
    <Box display='flex'>
        <Container maxWidth='sm'
        style={{
            flexGrow: 1, flexBasis: '20%', alignSelf: 'center', maxHeight: '90vh',
          }}>
              <Typography variant="h2" align="center" style={{ color: themeDesign.custom.muted.grey }}>
          Recipe Feed
        </Typography>
              <Select value={filterOptions} onChange={handleNewFilter}>{filterOptions.map((item) => (
                  {item}
              ))}</Select>
        <listOfRecipes data={userData} selected={selected} test={test}/>
          </Container>
    </Box>
)

}



export default RecipeFeed