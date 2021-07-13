/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import {
  Container, Card, Hidden, CardMedia,
} from '@material-ui/core';
import SpacingDesign from './context/design/SpacingDesign';

const DekstopSideBar = () => {
  const [setting, setSetting] = useState('');

  return (
    <Hidden mdDown>
      <Container maxWidth="xs">
        <Card
          style={{
            ...SpacingDesign.marginTop(5),
          }}
        >
          <CardMedia
            title="UserProfilePicture"
          />
        </Card>
      </Container>
    </Hidden>
  );
};

export default DekstopSideBar;
