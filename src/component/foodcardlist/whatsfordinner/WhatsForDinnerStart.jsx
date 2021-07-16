/* eslint-disable import/no-unresolved */
import React, { useContext, useState, useEffect } from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Box,
  Typography,
  TextField,
  Container,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import PantryContext from '../../context/foodies/PantryContext';
import SpacingDesign from '../../context/design/SpacingDesign';
import LogStatus from '../../context/auth/LogStatus';


const WhatsForDinnerStart = () => {
  const themeDesign = useTheme();
  const [logStatus] = useContext(LogStatus);
  const [filter, setFilter] = useState('');
  const [recipes] = useContext(PantryContext);
  // const [recipes] = useContext(PantryContext);
  // ADJUST FOR LIVE DATA
  // useEffect(() => {
  //   setRecipes(data);
  // }, [data]);

  const handleFilter = (e) => {
    setFilter(e.target.value.toLowerCase());
  };

  return (
    <Box style={{ ...SpacingDesign.marginBottom(1) }}>
      <form noValidate autoComplete="off" onChange={handleFilter}>
        <TextField
          id="search"
          label="Filter"
          fullWidth
          variant="outlined"
        />
      </form>

      <Container
        style={{
          height: 'auto',
          ...SpacingDesign.marginTop(3),
          ...SpacingDesign.marginBottom(1),
          ...SpacingDesign.paddingx(0),
        }}
        elevation={1}
      >
        <Typography variant="h4" align="center">
          What&apos;s For Dinner
        </Typography>

        {recipes.filter((main) => main.title.toLowerCase().indexOf(filter) !== -1)
          .map((item) => (
            <Card style={{ ...SpacingDesign.marginy(3) }} elevation={5} key={item.id}>
              <CardActionArea
                component={Link}
                to={`recipe/${item.id}`}
              >
                <CardContent>
                  <CardMedia
                    style={{ ...SpacingDesign.height(40) }}
                    image={item.image}
                    title={item.title}
                  />
                  <Typography variant="h5" align="center" style={{ ...SpacingDesign.marginTop(3) }}>
                    {item.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
      </Container>
    </Box>
  );
};

export default WhatsForDinnerStart;
