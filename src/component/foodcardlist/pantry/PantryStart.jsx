import React, { useContext, useState } from 'react';
import {
 Card, CardActionArea, CardActions, CardContent, CardMedia, Paper, Box, Typography, TextField, Button, IconButton, Container, Hidden, FormLabel, FormControl, FormGroup, FormControlLabel, FormHelperText, Checkbox
} from '@material-ui/core';
import Image from 'material-ui-image';
import { Link, useHistory } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import cheeseImg from './cheese-img.jpeg';
import lemonImg from './lemon-img.jpeg';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
// import { AddCircleOutlineOutlinedIcon, CameraAltOutlinedIcon, HighlightOffIcon} from '@material-ui/icons';



import SpacingDesign from '../../context/design/SpacingDesign';
import theme from '../../context/design/ThemeDesign';

const PantryStart = () => {
 const themeDesign = useTheme();
 const [filter, setFilter] = useState('');

  const handleFilter = (e) => {
    setFilter(e.target.value.toLowerCase());
    console.log(filter)
  }

  return (
    <Box style={{ ...SpacingDesign.marginBottom(1) }}>
      <form noValidate autoComplete="off" onChange={handleFilter}>
        <TextField
          id="search"
          label="Filter"
          fullWidth
          variant='outlined'
          borderRadius='50%'
        />
      </form>

      <Container
        style={{
          height: 'auto',
          ...SpacingDesign.marginBottom(1),
          ...SpacingDesign.marginTop(1),
          ...SpacingDesign.padding(0)

        }}
        elevation={1}>

        <Box display='flex' flexDirection='row-reverse' justifyContent='space-between'style={{...SpacingDesign.paddingTop(0)}}>
          <IconButton >
            <AddCircleOutlineOutlinedIcon style={{ ...SpacingDesign.fontSize(5)}}></AddCircleOutlineOutlinedIcon>
          </IconButton>

          <IconButton>
            <CameraAltOutlinedIcon style={{ ...SpacingDesign.fontSize(5)}}></CameraAltOutlinedIcon>
          </IconButton>
        </Box>


        <Typography variant='h4' align='center' >
          My Pantry
        </Typography>

        <Card style={{ ...SpacingDesign.marginy(3) }} elevation={5}>
          <CardContent>
            <CardMedia
              style={{ ...SpacingDesign.height(40)}}
              image={lemonImg}
              title='Lemon'
            />
            <Box display='flex' flexDirection='column'>
              <Typography variant='h5' align='center' style={{ ...SpacingDesign.marginTop(3) }}>
                Lemons
              </Typography>
              <Box display='flex' justifyContent='space-between' style={{
                // ...SpacingDesign.marginx(1),
                ...SpacingDesign.marginLeft(4.5),
                ...SpacingDesign.marginRight(2.5),
                }}>
                <FormControlLabel
                  control={ <Checkbox name="select" style={{ transform: 'scale(1.5)' }} /> }
                />
                <IconButton >
                  <HighlightOffIcon  style={{ ...SpacingDesign.fontSize(5) }}></HighlightOffIcon>
                </IconButton>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card style={{ ...SpacingDesign.marginy(3) }} elevation={5}>
          <CardContent>
            <CardMedia
              style={{ height: '300px' }}
              image={cheeseImg}
              title='Cheese'
            />
            <Box display='flex' flexDirection='column'>
              <Typography variant='h5' align='center' style={{ ...SpacingDesign.marginTop(3) }}>
                Cheese
              </Typography>
              <Box display='flex' justifyContent='space-between' style={{
                // ...SpacingDesign.marginx(1),
                ...SpacingDesign.marginLeft(4),
                ...SpacingDesign.marginRight(3),
                ...SpacingDesign.marginBottom(0),
                ...SpacingDesign.padding(0)
                }}>
                <FormControlLabel
                  control={ <Checkbox name="select" style={{ transform: 'scale(1.5)' }} /> }
                />
                <IconButton >
                  <HighlightOffIcon  style={{ ...SpacingDesign.fontSize(5) }}></HighlightOffIcon>
                </IconButton>
              </Box>
            </Box>
          </CardContent>
        </Card>

      </Container>
    </Box>
 )
}

export default PantryStart;
