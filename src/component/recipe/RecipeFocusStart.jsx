<<<<<<< HEAD
import React, { useContext, useState, useEffect } from 'react';
=======
/* eslint-disable import/no-unresolved */
import React, { useContext, useState } from 'react';
>>>>>>> main
import {
  Paper, Typography, Button, Icon,
} from '@material-ui/core';
import Image from 'material-ui-image';
import { useTheme } from '@material-ui/core/styles';
// import axios from 'axios';
import FavoriteIcon from '@material-ui/icons/Favorite';
import firebase from 'firebase/app';
import SpacingDesign from '../context/design/SpacingDesign';
import LogStatus from '../context/auth/LogStatus';
import RecipeIngredientsList from './RecipeIngredientsList';
import RecipeInstructionsList from './RecipeInstructionsList';
import RecipeDescription from './RecipeDescription';
import RecipeReviewList from './RecipeReviewList';

import 'firebase/auth';
import 'firebase/database';

const RecipeFocusStart = () => {
<<<<<<< HEAD
  const [id, setId] = useState()
=======
>>>>>>> main
  const [logStatus] = useContext(LogStatus);
  const [recipeDeets, setRecipeDeets] = useState([]);
  const [reviewDeets, setReviewDeets] = useState([]);
  const [clicked, setClicked] = useState(false);
  const themeDesign = useTheme();

  useEffect(() => {
    setId(window.location.href.split('/')[4])
    // getReviewsData();
    // getRecipeData();
  });

  const faykeRecipeData = {
<<<<<<< HEAD
    "status": {
      "title": "Pasta With Chicken and Broccoli",
      "id": 654901,
        "summary": "Pasta With Chicken and Broccoli might be a good recipe to expand your main course repertoire. This recipe makes 4 servings with <b>332 calories</b>, <b>19g of protein</b>, and <b>18g of fat</b> each. For <b>$1.46 per serving</b>, this recipe <b>covers 16%</b> of your daily requirements of vitamins and minerals. 3 people found this recipe to be flavorful and satisfying. A mixture of wine, parmesan cheese, basil leaves, and a handful of other ingredients are all it takes to make this recipe so yummy. It is brought to you by Foodista. From preparation to the plate, this recipe takes approximately <b>approximately 45 minutes</b>. Taking all factors into account, this recipe <b>earns a spoonacular score of 55%</b>, which is solid. Similar recipes are <a href=\"https://spoonacular.com/recipes/pasta-house-pasta-con-broccoli-this-is-an-alfredo-based-sauce-that-combines-pasta-fresh-mushrooms-and-fresh-broccoli-601199\">Pasta House Pasta con Broccoli – This is an Alfredo based sauce that combines pasta, fresh mushrooms, and fresh broccoli</a>, <a href=\"https://spoonacular.com/recipes/broccoli-and-pasta-with-chicken-479320\">Broccoli and Pasta with Chicken</a>, and <a href=\"https://spoonacular.com/recipes/pasta-with-chicken-and-broccoli-110475\">Pasta With Chicken and Broccoli</a>.",
        "instructions": "In a large skillet, heat oil over medium heat. Sautee garlic for about one minute, stirring constantly. DO NOT BURN.\nAdd the chicken and cook until well done. Add the broccoli and cook until crisp but tender. Add basil; red pepper; salt and pepper to taste; wine and chicken broth. cook for about 5 minutes.\nAdd the cooked and drained pasta to the skillet and toss to combine.\nHeat for 1 to 2 minutes Serve.\nTop with grated Parmesan cheese if desired.",
        "extendedIngredients": [
            "olive oil",
            "chicken breasts",
            "red pepper flakes",
            "cooked lasagna noodles",
            "garlic cloves",
            "broccoli florets",
            "dried basil leaves",
            "white wine",
            "chicken broth",
            "parmesan cheese"
        ],
        "image": "https://spoonacular.com/recipeImages/654901-556x370.jpg",
        "diets": []
    }
}

  const lastIndexOfPercent = faykeRecipeData.status.summary.lastIndexOf('%');
  const parsedRecipeSummary = faykeRecipeData.status.summary.slice(0, lastIndexOfPercent);

=======
    status: {
      title: 'Pasta With Chicken and Broccoli',
      id: 654901,
      summary: 'Pasta With Chicken and Broccoli might be a good recipe to expand your main course repertoire. This recipe makes 4 servings with <b>332 calories</b>, <b>19g of protein</b>, and <b>18g of fat</b> each. For <b>$1.46 per serving</b>, this recipe <b>covers 16%</b> of your daily requirements of vitamins and minerals. 3 people found this recipe to be flavorful and satisfying. A mixture of wine, parmesan cheese, basil leaves, and a handful of other ingredients are all it takes to make this recipe so yummy. It is brought to you by Foodista. From preparation to the plate, this recipe takes approximately <b>approximately 45 minutes</b>. Taking all factors into account, this recipe <b>earns a spoonacular score of 55%</b>, which is solid. Similar recipes are <a href="https://spoonacular.com/recipes/pasta-house-pasta-con-broccoli-this-is-an-alfredo-based-sauce-that-combines-pasta-fresh-mushrooms-and-fresh-broccoli-601199">Pasta House Pasta con Broccoli – This is an Alfredo based sauce that combines pasta, fresh mushrooms, and fresh broccoli</a>, <a href="https://spoonacular.com/recipes/broccoli-and-pasta-with-chicken-479320">Broccoli and Pasta with Chicken</a>, and <a href="https://spoonacular.com/recipes/pasta-with-chicken-and-broccoli-110475">Pasta With Chicken and Broccoli</a>.',
      instructions: 'In a large skillet, heat oil over medium heat. Sautee garlic for about one minute, stirring constantly. DO NOT BURN.\nAdd the chicken and cook until well done. Add the broccoli and cook until crisp but tender. Add basil; red pepper; salt and pepper to taste; wine and chicken broth. cook for about 5 minutes.\nAdd the cooked and drained pasta to the skillet and toss to combine.\nHeat for 1 to 2 minutes Serve.\nTop with grated Parmesan cheese if desired.',
      extendedIngredients: [
        'olive oil',
        'chicken breasts',
        'red pepper flakes',
        'cooked lasagna noodles',
        'garlic cloves',
        'broccoli florets',
        'dried basil leaves',
        'white wine',
        'chicken broth',
        'parmesan cheese',
      ],
      image: 'https://spoonacular.com/recipeImages/654901-556x370.jpg',
      diets: [],
    },
  };
  const lastIndexOfPercent = faykeRecipeData.status.summary.lastIndexOf('%');
  const parsedRecipeSummary = faykeRecipeData.status.summary.slice(0, lastIndexOfPercent);

  // this is where i make a query to the backend and get all of the things,
  // in regards to this particular recipe
