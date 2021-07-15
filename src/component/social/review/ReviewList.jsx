/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  Select,
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import ReviewCard from './ReviewCard';
import endPoint from '../../../routing';

const ReviewList = () => {
  // const mockReviews = [
  //   {
  //     id: 1,
  //     recipeId: 1,
  //     recipe: 'Recipe 1',
  //     title: 'Title 1',
  //     authorName: 'Tarrin',
  //     authorUrl: 'https://i.imgur.com/qnoy291.png',
  //     body: 'I\'m baby scenester typewriter fashion axe irony. Health goth live-edge brooklyn hexagon, fam small batch leggings brunch palo santo offal narwhal freegan four loko wolf. Pok pok live-edge chambray, chicharrones seitan 90\'s adaptogen pickled post-ironic. La croix poutine offal XOXO af thundercats glossier chartreuse direct trade irony fam occupy kombucha. Fanny pack hoodie organic deep v artisan street art, mixtape chartreuse photo booth banh mi green juice. Godard intelligentsia DIY shaman twee hashtag man braid affogato mustache ennui 8-bit.',
  //     upvotes: 20,
  //     downvotes: 5,
  //     date: new Date((new Date()).valueOf() - 1000 * 60 * 60 * (24 * 1)),
  //   },
  //   {
  //     id: 2,
  //     recipeId: 1,
  //     recipe: 'Recipe 1',
  //     title: 'Title 2',
  //     authorName: 'Tarrin',
  //     authorUrl: 'https://i.imgur.com/qnoy291.png',
  //     body: 'Drinking vinegar normcore banh mi, seitan bitters ennui austin helvetica jean shorts master cleanse adaptogen lomo franzen. Cardigan activated charcoal mlkshk, letterpress mixtape bushwick selfies ennui kickstarter live-edge. Wolf tofu cronut, 8-bit artisan sriracha bespoke glossier. Echo park cornhole man braid, vice activated charcoal chambray jianbing la croix copper mug jean shorts migas unicorn lumbersexual bitters. Beard health goth trust fund roof party distillery bespoke portland wayfarers direct trade paleo locavore. Dreamcatcher irony messenger bag woke four dollar toast poutine quinoa tote bag flannel tofu distillery.',
  //     upvotes: 30,
  //     downvotes: 5,
  //     date: new Date((new Date()).valueOf() - 1000 * 60 * 60 * (24 * 7)),

  //   },
  //   {
  //     id: 3,
  //     recipeId: 1,
  //     recipe: 'Recipe 1',
  //     title: 'Title 3',
  //     authorName: 'Tarrin',
  //     authorUrl: 'https://i.imgur.com/qnoy291.png',
  //     body: 'Snackwave sustainable wayfarers, meditation af pinterest marfa poke ramps hella taiyaki chambray sriracha street art. Man braid cornhole poutine gentrify. Lo-fi cornhole shaman, copper mug listicle cliche 90\'s paleo tacos hoodie farm-to-table leggings. Fingerstache tumeric synth flexitarian fixie you probably haven\'t heard of them pork belly iceland master cleanse offal.',
  //     upvotes: 5,
  //     downvotes: 5,
  //     date: new Date((new Date()).valueOf() - 1000 * 60 * 60 * (24 * 3)),

  //   },
  // ];
  const { recipeId } = useParams();
  const [reviews, setReviews] = useState();
  const [sort, setSort] = useState('yummies');

  const getReviews = async () => {
    const { data } = await endPoint.reviews.getRecipeReviews(recipeId);
    console.log(data);
    const reviewsData = data[0].reviews;
    console.log(reviewsData);
    setReviews(reviewsData);
  };

  useEffect(() => {
    console.log(recipeId);
    getReviews();
  }, [recipeId]);

  useMemo(() => {
    if (reviews) {
      const copy = reviews.slice();
      if (sort === 'yummies') {
        copy.sort((a, b) => (b.upvotes - a.upvotes));
      }
      if (sort === 'recent') {
        copy.sort((a, b) => (a._createdAt.getTime() - b._createdAt.getTime()));
      }
      setReviews(copy);
    }
  }, [sort]);

  const handleChange = (e) => {
    setSort(e.target.value);
  };

  return (
    <Box>
      <Typography
        variant="h3"
        align="center"
      >
        Recipe 1
      </Typography>
      <Typography
        variant="h4"
        align="center"
        color="textSecondary"
      >
        reviews
      </Typography>

      <Select
        native
        onChange={handleChange}
        inputProps={{
          name: 'sort',
          id: 'sort',
        }}
        fullWidth
        variant="outlined"
      >
        <option value="yummies">Most Yummies</option>
        <option value="recent">Most Recent</option>
      </Select>
      {reviews && reviews.map((review) => (
        <ReviewCard
          key={review.id}
          id={review.id}
          title={review.title}
          authorId={review.authorId}
          body={review.body}
          upvotes={review.upvotes}
          downvotes={review.downvotes}
          recipeId={review.recipeId}
          date={review._createdAt}
        />
      ))}
    </Box>
  );
};

export default ReviewList;
