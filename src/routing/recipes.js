/* eslint-disable import/no-unresolved */
import axios from 'axios';
import endpoint from '../config/configrouting';

const entry = `${endpoint.backendPort}/api`;

/*
  {
    ingredients: [blah, blah],
  }

*/
export default {
  getRecipeById: (recipeId) => axios.get(`${entry}/recipes/${recipeId}`),
  getRecipeIngredients: (ingredients) => axios.post(`${entry}/recipes`, ingredients),
  getIngredientsFromImage: (imageUrl) => axios.get(`${entry}/ingredientsFromImage?imageUrl=${imageUrl}`),
  getIngredient: (ingredientName) => axios.get(`${entry}/ingredients/${ingredientName}/search`),
  getImageUrl: (formData) => axios.post(`${entry}/image`, formData),
};
