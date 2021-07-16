/* eslint-disable no-loop-func */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-unresolved */
import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Paper, Typography, Button, Icon, CircularProgress, Box,
} from '@material-ui/core';
import Image from 'material-ui-image';
import axios from 'axios';
import FavoriteIcon from '@material-ui/icons/Favorite';
import firebase from 'firebase/app';
import SpacingDesign from '../context/design/SpacingDesign';
import LogStatus from '../context/auth/LogStatus';
import RecipeIngredientsList from './RecipeIngredientsList';
import RecipeInstructionsList from './RecipeInstructionsList';
import RecipeDescription from './RecipeDescription';
import RecipeReviewList from './RecipeReviewList';
import endPoint from '../../routing';

import 'firebase/auth';
import 'firebase/database';

const RecipeFocusStart = () => {
  const [logStatus] = useContext(LogStatus);
  const [recipeDeets, setRecipeDeets] = useState([]);
  const { recipeId } = useParams();
  const isFaved = () => {
    let favorite = false;
    const faves = logStatus && logStatus.favRecipes;
    if (faves) {
      for (const key in faves) {
        // need current recipe ID
        if (faves[key].backendId === recipeId) {
          favorite = true;
        }
      }
    }
    return favorite;
  };
  const [clicked, setClicked] = useState(isFaved());
  const [reviewDeets, setReviewDeets] = useState([]);

  // const recipeId = 716429; // loading circle looks nice!

  let parsedRecipeSummary = '';

  if (recipeDeets.status) {
    const lastIndexOfPercent = recipeDeets.status.summary.lastIndexOf('%');
    parsedRecipeSummary = recipeDeets.status.summary.slice(0, lastIndexOfPercent);
  }

  const getRecipeData = () => {
    // axios.get(`http://localhost:8000/api/recipes/${recipeId}`)
    endPoint.recipes.getRecipeById(recipeId)
      .then((res) => {
        setRecipeDeets(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // getReviewsData();
    getRecipeData();
  }, []);

  const handleFavorite = () => {
    if (!clicked) {
      const newRecipeKey = firebase.database().ref().child(`users/${logStatus.uid}/favRecipes`).push().key;
      const updates = {};
      updates[`users/${logStatus.uid}/favRecipes/${newRecipeKey}`] = { id: newRecipeKey, backendId: recipeId, image: recipeDeets.status.image, title: recipeDeets.status.title };
      firebase.database().ref().update(updates).then(() => setClicked(true)).then(() => endPoint.reviews.putRecipeFavorite(recipeId, false)).catch(console.error);
    } else {
      for (const key in logStatus.favRecipes) {
        // need the current recipe id
        if (logStatus.favRecipes[key].backendId === recipeId) {
          firebase.database().ref(`users/${logStatus.uid}/favRecipes/${key}`).remove().then(() => setClicked(false)).then(() => endPoint.reviews.putRecipeFavorite(recipeId, true)).catch(console.error);
        }
      }
    }
  };

  return (
    <>
      {recipeDeets.status
        ? (
          <>
            <Paper
              style={SpacingDesign.padding(3)}
            >
              <Image
                src={recipeDeets.status.image || null}
                cover
              />
              <Typography variant="h4" align="center" color="textPrimary">
                {recipeDeets.status.title}
                <Button onClick={() => handleFavorite()}>
                  {!clicked
                    ? <Icon className="far fa-heart" allign="right" />
                    : <FavoriteIcon />}
                </Button>

              </Typography>
              <Typography variant="h5" align="left" color="textPrimary" style={SpacingDesign.marginBottom(1)}>
                Description
              </Typography>
              <Typography variant="body1" align="left" color="textSecondary">
                {parsedRecipeSummary
          && <RecipeDescription summary={parsedRecipeSummary} />}
              </Typography>
              <Typography variant="h5" align="left" color="textPrimary" style={SpacingDesign.marginTop(3)}>
                Ingredients
              </Typography>
              <Typography variant="body1" align="left" color="textSecondary">
                <RecipeIngredientsList ingredients={recipeDeets.status.extendedIngredients} />
              </Typography>
              <Typography variant="h5" align="left" style={{ ...SpacingDesign.marginTop(3) }} color="textPrimary">
                Instructions
              </Typography>
              <Typography variant="body1" align="left" color="textSecondary">
                <RecipeInstructionsList instructions={recipeDeets.status.instructions} />
              </Typography>
            </Paper>
            <Box>
              <RecipeReviewList recipeId={recipeDeets.status.id} />
            </Box>
          </>
        )
        :
      // nah, his component, or does the stuff we need only work on his local copy?
          <CircularProgress color="primary" align="right" />}
    </>
  );
};

export default RecipeFocusStart;
