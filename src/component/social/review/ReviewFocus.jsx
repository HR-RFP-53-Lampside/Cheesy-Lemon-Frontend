/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Select,
  Button,
  CardActionArea,
} from '@material-ui/core';
import { ThumbUp, ThumbDown } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Image from 'material-ui-image';

import SpacingDesign from '../../context/design/SpacingDesign';
import ReviewFocusComment from './ReviewFocusComment';
import AddCommentForm from './AddCommentForm';

const ReviewFocus = () => {
  useEffect(() => {

  }, []);

  return (
    <>
      <Paper style={{ ...SpacingDesign.padding(2) }}>
        <Image
          src="https://media.gettyimages.com/photos/varied-food-carbohydrates-protein-vegetables-fruits-dairy-legumes-on-picture-id1218254547?s=2048x2048"
          cover
        />
        <CardActionArea component={Link} to="/recipes/1/reviews/">
          <Typography variant="h3">
            Review Title
          </Typography>
        </CardActionArea>
        <Typography variant="h5" style={{ ...SpacingDesign.marginBottom(2), ...SpacingDesign.marginLeft(3) }}>
          author name
        </Typography>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
          et fringilla diam. Quisque vitae velit enim. Curabitur consequat
          purus commodo nibh gravida laoreet. Nunc et congue lacus, eu mollis
          felis. Fusce nec tellus feugiat, fermentum purus sed, commodo magna.
          Quisque nec diam id est ornare placerat. Vivamus laoreet, purus sit amet
          sodales congue, ex velit vestibulum lorem, sit amet convallis augue arcu eu
          ipsum. Sed vehicula iaculis velit vel tincidunt. Sed commodo rutrum aliquet.
          Vivamus nibh ligula, maximus vel auctor condimentum, ultrices non ipsum. Sed
          accumsan nibh in justo vehicula, at volutpat tortor venenatis. Donec pulvinar
          dolor sed sagittis posuere. Sed elementum urna nec lacus pretium, et sollicitudin
          nibh ornare. Sed ut erat ac libero auctor lobortis vitae non lectus. Sed eleifend,
          massa at sodales vestibulum, eros sapien volutpat lacus, sit amet fringilla mi felis
          cursus ex. Aenean tincidunt at dolor aliquet tempus.
        </Typography>
        <Box display="flex" justifyContent="space-between" style={{ ...SpacingDesign.marginx(1), ...SpacingDesign.marginy(2) }}>
          <Button onClick={() => { console.log('I\'ve been clicked'); }}>
            <ThumbUp />
            <Typography style={SpacingDesign.marginLeft(1)}>
              {10}
            </Typography>
          </Button>
          <Button onClick={() => { console.log('I\'ve been clicked'); }}>
            <ThumbDown />
            <Typography style={SpacingDesign.marginLeft(1)}>
              {1}
            </Typography>
          </Button>
        </Box>
      </Paper>
      <Box display="flex" justifyContent="space-between" style={{ ...SpacingDesign.marginTop(3) }}>
        <Typography variant="h6">
          Comments
        </Typography>
        <Select
          native
          variant="outlined"
        >
          <option value="yummies">Most Yummies</option>
          <option value="recent">Most Recent</option>
        </Select>
      </Box>
      <AddCommentForm recipeId={123456789} reviewId={'60f06d5a973b6050b9fa09e7'}/>
      {[1, 2, 3, 4, 5].map((row) => (
        <ReviewFocusComment key={row} />
      ))}
    </>
  );
};

export default ReviewFocus;
