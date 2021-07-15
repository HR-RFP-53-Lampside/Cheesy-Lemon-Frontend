import React, { useContext, useState, useEffect } from 'react';
import {
 Card, CardActionArea, CardActions, CardContent, CardMedia, Paper, Box, Typography, TextField, Button, IconButton, Container, Hidden,
} from '@material-ui/core';
import Image from 'material-ui-image';
import { Link, useHistory } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import SpacingDesign from '../../context/design/SpacingDesign';

const data = [
  {
     "id":715594,
     "title":"Homemade Garlic and Basil French Fries",
     "image":"https://spoonacular.com/recipeImages/715594-312x231.jpg"
  },
  {
     "id":644387,
     "title":"Garlicky Kale",
     "image":"https://spoonacular.com/recipeImages/644387-312x231.jpg"
  },
  {
     "id":794349,
     "title":"Broccoli and Chickpea Rice Salad",
     "image":"https://spoonacular.com/recipeImages/794349-312x231.jpg"
  },
  {
     "id":782600,
     "title":"Quinoa Salad with Vegetables and Cashews",
     "image":"https://spoonacular.com/recipeImages/782600-312x231.jpg"
  },
  {
     "id":640062,
     "title":"Corn Avocado Salsa",
     "image":"https://spoonacular.com/recipeImages/640062-312x231.jpg"
  }
]

const FavoritesStart = () => {
  const themeDesign = useTheme();
  const [filter, setFilter] = useState('');
  const [favorites, setFavorites] = useState([]);

  //ADJUST FOR LIVE DATA
  useEffect(() => {
    setFavorites(data);
  }, [data]);

  const removeFavorite = (e) => {
    e.preventDefault();
    let index = e.currentTarget.value;
    let copy = favorites.slice();

    //remove from ingredients list and set new list
    copy.splice(index, 1);
    setFavorites(copy);

    //UPDATE USER FAVORITES ON FIREBASE

  }

  const handleFilter = (e) => {
    setFilter(e.target.value.toLowerCase());
  }

  return (
    <Box style={{...SpacingDesign.marginBottom(1)}}>
        <form noValidate autoComplete="off" onChange={handleFilter}>
          <TextField
            id="search"
            label="Filter"
            fullWidth
            variant='outlined'
          />
        </form>

        <Container
          style={{
            height: 'auto',
            ...SpacingDesign.marginTop(3),
            ...SpacingDesign.marginBottom(1),
            ...SpacingDesign.paddingx(0)
          }}
          elevation={1}>
          <Typography variant='h4' align='center'>
            Favorites
          </Typography>

          {favorites.filter(main => main.title.toLowerCase().indexOf(filter) !== -1)
            .map((item, index) =>
              <Card style={{ ...SpacingDesign.marginy(3)}} elevation={5} key={item.id}>
                <CardActionArea
                  component={Link} to={`recipe/${item.id}`}
                  >
                  <CardContent>
                  <IconButton onClick={removeFavorite} value={index}>
                    <HighlightOffIcon style={{ ...SpacingDesign.fontSize(5) }} ></HighlightOffIcon>
                  </IconButton>
                  <CardMedia
                    style={{ ...SpacingDesign.height(40)}}
                    image={item.image}
                    title={item.title}
                  />
                    <Typography variant='h5' align='center' style={{...SpacingDesign.marginTop(3)}}>
                      {item.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
          )}
        </Container>
      {/* </Container> */}
    </Box>
 )
}

export default FavoritesStart;
