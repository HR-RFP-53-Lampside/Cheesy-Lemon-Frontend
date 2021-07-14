/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
} from '@material-ui/core';
import { ThumbUp, ThumbDown } from '@material-ui/icons';

import SpacingDesign from '../../context/design/SpacingDesign';

const ReviewFocusComment = () => {
  useEffect(() => {

  }, []);

  return (
    <Card style={{ ...SpacingDesign.padding(2), ...SpacingDesign.marginy(2) }}>
      <Typography variant="subtitle">
        Comment Author
      </Typography>
      <Typography
        variant="body1"
        style={{ ...SpacingDesign.paddingx(2), ...SpacingDesign.paddingy(1), borderLeft: '1px solid' }}
      >
        I&lsquo;m baby cold-pressed hammock flexitarian ennui, edison bulb vexillologist selvage.
        Kogi vice tilde viral. Offal disrupt knausgaard humblebrag vaporware sustainable.
        Pok pok four dollar toast hammock, prism 90&lsquo;s seitan squid wolf. Poke slow-carb ugh
        cornhole subway tile brunch four loko pug trust fund green juice organic single-origin
        coffee jianbing leggings. Lumbersexual craft beer tbh gluten-free, kombucha typewriter
        single-origin coffee meh.
      </Typography>
      <Box display="flex" justifyContent="space-between" style={{ ...SpacingDesign.marginx(1), ...SpacingDesign.marginy(2) }}>
        <Button onClick={() => { console.log('I\'ve been clicked'); }}>
          <ThumbUp />
          <Typography style={SpacingDesign.marginLeft(1)}>
            {3}
          </Typography>
        </Button>
        <Button onClick={() => { console.log('I\'ve been clicked'); }}>
          <ThumbDown />
          <Typography style={SpacingDesign.marginLeft(1)}>
            {1}
          </Typography>
        </Button>
      </Box>
    </Card>
  );
};

export default ReviewFocusComment;
