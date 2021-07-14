import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
} from './type';
import setAuthToken from '../utils/setAuthToken';
//load user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND}/api/auth`);
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const body = JSON.stringify({ name, email, password });

      axios
        .post(`${process.env.REACT_APP_BACKEND}/api/users`, body, config)
        .then((res) => {
          dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
          });
          dispatch(loadUser());
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.response.data);

          const errors = err.response.data.errors;
          console.log(errors);
          if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
          }

          dispatch({
            type: REGISTER_FAIL,
          });
        });
      // dispatch({
      //             type: REGISTER_SUCCESS,
      //             payload: res.data
      // })
    } catch (error) {
      console.log(error);
      // const errors = error.response.data.msg;
      // if (errors) {
      //             errors.forEach(err => dispatch(setAlert(err, 'danger')))
      // }

      // dispatch({
      //             type: REGISTER_FAIL
      // })
    }
  };

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  // try {
  const body = JSON.stringify({ email, password });

  return axios
    .post(`${process.env.REACT_APP_BACKEND}/api/auth`, body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());

      console.log(res.data);
      return res;
    })
    .catch((err) => {
      console.log(err.response.data);

      const errors = err.response.data.errors;
      console.log(errors);
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: LOGIN_FAIL,
      });

      return err.response.data.errors;
    });
  // dispatch({
  //             type: REGISTER_SUCCESS,
  //             payload: res.data
  // })

  // } catch (error) {
  //             console.log(error)
  //             // const errors = error.response.data.msg;
  //             // if (errors) {
  //             //             errors.forEach(err => dispatch(setAlert(err, 'danger')))
  //             // }

  //             // dispatch({
  //             //             type: REGISTER_FAIL
  //             // })

  // }
};
//logout/clear profile
export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
