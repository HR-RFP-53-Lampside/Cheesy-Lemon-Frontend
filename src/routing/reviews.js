/* eslint-disable import/no-unresolved */
import axios from 'axios';
import endpoint from '../config/configrouting';

const entry = `${endpoint.backendPort}/local`;

export default {
  /**
   * Retrieve all the reviews of a given recipe
   * @param {number} recipeId - Id of the recipe
   * @param {number} reviewId - Id of the review
   */
  getSingleReview: (recipeId, reviewId) => axios.get(`${entry}/${recipeId}/reviews/${reviewId}`),

  /**
   * Retrieve all the reviews of a given recipe
   * @param {number} recipeId - Id of the recipe
   *
   */
  getRecipeReviews: (recipeId) => axios.get(`${entry}/${recipeId}/reviews`),
  /**
   * Posting a review of the recipe.
   * @param {number} recipeId - ID of recipe,
   * @param {string} authorId - ID of author,
   * @param {string} authorImageURL - Image url,
   * @param {string} headline - Review title,
   * @param {string} body - Review body,
   * @param {array} images - Array of string urls,
   * @returns {string} reviewId - returns ID of the review
   * authorName, authorImageURL, headline, body, images[0], images[1]
   *
   * This will commit changes to both the mongoDB and also to the firebase
   * If the firebase fails, the mongoDB will revert back the changes
   */
  postRecipeReview: (
    recipeId,
    authorId,
    authorImageURL,
    headline,
    body,
    images,
  ) => new Promise((resolve, reject) => {
    // returns newly created review's ID
    axios.post(`${entry}/${recipeId}/reviews`, {
      recipeId, authorId, authorImageURL, headline, body, images,
    })
      .then((reviewID) => {
        console.log('attempting to post review');
        resolve(reviewID);
        // Alec, add the reviewID to the Firebase store
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
  /**
   * Assign favorite to be on or off
   * @param {number} recipeId - RecipeID
   * @param {bool} active - set to turn the upvote on or off
   *
   * This will commit changes to both the mongoDB and also to the firebase
   * If the firebase fails, the mongoDB will revert back the changes
   */
  putRecipeFavorite: (recipeID, active) => new Promise((resolve, reject) => {
    // returns newly created review's ID
    axios.post(`${entry}/${recipeID}/favorite`, { active })
      .then(() => {
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
  /**
   * Assign upvote to be on or off
   * @param {number} recipeId - RecipeID
   * @param {number} reviewId - ReviewId
   * @param {bool} active - set to turn the upvote on or off
   *
   * This will commit changes to both the mongoDB and also to the firebase
   * If the firebase fails, the mongoDB will revert back the changes
   */
  putUpvoteRecipeReview: (recipeId, reviewId, active) => new Promise((resolve, reject) => {
    axios.put(`${entry}/${recipeId}/reviews/${reviewId}/upvote`, { active })
      .then(() => {
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
  /**
   * Assign downvote to be on or off
   * @param {number} recipeId - RecipeID
   * @param {number} reviewId - ReviewId
   * @param {bool} active - set to turn the downvote on or off
   *
   * This will commit changes to both the mongoDB and also to the firebase
   * If the firebase fails, the mongoDB will revert back the changes
   */
  putDownRecipeReview: (recipeId, reviewId, active) => new Promise((resolve, reject) => {
    axios.put(`${entry}/${recipeId}/reviews/${reviewId}/down`, { active })
      .then(() => {
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
  /**
   * Add a new comment to a review
   * @param {number} recipeId - RecipeID
   * @param {number} reviewId - ReviewId
   * @param {string} authorName - name of the writer
   * @param {string} body - body of the comment
   *
   * This will commit changes to both the mongoDB and also to the firebase
   * If the firebase fails, the mongoDB will revert back the changes
   */
  postComment: (recipeId, reviewId, authorId, body) => new Promise((resolve, reject) => {
    // reviewData
    axios.post(`${entry}/${recipeId}/reviews/${reviewId}/comment`, { authorId, body })
      .then(() => {
        resolve('nice');
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
  /**
   * Delete a comment from the review
   * @param {number} recipeId - RecipeID
   * @param {number} reviewId - ReviewId
   * @param {number} commentId - ReviewId
   *
   * This will commit changes to both the mongoDB and also to the firebase
   * If the firebase fails, the mongoDB will revert back the changes
   */
  deleteComment: (recipeId, reviewId, commentId) => new Promise((resolve, reject) => {
    axios.post(`${entry}/${recipeId}/reviews/${reviewId}/comment/${commentId}`)
      .then(() => {
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
