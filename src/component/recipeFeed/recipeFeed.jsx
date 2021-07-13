import React, { useState } from "react";
import {
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
  Select,
  MenuItem,
} from "@material-ui/core";
import Image from "material-ui-image";
import { Link } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";
import axios from "axios";
import ListOfRecipes from "./ListOfRecipes";

const RecipeFeed = ({ userData }) => {
  const themeDesign = useTheme();
  //user data will be data about recipes and display the title, body and favorite/#ofreviews
  // be able to filter recipe info from select tag by most liked or most commented or my reviews
  const [filterOptions, setFilterOptions] = useState([
    "Most Reviews",
    "My Reviewed",
    "Most Favorites",
  ]);
  const [selected, setSelected] = useState("");
  const handleNewFilter = (e) => {
    setSelected(e.target.value);
  };

  const test = [
    {
      title: "banana",
      body: "this banana is the wworst in the world I hate bananas besides this one",
      favorite: 1,
      reviews: 3,
    },
    {
      title: "grapes",
      body: "this banana is the wworst in the world I hate bananas besides this one",
      favorite: 15,
      reviews: 5,
    },
    {
      title: "steak dinner",
      body: "this banana is the wworst in the world I hate bananas besides this one tgere us ou reason to east meant",
      favorite: 0,
      reviews: 12,
    },
    {
      title: "hariy peanuts",
      body: "this banana is the wworst in the world I hate bananas besides this one I love peanuts bc I am an eleeghan",
      favorite: 9,
      reviews: 30,
    },
    {
      title: "my guy is so good",
      body: "this banana is the wworst in the world I hate bananas besides this one and I cant wait to eat this banana",
      favorite: 5,
      reviews: 3,
    },
  ];

  return (
    <Box display="flex">
      <Container
        maxWidth="sm"
        style={{
          flexGrow: 1,
          flexBasis: "20%",
          alignSelf: "center",
          maxHeight: "90vh",
        }}
      >
        <Typography
          variant="h2"
          align="center"
          style={{ color: themeDesign.custom.muted.grey }}
        >
          Recipe Feed
        </Typography>
        <Select value={selected} onChange={handleNewFilter} >
          {filterOptions.map((item, i) => (
            <MenuItem value={item} key={i}>
              {item}
            </MenuItem>
          ))}
        </Select>
        <ListOfRecipes data={userData} selected={selected} test={test} />
      </Container>
    </Box>
  );
};

export default RecipeFeed;
