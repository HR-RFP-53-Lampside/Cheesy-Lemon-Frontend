import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import {
 Card, CardActionArea, CardActions, CardContent, CardMedia, Paper, Box, Typography, TextField, Button, IconButton, Container, Hidden, FormLabel, FormControl, FormGroup, FormControlLabel, FormHelperText, Checkbox, ButtonGroup
} from '@material-ui/core';
import Image from 'material-ui-image';
import { Link, useHistory } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import cheeseImg from './cheese-img.jpeg';
import lemonImg from './lemon-img.jpeg';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import PantryCard from './PantryCard';

// import { AddCircleOutlineOutlinedIcon, CameraAltOutlinedIcon, HighlightOffIcon} from '@material-ui/icons';



import SpacingDesign from '../../context/design/SpacingDesign';
import theme from '../../context/design/ThemeDesign';

const data = [
  {
    "name": "Lemons",
    "image": lemonImg,
    "num": 1
  },
  {
    "name": "Cheese",
    "image": cheeseImg,
    "num": 1
  }
]

const PantryStart = () => {
  const themeDesign = useTheme();
  const [ingredients, setIngredients] = useState(data);
  const [select, setSelect] = useState([]);
  const [filter, setFilter] = useState('');

  const handleFilter = (e) => {

    setFilter(e.target.value.toLowerCase());
  }

  const handleDelete = (e) => {
    e.preventDefault();
    let name = e.currentTarget.value;

    ingredients.forEach((item, index) => {
      let temp = ingredients;
      if(item.name === name) {
        ingredients.splice(index, 1);
        setIngredients([...ingredients]);
      }
    })
  }

  const handleSubmit = (e) => {
    if(filter.length >= 3) {
      console.log(e.target)
      axios.get(`http://localhost:8000/api/ingredients/${filter}/search`)
        .then((result) => {
          setFilter('');
          let img = `https://spoonacular.com/cdn/ingredients_500x500/${result.data.status.results[0].image}`;
          let name = result.data.status.results[0].name;

          let obj = {
            "name": name,
            "image": img,
            "num": 1
          }
          setIngredients([...ingredients, obj]);
        })
        .catch((e) => { throw e; })
    }
  }

  useEffect(() => {
    //watch for change in ingredients list and update select list
  }, [ingredients])

  return (
    <Box style={{ ...SpacingDesign.marginBottom(1) }}>
      <form noValidate autoComplete="off" onChange={handleFilter}>
        <TextField
          id="search"
          label="Filter/Add"
          fullWidth
          variant='outlined'
        />
      </form>

      <Container
        style={{
          height: 'auto',
          ...SpacingDesign.marginBottom(1),
          ...SpacingDesign.marginTop(1),
          ...SpacingDesign.padding(0)
        }}
        elevation={1}>

        <Box display='flex' flexDirection='row-reverse' justifyContent='space-between'style={{...SpacingDesign.paddingTop(0)}}>
          <IconButton onClick={handleSubmit}>
            <AddCircleOutlineOutlinedIcon style={{ ...SpacingDesign.fontSize(5)}}></AddCircleOutlineOutlinedIcon>
          </IconButton>

          <IconButton>
            <CameraAltOutlinedIcon style={{ ...SpacingDesign.fontSize(5)}}></CameraAltOutlinedIcon>
          </IconButton>
        </Box>


        <Typography variant='h4' align='center' >
          My Pantry
        </Typography>

        <input  type='file' accept="image/*;capture=camera" />


        {ingredients.filter(main => {
          return (main.name.toLowerCase().indexOf(filter) !== -1)
        })
            .map((item, index) =>
            <PantryCard item={item} name={item.name} delete={handleDelete}/>

          )}
      </Container>
    </Box>
 )
}

export default PantryStart;
