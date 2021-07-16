/* eslint-disable no-underscore-dangle */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import endPoint from '../../routing';
import ReviewCard from '../social/review/ReviewCard';

const UserProfileReviews = ({ userId, userReviews }) => {
  const [foo, setFoo] = useState('');
  const [reviews, setReviews] = useState([]);
  const [toDisplay, setToDisplay] = useState([]);

  const gatherReviews = async () => {
    for (const review in userReviews) {
      const { recipeId, reviewId } = userReviews[review];
      if (!!recipeId && !!reviewId) {
        const { data } = await endPoint.reviews.getRecipeReviews(recipeId);
        const [reviewsData] = data && data;
        const reviewsReceived = reviewsData.reviews;
        // reviewsData
        const filtered = reviewsReceived.filter((item) => item.authorId === userId);
        setReviews([...reviews, ...filtered]);
      }
    }
  };

  const filterReceivedReviews = () => {
    const currentReviews = {};
    let displayMe = [];
    reviews.forEach((aReview) => {
      currentReviews[aReview._id] = aReview;
    });
    Object.keys(currentReviews).forEach((filtered) => {
      displayMe = [...displayMe, currentReviews[filtered]];
    });
    return displayMe;
  };

  useEffect(() => {
    gatherReviews();
  }, [userId]);

  useMemo(() => {
    filterReceivedReviews();
  }, [reviews]);

  return (
    <>
      {filterReceivedReviews().map((mappedReview) => (
        <>
          <ReviewCard
            reviewId={mappedReview._id}
            title={mappedReview.headline}
            authorId={mappedReview.authorId}
            body={mappedReview.body}
            upvotes={mappedReview.upvotes}
            downvotes={mappedReview.downvotes}
            recipeId="0"
            date={mappedReview._createdAt}
            comments={mappedReview.comments}
            images={mappedReview.images}
          />
        </>
      ))}
    </>
  );
};

UserProfileReviews.propTypes = {
  userId: PropTypes.string.isRequired,
  userReviews: PropTypes.object,
};

UserProfileReviews.defaultProps = {
  userReviews: {},
};

export default UserProfileReviews;
