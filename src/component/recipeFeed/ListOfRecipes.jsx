import React, { useState } from "react";
import {
  Icon,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Container,
  Hidden,
} from "@material-ui/core";
import Image from "material-ui-image";
import { Link } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";

import SpacingDesign from "../context/design/SpacingDesign";

const listOfRecipes = ({ data, selected, test }) => {
  const themeDesign = useTheme();

  // filter results by selected
  // if most reviewed === selected filter first
  // if most favorited === selected filter
  //or my reviews === selected filter
  

  //add buttons for reviews and favorites. Route to go to all reviews when onClick
  return (
    <Container>
      
      {test.map((item, i) => (
        selected === 'Most Reviews' &&
        <Card style={{ ...SpacingDesign.margin(3) }} elevation={5}>
          <CardActionArea component={Link} to={`recipe/${item.id}`} s>
            <CardContent>
              <CardMedia
                key={i}
                style={{ height: "100px" }}
                image={item.image}
                title={item.title}
              />
              <Typography
                variant="h2"
                align="left"
                style={{ ...SpacingDesign.marginTop(3) }}
              >
                {item.title}
              </Typography>
             
              <Typography
                variant="h5"
                align="center"
                style={{ color: themeDesign.custom.muted.grey }}
              >
                {item.body}
              </Typography>
              <Box display="flex">
                <Typography
                  variant="h6"
                  align="left"
                  style={{ color: themeDesign.custom.muted.grey }}
                >
                  Favorite {item.favorite}
                  <Typography
                    variant="h6"
                    align="right"
                    style={{ color: themeDesign.custom.muted.grey }}
                  >
                    Reviews {item.reviews}
                  </Typography>
                </Typography>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Container>
  );
};

export default listOfRecipes;
