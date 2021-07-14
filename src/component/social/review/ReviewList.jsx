import React, { useState, useEffect } from 'react';
import {
  Paper, Box, Typography, TextField, Button, IconButton, Container, Hidden, Card, CardContent, Select, InputLabel,
} from '@material-ui/core';
import ReviewCard from './ReviewCard.jsx';
import axios from 'axios';

const ReviewList = (props) => {
  const [reviews, setReviews] = useState([]);
  const [sort, setSort] = useState('yummies');

  let getReviews = () => {
    let id = 'RECIPE ID';
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
    let copy = reviews.slice();
    let sortFunction = (a, b) => {
      if (sort === 'yummies') {
        return a.upvotes - b.upvotes;
      }
      if (sort === 'recent') {
        // May need to change depending on data format
        return a.date - b.date;
      }
    };
    copy.sort(sortFunction);
    setReviews(copy);
  }, [sort]);

  const mockReviews = [
    {
      id: 1,
      recipe: 'Recipe 1',
      title: 'Title 1',
      authorName: 'Author 1',
      body: 'TEST BODY TEST BODY TEST BODY TEST BODY TEST BODY TEST BODY TEST BODY TEST BODY TEST BODY TEST BODY TEST BODY TEST BODY TEST BODY TEST BODY',
      upvotes: 20,
      downvotes: 5,
    },
    {
      id: 2,
      recipe: 'Recipe 2',
      title: 'Title 2',
      authorName: 'Author 2',
      body: 'TEST BODY TEST BODY TEST BODY TEST BODY TEST BODY TEST BODY TEST BODY TEST BODY TEST BODY TEST BODY TEST BODY TEST BODY TEST BODY TEST BODY',
      upvotes: 20,
      downvotes: 5,
    },
    {
      id: 3,
      recipe: 'Recipe 3',
      title: 'Title 3',
      authorName: 'Author 3',
      body: 'TEST BODY TEST BODY TEST BODY TEST BODY TEST BODY TEST BODY TEST BODY TEST BODY TEST BODY TEST BODY TEST BODY TEST BODY TEST BODY TEST BODY',
      upvotes: 20,
      downvotes: 5,
    },
  ];

  let handleChange = (e) => {
    setSort(e.target.value);
  };

  return (
    <div>
      <Card style={{ marginBottom: '20px' }}>
        <CardContent style={{ display: 'flex', flexDirection: 'row' }}>
          <InputLabel htmlFor="sort">Sort By</InputLabel>
          <Select
            native
            onChange={handleChange}
            inputProps={{
              name: 'sort',
              id: 'sort',
            }}
          >
            <option value="yummies">Most Yummies</option>
            <option value="recent">Most Recent</option>
          </Select>
        </CardContent>
      </Card>
      {mockReviews.map((review) => <ReviewCard review={review} />)}
    </div>
  );
};

export default ReviewList;
