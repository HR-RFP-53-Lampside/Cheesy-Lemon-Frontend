import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import {
 Card, CardActionArea, CardActions, CardContent, CardMedia, Paper, Box, Typography, TextField, Button, IconButton, Container, Hidden, FormLabel, FormControl, FormGroup, FormControlLabel, FormHelperText, Checkbox
} from '@material-ui/core';
import Image from 'material-ui-image';
import { Link, useHistory } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import cheeseImg from './cheese-img.jpeg';
import lemonImg from './lemon-img.jpeg';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
// import { AddCircleOutlineOutlinedIcon, CameraAltOutlinedIcon, HighlightOffIcon} from '@material-ui/icons';



import SpacingDesign from '../../context/design/SpacingDesign';
import theme from '../../context/design/ThemeDesign';

const data = [
  {
    "name": "Lemons",
    "image": lemonImg,
    "selected": false
  },
  {
    "name": "Cheese",
    "image": cheeseImg,
    "selected": false
  }
]



const PantryStart = () => {
  const themeDesign = useTheme();
  const [ingredients, setIngredients] = useState(data);
  const [selected, setSelected] = useState([])
  const [filter, setFilter] = useState('');

  const handleFilter = (e) => {
    setFilter(e.target.value.toLowerCase());
  }

  const handleSelect = (e) => {
    console.log(e.target.name)
  }

  const handleSubmit = (e) => {
    if(filter.length < 3) {
      console.log('not long enough');
    } else {
      // console.log(filter);

      // axios.get(`http://localhost:8000/api/ingredients/${filter}/search`)
      //   .then((result) => {
      //     let img = `https://spoonacular.com/cdn/ingredients_500x500/${result.data.status.results[0].image}`;
      //     let name = result.data.status.results[0].name;

      //     let obj = {
      //       "name": name,
      //       "image": img,
      //       "selected": false
      //     }

      //     setIngredients([...ingredients, obj]);
      //   })
      //   .catch((e) => { console.log(e) })
    }

  }

  useEffect(() => {
    //watch for change in ingredients list and update selected list
  }, [ingredients])

  return (
    <Box style={{ ...SpacingDesign.marginBottom(1) }}>
      <form noValidate autoComplete="off" onChange={handleFilter}>
        <TextField
          id="search"
          label="Filter"
          fullWidth
          variant='outlined'
          borderRadius='50%'
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

        {data.filter(main => {
          return (main.name.toLowerCase().indexOf(filter) !== -1)
        })
            .map((item) =>
            <Card style={{ ...SpacingDesign.marginy(3) }} elevation={5}>
              <CardContent>
                <CardMedia
                  style={{ ...SpacingDesign.height(40) }}
                  image={item.image}
                  title={item.name}
                />
                <Box display='flex' flexDirection='column'>
                  <Typography variant='h5' align='center' style={{ ...SpacingDesign.marginTop(3) }}>
                    {item.name}
                  </Typography>
                  <Box display='flex' justifyContent='space-between' style={{
                    // ...SpacingDesign.marginx(1),
                    ...SpacingDesign.marginLeft(4.5),
                    ...SpacingDesign.marginRight(2.5),
                  }}>
                    <FormControlLabel
                      control={<Checkbox onClick={handleSelect} name={item.name} style={{ transform: 'scale(1.5)' }} />}
                    />
                    <IconButton >
                      <HighlightOffIcon style={{ ...SpacingDesign.fontSize(5) }}></HighlightOffIcon>
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          )}




      </Container>
    </Box>
 )
}

export default PantryStart;
