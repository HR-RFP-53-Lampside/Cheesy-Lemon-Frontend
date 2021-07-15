import React, { useContext, useState } from 'react';
import axios from 'axios';
import {
  Paper, Box, Typography, TextField, Button, IconButton, Container, Hidden, Icon
} from '@material-ui/core';
import Image from 'material-ui-image';
import { Link } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import SpacingDesign from '../context/design/SpacingDesign';
import LogStatus from '../context/auth/LogStatus';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const AddReviewForm = () => {
  const themeDesign = useTheme();
  const [logStatus] = useContext(LogStatus);
  const [images, setImages] = useState([]);
  const [headline, setHeadline] = useState('')
  const [body, setBody] = useState('')

  const handleTextInputChange = (event) => {
    if (event.target.id === 'headline') {
      setHeadline(event.target.value);
    } else if (event.target.id === 'body') {
      setBody(event.target.value);
    }
  }

  const handleImageChange = (event) => {
    let files = Array.from(event.target.files);
    //Limits total number of images to 3
    const limit = 3 - images.length;
    files = files.slice(0, limit);

    const formData = new FormData();
    files.forEach((file, i) => {
      formData.append('file', file);
    });

    axios.post('http://localhost:8000/api/image', formData)
      .then((result) => {
        const newImages = result.data.map((pic) => pic.url)
        setImages([...images, ...newImages]);
      })
      .catch(console.error);
  };

  const handleSubmit = () => {
    axios({
      method: 'post',
      // url: `http://localhost:8000/local/${props.recipeId}/reviews`,
      url: `http://localhost:8000/local/123456789/reviews`,
      data: {
        authorId: logStatus.uid,
        authorImageURL: logStatus.photoURL,
        headline: headline,
        body: body,
        images: images
      }
    })
      .then(() => setOpened(!opened));
  }

  const removeImage = (i) => {
    setImages(images.filter((url, number) => i !== number))
  }

  const imageContainterStyle = {
    display: 'flex',
    marginBottom: images.length ? '25px' : '0'
  }

  const imageStyle = {
    width: 100,
    height: 100,
    marginRight: '15px',
    flexDirection: 'column',
    'justify-content': 'flex-start'
  }

  const deleteIconStyle = {
    cursor: 'pointer',
    marginBottom: '-10px',
    marginRight: '-10px',
    position: 'relative',
    background: 'white',
    borderRadius: '10px',
    zIndex: '5'
  }

  const deleteContainerStyle = {
    display: 'flex',
    alignContent: 'flex-end',
    alignItems: 'baseline',
    justifyContent: 'flex-end',
    marginBottom: '-10px'
  }

  return (
    <>
      <br></br>
      <TextField
        id="headline"
        label="Headline"
        variant='outlined'
        borderRadius='50%'
        style={{ ...SpacingDesign.marginBottom(1) }}
        onChange={handleTextInputChange}
      />
      <TextField
        id="body"
        label="Body"
        fullWidth
        variant='outlined'
        borderRadius='50%'
        style={{ ...SpacingDesign.marginBottom(1) }}
        onChange={handleTextInputChange}
      />
      <div style={imageContainterStyle}>
        {images.map((image, i) =>
          <div style={imageStyle}>
            <div
              style={deleteContainerStyle}
              onClick={() => removeImage(i)}
              className="delete">
              {/* <Icon className="fas fa-times-circle" style={deleteIconStyle} /> */}
              <HighlightOffIcon style={deleteIconStyle} />
            </div>
            <Image src={image} />
          </div>
        )}
      </div>
      {images.length < 3 && <Button
        variant="outlined"
        component="label"
        style={{ ...SpacingDesign.marginLeft(0) }}
        htmlFor="profile-image"
      >
        <Typography variant="body2">
          Add Image
        </Typography>
        <Icon className="fas fa-camera" style={SpacingDesign.marginLeft(1.5)} />
        <input type="file" id="profile-image" multiple onChange={(event) => handleImageChange(event)} hidden />
      </Button>}
      <br></br>
      <Button
        variant="contained"
        color="primary"
        style={{ ...SpacingDesign.paddingx(5), ...SpacingDesign.marginy(2) }}
        type="submit"
        align="center"
        onClick={handleSubmit}
      >
        <Typography color="textPrimary">
          Submit
        </Typography>
      </Button>
    </>
  );
}

export default AddReviewForm;