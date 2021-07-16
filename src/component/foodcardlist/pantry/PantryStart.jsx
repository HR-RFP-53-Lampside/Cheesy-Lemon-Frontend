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
import endPoint from '../../../routing'
import SpacingDesign from '../../context/design/SpacingDesign';
import theme from '../../context/design/ThemeDesign';
import LogStatus from '../../context/auth/LogStatus';
import PantryContext from '../../context/foodies/PantryContext';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

//remove ingredient from firebase so it is not persisted on reload -
//resize ingredient card/image - done
//filter on enter key press reloads entire page - done



const PantryStart = () => {
  const history = useHistory();
  const themeDesign = useTheme();
  const [select, setSelect] = useState([]);
  const [filter, setFilter] = useState('');
  const [logStatus] = useContext(LogStatus);
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useContext(PantryContext);

  const handleFilter = (e) => {
    e.preventDefault();
    setFilter(e.target.value.toLowerCase());
  }

  useEffect(() => {
    if(logStatus) {
      const ing = [];
      for(let i in logStatus.pantry) {
        ing.push(logStatus.pantry[i]);
      }
      setIngredients(ing);
    }
  }, [logStatus]);

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
    e.preventDefault();
    // logic to handleingredient already in pantry
    for (let ingredient of ingredients) {
      if (ingredient.name.toLowerCase() === filter.toLowerCase()) {
        setFilter('');
        return;
      }
    }
    if(filter.length >= 3) {
      endPoint.recipes.getIngredient(filter)
        .then((result) => {
          setFilter('');
          let img = `https://spoonacular.com/cdn/ingredients_500x500/${result.data.status.results[0].image}`;
          let name = result.data.status.results[0].name;
          // pantry should update when context changes, so shouldn't need to set filter
          let obj = {
            "name": name,
            "image": img,
            "num": 1
          }
          setIngredients([...ingredients, obj]);
          const newIngredientKey = firebase.database().ref().child(`users/${logStatus.uid}/pantry`).push().key;
          const updates = {};
          updates[`users/${logStatus.uid}/pantry/${newIngredientKey}`] = { id: newIngredientKey, name, image:img, count: 1 }
          firebase.database().ref().update(updates).catch(console.error);
        })
        .catch((e) => { throw e; })
    }
  }
  const handlePhoto = (e) => {
    let obj = {}
    const file = [...e.target.files];
    obj['file'] = file;

    //photo doesn't currently go anywhere
    //send to veryfi to get ingredients
  }

  const handleSelect = (e) => {
    let name = e.target.name;

    if (select.indexOf(name) === -1) {
      setSelect([...select, name]);
    } else {
      setSelect(select.filter(item => item !== name));
    }
  }

  const handleWFD = (e) => {
    //implement firebase add ingredients too
    endPoint.recipes.getRecipeIngredients({
      ingredients: select,
      diets: logStatus.diets
    })
    .then(async (response) => {
      await setRecipes(response.data);
      history.push('/wfd');
    })
    .catch((err) => {
      throw err;
    })
  }

  useEffect(() => {
    //watch for change in ingredients list and update select list
  }, [ingredients])

  return (
    <Box style={{ ...SpacingDesign.marginBottom(1) }}>
      <form noValidate autoComplete="off" onSubmit={handleSubmit} onChange={handleFilter}>
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

          <Button variant='outlined' onClick={handleWFD} style={{...SpacingDesign.marginy(1.5)}}>WFD</Button>

            <input accept="image/*"  id="icon-button-file" type="file" hidden onChange={(e) => {handlePhoto(e)}}/>
            <label htmlFor="icon-button-file">
              <IconButton  aria-label="upload picture" component="span">
                <CameraAltOutlinedIcon style={{ ...SpacingDesign.fontSize(5)}}></CameraAltOutlinedIcon>
              </IconButton>
            </label>
        </Box>

        <Typography variant='h4' align='center' >
          My Pantry
        </Typography>



        {ingredients.filter(main => {
          return (main.name.toLowerCase().indexOf(filter) !== -1)
        })
            .map((item, index) =>
            <PantryCard key={item.name} item={item} name={item.name} delete={handleDelete} select={handleSelect} selected={select}/>
          )}
      </Container>
    </Box>
 )
}

export default PantryStart;
