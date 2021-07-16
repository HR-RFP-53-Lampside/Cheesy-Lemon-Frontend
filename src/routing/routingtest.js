import server from '.';

const testing = () => {
  server.reviews.getRecipeReviews('654901')
    .then(({ data }) => {
      console.log('reviews from recipe', data);
    });
  server.recipes.getRecipeById('654901')
    .then(({ data }) => {
      console.log('recipe', data);
    });
  // these server portions cost "points" so I'm no longer testing them :)
  // server.recipes.getRecipeIngredients(['Eggs', 'Salmon'])
  //   .then(({ data }) => {
  //     console.log('ingredient recipes', data);
  //   });
  // server.recipes.getIngredientsFromImage('https://i.redd.it/dnvpxr5euds51.jpg')
  //   .then(({ data }) => {
  //     console.log('image data', data);
  //   })
  //   .catch((yeet) => {
  //     throw yeet;
  //   });
  // server.recipes.getIngredient('bok choy')
  //   .then(({ data }) => {
  //     console.log('what is bok choy', data);
  //   });
  server.recipes.getAllRecipes()
    .then(({ data }) => {
      console.log('recipes: ', data);
    })
    .catch((err) => {
      throw err;
    });
};

export default testing;
