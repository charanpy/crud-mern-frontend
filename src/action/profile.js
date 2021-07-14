import axios from 'axios';
import { setAlert } from './alert';

import {
  PROFILE_ERROR,
  GET_PROFILE,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  DELETE_ACCOUNT,
  GET_PROFILES,
  GET_REPOS,
} from './type';

//get all profile
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  await axios
    .get(`${process.env.REACT_APP_BACKEND}/api/profile`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: GET_PROFILES,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
      console.log(error.data);
    });
};

//get profile by id
export const getProfileById = (userId) => async (dispatch) => {
  await axios
    .get(`${process.env.REACT_APP_BACKEND}/api/profile/user/${userId}`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
      console.log(error.data);
    });
};

//get github repos
export const getGithubRepos = (username) => async (dispatch) => {
  await axios
    .get(`${process.env.REACT_APP_BACKEND}/api/profile/github/${username}`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: GET_REPOS,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
      console.log(error.data);
    });
};

export const getCurrentProfile = () => async (dispatch) => {
  await axios
    .get(`${process.env.REACT_APP_BACKEND}/api/profile/me`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
      console.log(error.data);
    });
};

//create or update

export const createProfile =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND}/api/profile`,
        formData,
        config
      );
      dispatch({
        type: 'GET_PROFILE',
        payload: res.data,
      });
      dispatch(setAlert(edit ? 'Profile updated' : 'Profile created'));
      if (!edit) {
        history.push('/dashboard');
      }
    } catch (err) {
      const errors = err.response.data.errors;
      console.log(errors);
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
//Add experience

export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.put(
      `${process.env.REACT_APP_BACKEND}/api/profile/experience`,
      formData,
      config
    );
    dispatch({
      type: 'UPDATE_PROFILE',
      payload: res.data,
    });
    dispatch(setAlert('Experience added', 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add education

export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.put(
      `${process.env.REACT_APP_BACKEND}/api/profile/education`,
      formData,
      config
    );
    dispatch({
      type: 'UPDATE_PROFILE',
      payload: res.data,
    });
    dispatch(setAlert('Education added', 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//del exp
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_BACKEND}/api/profile/experience/${id}`
    );

    dispatch({
      type: 'UPDATE_PROFILE',
      payload: res.data,
    });
    dispatch(setAlert('Experience deleted', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//edu del

export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_BACKEND}/api/profile/education/${id}`
    );

    dispatch({
      type: 'UPDATE_PROFILE',
      payload: res.data,
    });
    dispatch(setAlert('Education deleted', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//del account

export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure?THIS cannot be undone')) {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_BACKEND}/api/profile`
      );

      dispatch({
        type: 'CLEAR_PROFILE',
      });
      dispatch({
        type: 'DELETE_ACCOUNT',
      });
      dispatch(setAlert('Your account has been removed permanntly'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
