/* eslint-disable import/no-unresolved */
import React from 'react';
import PropTypes from 'prop-types';
import { ThumbUp, ThumbDown, RateReview } from '@material-ui/icons';
import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  CardActionArea,
  Icon,
  Chip,
} from '@material-ui/core';
import ShowMoreText from 'react-show-more-text';
import SpacingDesign from '../../context/design/SpacingDesign';

const ReviewCard = ({ review }) => {
  const handleUpvote = () => {

  };

  const handleDownvote = () => {

  };

  return (
    <Card style={{ ...SpacingDesign.marginy(3), ...SpacingDesign.padding(1) }}>
      <CardContent>
        <Typography variant="h4">
          {review.title}
        </Typography>
        <Typography variant="h5" style={SpacingDesign.marginBottom(2)}>
          {review.authorName}
        </Typography>
        <ShowMoreText
          more={<Icon className="fas fa-caret-down" color="primary" />}
          less={<Icon className="fas fa-caret-up" color="secondary" />}
          lines={4}
        >
          <Typography variant="body">
            {review.body}
          </Typography>
        </ShowMoreText>
      </CardContent>
      <Box
        display="flex"
        justifyContent="space-between"
        bgcolor="primary"
        style={{ ...SpacingDesign.paddingx(5), ...SpacingDesign.paddingy(2) }}
      >
        <Button onClick={handleUpvote}>
          <ThumbUp />
          <Typography style={SpacingDesign.marginLeft(1)}>
            {review.upvotes}
          </Typography>
        </Button>
        <Button>
          <RateReview />
          <Typography style={SpacingDesign.marginLeft(1)}>
            {review.upvotes}
          </Typography>
        </Button>
        <Button onClick={handleDownvote}>
          <ThumbDown />
          <Typography style={SpacingDesign.marginLeft(1)}>
            {review.downvotes}
          </Typography>
        </Button>
      </Box>
    </Card>
  );
};

ReviewCard.propType = {
  review: PropTypes.object.isRequired,
};

export default ReviewCard;
