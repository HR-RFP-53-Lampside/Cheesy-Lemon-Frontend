/* eslint-disable import/no-unresolved */
import React, { useContext, useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import {
  Paper, Typography, Button, Icon, CircularProgress
} from '@material-ui/core';
import Image from 'material-ui-image';
import { useTheme } from '@material-ui/core/styles';
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
  const isFaved = () => {
    let favorite = false;
    const faves = logStatus && logStatus.favRecipes;
    if (faves) {
      for (let key in faves) {
        // need current recipe ID
        if (faves[key].backendId === 654901) {
         favorite = true;
        }
      }
    }
    return favorite;
  };
  const [logStatus] = useContext(LogStatus);
  const [recipeDeets, setRecipeDeets] = useState([]);
  const [reviewDeets, setReviewDeets] = useState([]);
  const [clicked, setClicked] = useState(isFaved());
  const themeDesign = useTheme();
  let { recipeId } = useParams();
  // const recipeId = 716429; // loading circle looks nice!

  useEffect(() => {

    // getReviewsData();
    getRecipeData();
  }, [] );
  let parsedRecipeSummary = ''

  if (recipeDeets.status) {
    const lastIndexOfPercent = recipeDeets.status.summary.lastIndexOf('%');
     parsedRecipeSummary = recipeDeets.status.summary.slice(0, lastIndexOfPercent);
  }

  const getRecipeData = () => {
    axios.get(`http://localhost:8000/api/recipes/${recipeId}`)
      .then((res) => {
        setRecipeDeets(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getReviewsData = () => {
    axios.get(`/local/${recipeId}/reviews/`)
      .then((res) => {
        setRewiewsDeets(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFavorite = () => {
    if (!clicked) {
      const newRecipeKey = firebase.database().ref().child(`users/${logStatus.uid}/favRecipes`).push().key;
      const updates = {};
      updates[`users/${logStatus.uid}/favRecipes/${newRecipeKey}`] = { id: newRecipeKey, backendId: faykeRecipeData.status.id };
      firebase.database().ref().update(updates).then(() => setClicked(true)).then(() => endPoint.reviews.putRecipeFavorite(faykeRecipeData.status.id, false)).catch(console.error);
    } else {
      for (let key in logStatus.favRecipes) {
        // need the current recipe id
        if (logStatus.favRecipes[key].backendId === faykeRecipeData.status.id) {
          firebase.database().ref(`users/${logStatus.uid}/favRecipes/${key}`).remove().then(() => setClicked(false)).then(() => endPoint.reviews.putRecipeFavorite(faykeRecipeData.status.id, true)).catch(console.error);
        }
      }
    }
  };



  return (
    <>
    {recipeDeets.status ?
    <Paper
      style={SpacingDesign.padding(3)}
  >
        <Image
        src={recipeDeets.status.image || null}
        cover
      />
      <Typography variant="h6" align="center" style={{ color: themeDesign.custom.muted.grey }}>
        {recipeDeets.status.title}
        <Button onClick={(e) => handleFavorite()}>
          {!clicked
            ? <Icon className="far fa-heart" allign="right" />
            : <FavoriteIcon />}
        </Button>

      </Typography>
      <Typography variant="h6" align="left" style={{ color: themeDesign.custom.muted.grey }}>
        Description
      </Typography>
      <Typography variant="body1" align="left" style={{ color: themeDesign.custom.muted.grey }}>
        {parsedRecipeSummary &&
        <RecipeDescription summary={parsedRecipeSummary}  />
        }
      </Typography>
      <Typography variant="h6" align="left" style={{ color: themeDesign.custom.muted.grey }}>
        Ingredients
      </Typography>
      <Typography variant="body1" align="left" style={{ color: themeDesign.custom.muted.grey }}>
        <RecipeIngredientsList ingredients={recipeDeets.status.extendedIngredients} />
      </Typography>
      <Typography variant="h6" align="left" style={{ color: themeDesign.custom.muted.grey }}>
        Instructions
      </Typography>
      <Typography variant="body1" align="left" style={{ color: themeDesign.custom.muted.grey }}>
        <RecipeInstructionsList instructions={recipeDeets.status.instructions} />
      </Typography>
      <Typography variant="h6" align="left" style={{ color: themeDesign.custom.muted.grey }}>
        Reviews
      </Typography>
      <Typography variant="body1" align="left" style={{ color: themeDesign.custom.muted.grey }}>
        <RecipeReviewList recipeId={recipeDeets.status.id} reviews={reviewDeets}/>
      </Typography>
    </Paper>
    :
     // nah, his component, or does the stuff we need only work on his local copy?
    <CircularProgress color="primary" align="right"/>
    }
    </>
  );
};

export default RecipeFocusStart;
