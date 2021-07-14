import React, { useState } from 'react';
import { ThumbUp, ThumbDown } from '@material-ui/icons';
import {
  Paper, Box, Typography, TextField, Button, IconButton, Container, Hidden, Card, CardContent,
} from '@material-ui/core';

const ReviewCard = (props) => {
  let handleUpvote = () => {

  };

  let handleDownvote = () => {

  };

  return (
    <Card style={{ marginBottom: '20px' }}>
      <CardContent>
        <Typography variant="h5">
          {props.review.title}
        </Typography>
        <Typography variant="h7">
          {props.review.authorName}
        </Typography>
        <Typography variant="body1" style={{ marginBottom: '10px' }}>
          {props.review.body}
        </Typography>
        <Typography variant="h7">
          {props.review.recipe}
        </Typography>

        <Container style={{ display: 'flex', 'justify-content': 'space-between' }}>
          <span>
            <ThumbUp onClick={handleUpvote} />
            {props.review.upvotes}
          </span>
          <span>
            <ThumbDown onClick={handleDownvote} />
            {props.review.downvotes}
          </span>
        </Container>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