>>>>>>> main

  const getRecipeData = () => {
    axios.get(`api/recipe/${id}`)
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
<<<<<<< HEAD
    if (!clicked) {
      const newRecipeKey = firebase.database().ref().child(`users/${logStatus.uid}/favRecipes`).push().key;
      const updates = {};
      updates[`users/${logStatus.uid}/favRecipes/${newRecipeKey}`] = {id: newRecipeKey, backendId: faykeRecipeData.status.id}
      firebase.database().ref().update(updates).then(() => setClicked(true)).catch(console.error);
    } else {
      for (let key in logStatus.favRecipes) {
        if (logStatus.favRecipes[key].backendId === faykeRecipeData.status.id ) {
          firebase.database().ref(`users/${logStatus.uid}/favRecipes/${key}`).remove().then(() => setClicked(false)).catch(console.error);
          break;
        }
      }
    }
  }
=======
    // addToFavRecipes
    // if clicked set to false
    if (!clicked) {
      const newRecipeKey = firebase.database().ref().child(`users/${logStatus.uid}/favRecipes`).push().key;
      const updates = {};
      updates[`users/${logStatus.uid}/favRecipes/${newRecipeKey}`] = { id: newRecipeKey, backendId: faykeRecipeData.status.id };
      firebase.database().ref().update(updates).catch((error) => console.error(error));
      setClicked(true);
    } else {
      firebase.database().ref(`users/${logStatus.uid}/favRecipes/${newRecipeKey}`).remove().catch((error) => console.error(error));
      setClicked(false);
    }
    // so this will be the function that posts the recipie id to firebase db ^^
  };
>>>>>>> main


  return (
    <Paper
      style={SpacingDesign.padding(3)}
    >
      <Image
        src={faykeRecipeData.status.image}
        cover
      />
      <Typography variant="h6" align="center" style={{ color: themeDesign.custom.muted.grey }}>
        {faykeRecipeData.status.title}
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
        <RecipeDescription summary={parsedRecipeSummary} />
      </Typography>
      <Typography variant="h6" align="left" style={{ color: themeDesign.custom.muted.grey }}>
        Ingredients
      </Typography>
      <Typography variant="body1" align="left" style={{ color: themeDesign.custom.muted.grey }}>
        <RecipeIngredientsList ingredients={faykeRecipeData.status.extendedIngredients} />
      </Typography>
      <Typography variant="h6" align="left" style={{ color: themeDesign.custom.muted.grey }}>
        Instructions
      </Typography>
      <Typography variant="body1" align="left" style={{ color: themeDesign.custom.muted.grey }}>
        <RecipeInstructionsList instructions={faykeRecipeData.status.instructions} />
      </Typography>
      <Typography variant="h6" align="left" style={{ color: themeDesign.custom.muted.grey }}>
        Reviews
      </Typography>
      <Typography variant="body1" align="left" style={{ color: themeDesign.custom.muted.grey }}>
        <RecipeReviewList recipeId={faykeRecipeData.status.id} />
      </Typography>
    </Paper>
  );
};

export default RecipeFocusStart;
