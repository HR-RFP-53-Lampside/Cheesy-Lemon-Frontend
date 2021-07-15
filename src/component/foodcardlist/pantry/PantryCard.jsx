import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card, CardActionArea, CardActions, CardContent, CardMedia, Paper, Box, Typography, TextField, Button, IconButton, Container, Hidden, FormLabel, FormControl,  FormGroup, FormControlLabel, FormHelperText, Checkbox, ButtonGroup
} from '@material-ui/core';
import Image from 'material-ui-image';
import { Link, useHistory } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import cheeseImg from './cheese-img.jpeg';
import lemonImg from './lemon-img.jpeg';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import SpacingDesign from '../../context/design/SpacingDesign';
import theme from '../../context/design/ThemeDesign';


const PantryCard = (props) => {
  const themeDesign = useTheme();
  const [count, setCount] = useState(1);

  const select = props.selected;
  const item = props.item;
  const index = props.name;

  let handleIncrement = (e) => {
    e.preventDefault();
    let temp = count;
    temp++;
    setCount(temp)
  }

  const handleDecrement = (e) => {
    e.preventDefault();
    let temp = count;
    if (count > 1) {
      temp--;
      setCount(temp);
    }
  }


  return (
    <Card style={{ ...SpacingDesign.marginy(3) }} elevation={5}>
      <CardContent>
        <Image
          src={item.image}
          cover
        ></Image>
        <Box display='flex' flexDirection='column'>
          <Typography variant='h5' align='center' style={{ ...SpacingDesign.marginTop(3) }}>
            {item.name}
          </Typography>
          <Box display='flex' justifyContent='space-between' style={{
            ...SpacingDesign.marginLeft(4.5),
            ...SpacingDesign.marginRight(2.5),
          }}>

            <FormControlLabel
              control={<Checkbox onClick={props.select} name={item.name} checked={select.indexOf(item.name) > -1} style={{ transform: 'scale(1.5)' }} />}
            />

            <ButtonGroup variant='outlined' style={{ ...SpacingDesign.marginy(1), ...SpacingDesign.marginTop(2)}}>
              <Button onClick={handleDecrement}>-</Button>
              <Button disabled>{count}</Button>
              <Button onClick={handleIncrement}>+</Button>
            </ButtonGroup>

            <IconButton onClick={props.delete} value={index}>
              <HighlightOffIcon style={{ ...SpacingDesign.fontSize(5) }} ></HighlightOffIcon>
            </IconButton>

          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default PantryCard;