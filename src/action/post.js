import axios from 'axios';

import { setAlert } from './alert';

import {
  GET_POST,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
} from './type';

//Get post

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND}/api/post`);

    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//Add like
export const addLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_BACKEND}/api/post/like/${postId}`
    );

    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data },
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//remove like

export const removeLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_BACKEND}/api/post/unlike/${postId}`
    );

    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data },
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//delete post

export const deletePost = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_BACKEND}/api/post/${id}`
    );

    dispatch({
      type: DELETE_POST,
      payload: id,
    });
    dispatch(setAlert('Post Removed', 'success'));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//add post

export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND}/api/post`,
      formData,
      config
    );

    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
    dispatch(setAlert('Post Created', 'success'));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
