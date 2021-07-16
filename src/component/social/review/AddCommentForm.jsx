/* eslint-disable import/no-unresolved */
import React, { useState, useContext } from 'react';
import {
  Typography,
  Paper,
  Button,
  TextField,
} from '@material-ui/core';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import LogStatus from '../../context/auth/LogStatus';
import SpacingDesign from '../../context/design/SpacingDesign';
import routing from '../../../routing/reviews';

const AddCommentForm = (props) => {
  const [logStatus] = useContext(LogStatus);
  const [body, setBody] = useState('');
  const { recipeId, reviewId } = useParams();

  const handleSubmit = () => {
    // after bug is resolved
    routing.postComment(props.recipeId, props.reviewId, logStatus.uid, body)
      .then(() => {
        props.setUpdate(!props.makeUpdate);
      })
      .catch(() => {
        props.setUpdate(!props.makeUpdate);
      });
    // axios({
    //   method: 'post',
    //   url: `http://localhost:8000/local/${props.recipeId}/reviews/${props.reviewId}/comment`,
    //   data: {
    //     authorId: logStatus.uid,
    //     body,
    //   },
    // });
  };

  return (
    <Paper style={{ ...SpacingDesign.padding(2), marginTop: '5px' }}>
      <TextField
        id="commentBody"
        label="Write comment"
        variant="outlined"
        fullWidth
        borderRadius="50%"
        style={{ ...SpacingDesign.marginBottom(1), ...SpacingDesign.marginTop(1) }}
        onChange={(e) => setBody(e.target.value)}
      />
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
          Post Comment
        </Typography>
      </Button>

    </Paper>
  );
};

export default AddCommentForm;
