import React, { useContext, useState, useEffect } from 'react';
import {
 Card, CardActionArea, CardActions, CardContent, CardMedia, Paper, Box, Typography, TextField, Button, IconButton, Container, Hidden,
} from '@material-ui/core';
import Image from 'material-ui-image';
import { Link, useHistory } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import SpacingDesign from '../../context/design/SpacingDesign';
import LogStatus from '../../context/auth/LogStatus';
import endPoint from '../../../routing';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const FavoritesStart = () => {
  const themeDesign = useTheme();
  const [filter, setFilter] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [logStatus] = useContext(LogStatus);

  useEffect(() => {
    const favs = [];
    if(logStatus) {
      for(let i in logStatus.favRecipes) {
        favs.push(logStatus.favRecipes[i]);
        // endPoint.recipes.getRecipeById(logStatus.favRecipes[i].backendId)
        //   .then(({data}) => {
        //     setFavorites(favorites => [...favorites, data.status]);
        //   })
        //   .catch(err => {
        //     console.error(err);
        //   });
      }
      setFavorites(favs);
    }
  }, [logStatus]);

  const removeFavorite = (e) => {
    e.preventDefault();
    const index = e.currentTarget.value;
    const clickedId = favorites[index].backendId;
    for (let key in logStatus.favRecipes) {
      if (logStatus.favRecipes[key].backendId == clickedId) {
        firebase.database().ref(`users/${logStatus.uid}/favRecipes/${key}`).remove().then(() => endPoint.reviews.putRecipeFavorite(clickedId, true)).catch(console.error);

      }
    }
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
            <Card style={{ ...SpacingDesign.marginy(3)}} elevation={5} key={item.backendId}>
              <CardActionArea
                component={Link} to={`recipe/${item.backendId}`}
                >
                <CardContent>
                  <CardMedia
                    style={{ ...SpacingDesign.height(40)}}
                    image={item.image}
                    title={item.title}
                  />
                  <Typography variant='h5' align='center' style={{...SpacingDesign.marginTop(3)}}>
                    {item.title}
                  </Typography>
                  <Box display="flex">
                    <Box m="auto">
                      <IconButton onClick={removeFavorite} value={index}>
                        <HighlightOffIcon style={{ ...SpacingDesign.fontSize(5) }} ></HighlightOffIcon>
                      </IconButton>
                    </Box>
                  </Box>
              </CardContent>
              </CardActionArea>
            </Card>
        )}
      </Container>
    </Box>
 )
}

export default FavoritesStart;
