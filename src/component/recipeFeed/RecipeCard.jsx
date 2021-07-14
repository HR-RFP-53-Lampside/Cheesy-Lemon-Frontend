/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/no-unresolved */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardActionArea,
  CardContent,
  Box,
  Typography,
  Button,
  Icon,
  Tooltip,
} from '@material-ui/core';
import { RateReview } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';

import SpacingDesign from '../context/design/SpacingDesign';

const RecipeCard = ({ item }) => {
  const themeDesign = useTheme();
  /*
    Code for outline heart: far-fa-heart
    Code for filled heart: fas fa-heart
  */
  console.log(item);
  return (
    <Card style={{ ...SpacingDesign.marginy(3) }} elevation={5}>
      <CardActionArea component={Link} to={`recipe/${item.id}`} style={SpacingDesign.padding(2)}>
        <CardContent>
          <Typography variant="h4">
            {item.title}
          </Typography>
          <Typography variant="body">
            {item.body}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Box display="flex" justifyContent="space-between" style={{ ...SpacingDesign.paddingx(5), ...SpacingDesign.paddingy(2) }}>
        <Button>
          <Icon className="far fa-heart" />
          <Typography style={SpacingDesign.marginLeft(1)}>
            {item.favorite}
          </Typography>
        </Button>
        <Button>
          <RateReview />
          <Typography style={SpacingDesign.marginLeft(1)}>
            {item.reviews}
          </Typography>
        </Button>
      </Box>
    </Card>
  );
};

RecipeCard.propTypes = {
  item: PropTypes.object.isRequired,
};
export default RecipeCard;
