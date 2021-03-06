/* eslint-disable import/no-unresolved */
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Typography, TextField, Button, Icon, Box, Paper,
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import Image from 'material-ui-image';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import SpacingDesign from '../context/design/SpacingDesign';
import LogStatus from '../context/auth/LogStatus';
import endPoint from '../../routing';

const AddReviewForm = ({ setUpdateReview, updateReview }) => {
  const [logStatus] = useContext(LogStatus);
  const [images, setImages] = useState([]);
  const [headline, setHeadline] = useState('');
  const [body, setBody] = useState('');
  const { recipeId } = useParams();

  const handleTextInputChange = (event) => {
    if (event.target.id === 'headline') {
      setHeadline(event.target.value);
    } else if (event.target.id === 'body') {
      setBody(event.target.value);
    }
  };

  const resetInputs = () => {
    setImages([]);
    setHeadline('');
    setBody('');
  };

  const handleImageChange = (event) => {
    let files = Array.from(event.target.files);
    // Limits total number of images to 3
    const limit = 3 - images.length;
    files = files.slice(0, limit);

    const formData = new FormData();
    files.forEach((file) => {
      formData.append('file', file);
    });

    // axios.post('http://localhost:8000/api/image', formData)
    //   .then((result) => {
    //     const newImages = result.data.map((pic) => pic.url);
    //     setImages([...images, ...newImages]);
    //   })
    //   .catch(console.error);
    endPoint.recipes.getImageUrl(formData)
      .then((result) => {
        const newImages = result.data.map((pic) => pic.url);
        setImages([...images, ...newImages]);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const handleSubmit = () => {
    endPoint.reviews.postRecipeReview(
      recipeId,
      logStatus.uid,
      logStatus.photoURL,
      headline,
      body,
      images,
    )
      .then(() => {
        setUpdateReview(!updateReview);
        resetInputs();
      })
      .catch(() => {
        setUpdateReview(!updateReview);
        resetInputs();
      });
  };

  const removeImage = (i) => {
    setImages(images.filter((url, number) => i !== number));
  };

  const imageContainterStyle = {
    display: 'flex',
    marginBottom: images.length ? '32px' : '0',
  };

  const imageStyle = {
    ...SpacingDesign.square(13),
    flexDirection: 'column',
    justifyContent: 'flex-start',
  };

  const deleteIconStyle = {
    cursor: 'pointer',
    alignSelft: 'center',
    zIndex: '5',
    ...SpacingDesign.square(4),
  };

  const deleteContainerStyle = {
    ...SpacingDesign.marginBottom(-2),
  };

  return (
    <Paper style={{ ...SpacingDesign.padding(2), ...SpacingDesign.marginy(3) }}>
      <Typography align="center" variant="h4">
        Share your thoughts
      </Typography>
      <TextField
        id="headline"
        label="Headline"
        variant="outlined"
        borderRadius="50%"
        style={{ ...SpacingDesign.marginBottom(1) }}
        onChange={handleTextInputChange}
        value={headline}
      />
      <TextField
        id="body"
        label="Body"
        fullWidth
        variant="outlined"
        borderRadius="50%"
        style={{ ...SpacingDesign.marginBottom(1) }}
        onChange={handleTextInputChange}
        value={body}
      />
      <Box style={imageContainterStyle}>
        {images.map((image, i) => (
          <Box style={imageStyle} key={image}>
            <Button
              style={deleteContainerStyle}
              onClick={() => removeImage(i)}
              fullWidth
              className="delete"
            >
              {/* <Icon className="fas fa-times-circle" style={deleteIconStyle} /> */}
              <HighlightOffIcon style={deleteIconStyle} />
            </Button>
            <Image src={image} imageStyle={{ borderRadius: '8px' }} style={{ backgroundColor: 'transparent' }} cover />
          </Box>
        ))}
      </Box>
      {images.length < 3 && (
      <Button
        variant="outlined"
        component="label"
        style={{ ...SpacingDesign.marginLeft(0) }}
        htmlFor="profile-image"
      >
        <Typography variant="body2">
          Add Image
        </Typography>
        <Icon className="fas fa-camera" style={SpacingDesign.marginLeft(1.5)} />
        <input accept="image/*" type="file" id="profile-image" multiple onChange={(event) => handleImageChange(event)} hidden />
      </Button>
      )}
      <br />
      <Button
        variant="contained"
        color="primary"
        style={{ ...SpacingDesign.paddingx(5), ...SpacingDesign.marginy(2) }}
        type="submit"
        align="center"
        onClick={handleSubmit}
      >
        <Typography color="textPrimary">
          Leave a review
        </Typography>
      </Button>
    </Paper>
  );
};

AddReviewForm.propTypes = {
  setUpdateReview: PropTypes.func,
  updateReview: PropTypes.bool,
};

AddReviewForm.defaultProps = {
  updateReview: false,
  setUpdateReview: () => {},
};

export default AddReviewForm;
