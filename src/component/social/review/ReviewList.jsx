/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Select,
} from '@material-ui/core';
import axios from 'axios';
import { useTheme } from '@material-ui/core/styles';
import ReviewCard from './ReviewCard.jsx';

const ReviewList = () => {
  const themeDesign = useTheme();
  const [reviews, setReviews] = useState([]);
  const [sort, setSort] = useState('yummies');

  const getReviews = () => {
    const id = 'RECIPE ID';
    axios({
      method: 'GET',
      url: `http://localhost:4000/local/${id}/reviews`,
    })
      .then((response) => {
        setReviews(response.data);
      });
  };

  // Need to figure out end point documentation first, also the id
  // useEffect(() => {
  //   getReviews();
  // }, [props]);

  useEffect(() => {
    const copy = reviews.slice();
    const sortFunction = (a, b) => {
      if (sort === 'yummies') {
        return a.upvotes - b.upvotes;
      }
      if (sort === 'recent') {
        // May need to change depending on data format
        return a.date - b.date;
      }
      return a.upvotes - b.upvotes;
    };
    copy.sort(sortFunction);
    setReviews(copy);
  }, [sort]);

  const mockReviews = [
    {
      id: 1,
      recipe: 'Recipe 1',
      title: 'Title 1',
      authorName: 'Tarrin',
      authorUrl: 'https://i.imgur.com/qnoy291.png',
      body: 'I\'m baby scenester typewriter fashion axe irony. Health goth live-edge brooklyn hexagon, fam small batch leggings brunch palo santo offal narwhal freegan four loko wolf. Pok pok live-edge chambray, chicharrones seitan 90\'s adaptogen pickled post-ironic. La croix poutine offal XOXO af thundercats glossier chartreuse direct trade irony fam occupy kombucha. Fanny pack hoodie organic deep v artisan street art, mixtape chartreuse photo booth banh mi green juice. Godard intelligentsia DIY shaman twee hashtag man braid affogato mustache ennui 8-bit.',
      upvotes: 20,
      downvotes: 5,
    },
    {
      id: 2,
      recipe: 'Recipe 1',
      title: 'Title 2',
      authorName: 'Tarrin',
      authorUrl: 'https://i.imgur.com/qnoy291.png',
      body: 'Drinking vinegar normcore banh mi, seitan bitters ennui austin helvetica jean shorts master cleanse adaptogen lomo franzen. Cardigan activated charcoal mlkshk, letterpress mixtape bushwick selfies ennui kickstarter live-edge. Wolf tofu cronut, 8-bit artisan sriracha bespoke glossier. Echo park cornhole man braid, vice activated charcoal chambray jianbing la croix copper mug jean shorts migas unicorn lumbersexual bitters. Beard health goth trust fund roof party distillery bespoke portland wayfarers direct trade paleo locavore. Dreamcatcher irony messenger bag woke four dollar toast poutine quinoa tote bag flannel tofu distillery.',
      upvotes: 20,
      downvotes: 5,
    },
    {
      id: 3,
      recipe: 'Recipe 1',
      title: 'Title 3',
      authorName: 'Tarrin',
      authorUrl: 'https://i.imgur.com/qnoy291.png',
      body: 'Snackwave sustainable wayfarers, meditation af pinterest marfa poke ramps hella taiyaki chambray sriracha street art. Man braid cornhole poutine gentrify. Lo-fi cornhole shaman, copper mug listicle cliche 90\'s paleo tacos hoodie farm-to-table leggings. Fingerstache tumeric synth flexitarian fixie you probably haven\'t heard of them pork belly iceland master cleanse offal.',
      upvotes: 20,
      downvotes: 5,
    },
  ];

  const handleChange = (e) => {
    setSort(e.target.value);
  };

  return (
    <Box>
      <Typography
        variant="h3"
        align="center"
        style={{ color: themeDesign.custom.muted.grey }}
      >
        Recipe 1
      </Typography>
      <Typography
        variant="h4"
        align="center"
        style={{ color: themeDesign.custom.muted.grey }}
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
      {mockReviews.map((review) => <ReviewCard review={review} />)}
    </Box>
  );
};

export default ReviewList;
