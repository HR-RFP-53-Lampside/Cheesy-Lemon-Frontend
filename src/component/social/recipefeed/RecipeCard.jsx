/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/no-unresolved */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  Icon,
} from '@material-ui/core';
import { RateReview } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import ShowMoreText from 'react-show-more-text';

import SpacingDesign from '../../context/design/SpacingDesign';

const RecipeCard = ({
  id, title, body, favorite, reviews,
}) => {
  let parsedRecipeSummary = '';
  if (body) {
    const lastIndexOfPercent = body.lastIndexOf('%');
    parsedRecipeSummary = body.slice(0, lastIndexOfPercent);
  }
  return (
    <Card style={{ ...SpacingDesign.marginy(3) }} elevation={5}>
      <CardContent>
        <Button component={Link} to={`recipe/${id}`}>
          <Typography variant="h4">
            {title}
          </Typography>
        </Button>
        <ShowMoreText
          more={<Icon className="fas fa-caret-down" color="primary" />}
          less={<Icon className="fas fa-caret-up" color="secondary" />}
          lines={4}
        >
          <Typography dangerouslySetInnerHTML={{ __html: `${parsedRecipeSummary}%.` }}>
            {/* {body} */}
          </Typography>
        </ShowMoreText>
      </CardContent>
      <Box
        display="flex"
        justifyContent="space-between"
        bgcolor="primary"
        style={{ ...SpacingDesign.paddingx(5), ...SpacingDesign.paddingy(2) }}
      >
        <Button>
          <Icon className="far fa-heart" />
          <Typography style={SpacingDesign.marginLeft(1)}>
            {favorite}
          </Typography>
        </Button>
        <Button component={Link} to={`/recipe/${id}/reviews`}>
          <RateReview />
          <Typography style={SpacingDesign.marginLeft(1)}>
            {reviews}
          </Typography>
        </Button>
      </Box>
    </Card>
  );
};

RecipeCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  favorite: PropTypes.number.isRequired,
  reviews: PropTypes.number.isRequired,
};
export default RecipeCard;
