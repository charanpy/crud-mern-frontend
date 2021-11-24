import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../action/auth';

function Login({ login, isAuthenticated }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState([]);

  const { email, password } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await login(email, password)
      .then((res) => console.log(res))
      .catch((e) => {
        console.log(e);
        setError((error) => [...error, e]);
      });
    console.log('e', error);

    console.log('e', error);
  };
  //redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <section className='container'>
      <h1 className='large text-primary'>Sign In</h1>

      <p className='lead'>
        <i class='fas fa-user'></i> Create Your Account
      </p>
      <form onSubmit={onSubmit} className='form' action='create-profile.html'>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            minLength='6'
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>

        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </section>
  );
}
Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login })(Login);
