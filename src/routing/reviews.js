/* eslint-disable import/no-unresolved */
import axios from 'axios';
import endpoint from '../config/configrouting';

const entry = `${endpoint.backendPort}/local`;

export default {
  getRecipeReviews: (recipeId) => axios.get(`${entry}/${recipeId}/reviews`),
  postRecipeReview: (information) => new Promise((resolve, reject) => {
    // returns newly created review's ID
    axios.post(`${entry}/${information.recipeId}`, information)
      .then((reviewId) => {
        /* post to current user's firebase data
        firebase.dostuff()
          .then(() => {
            stuff here
            resolve(beep)
          })
          .catch((err) => {
            undo the axios post
            reject(err)
          })
        */
      })
      .catch((err) => {
        reject(err);
      });
  }),
  putUpvoteRecipeReview: ({ recipeId, reviewId, active }) => new Promise((resolve, reject) => {
    // reviewData
    axios.post(`${entry}/${recipeId}/reviews/${reviewId}/upvote`, { active })
      .then((reviewId) => {
        /* post to current user's firebase data
        firebase.dostuff()
          .then(() => {
            stuff here
            // response is 200 OK
            resolve(beep)
          })
          .catch((err) => {
            undo the axios post
            reject(err)
          })
        */
      })
      .catch((err) => {
        reject(err);
      });
  }),

};
