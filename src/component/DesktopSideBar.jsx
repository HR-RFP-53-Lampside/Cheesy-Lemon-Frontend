/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import {
  Container, Card, Hidden, Box,
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
          Testing
        </Card>
      </Container>
    </Hidden>
  );
};

export default DekstopSideBar;
