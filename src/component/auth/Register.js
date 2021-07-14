import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { setAlert } from '../../action/alert'
import PropTypes from 'prop-types';
import { register } from '../../action/auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Register = ({ isAuthenticated, setAlert, register }) => {
            const [formData, setFormData] = useState({
                        name: '',
                        email: '',
                        password: '',
                        password1: ''
            });
            const { name, email, password, password1 } = formData
            const onChange = (e) => {
                        setFormData({ ...formData, [e.target.name]: e.target.value })
                        console.log(name)
            }
            const notify = () => toast.warning('Incorrect Password');
            const onSubmit = async e => {
                        e.preventDefault();
                        if (password !== password1) {
                                    //setAlert('not match', 'danger')
                                    notify();

                        } else {
                                    register({ name, email, password })

                        }
            }
            if (isAuthenticated) {
                        return <Redirect to='/dashboard' />

            }
            return (
                        <section className="container">
                                    <h1 className="large text-primary">Sign Up</h1>
                                    <ToastContainer

                                                position="top-center"
                                                autoClose={10000}
                                                newestOnTop={false}
                                                closeOnClick
                                                rtl={false}
                                                pauseOnFocusLoss
                                                draggable
                                    />
                                    <p className="lead"><i class="fas fa-user"></i> Create Your Account</p>
                                    <form onSubmit={onSubmit} className="form" action="create-profile.html">
                                                <div className="form-group">
                                                            <input type="text" placeholder="Name" name="name" value={name}
                                                                        onChange={(e) => onChange(e)}
                                                                        required />
                                                </div>
                                                <div className="form-group">
                                                            <input type="email" placeholder="Email Address" name="email"
                                                                        value={email}
                                                                        onChange={e => onChange(e)}
                                                            />
                                                            <small className="form-text"
                                                            >This site uses Gravatar so if you want a profile image, use a
                              Gravatar email</small>
                                                </div>
                                                <div className="form-group">
                                                            <input
                                                                        type="password"
                                                                        placeholder="Password"
                                                                        name="password"
                                                                        minLength="6"
                                                                        value={password}
                                                                        onChange={e => onChange(e)}
                                                            />
                                                </div>
                                                <div class="form-group">
                                                            <input
                                                                        type="password"
                                                                        placeholder="Confirm Password"
                                                                        name="password1"
                                                                        minLength="6"
                                                                        value={password1}
                                                                        onChange={e => onChange(e)}
                                                            />
                                                </div>
                                                <input type="submit" className="btn btn-primary" value="Register" />
                                    </form>
                                    <p className="my-1">
                                                Already have an account? <Link to="/login">Sign In</Link>
                                    </p>
                        </section>

            )

}
Register.propTypes = {
            setAlert: PropTypes.func.isRequired,
            register: PropTypes.func.isRequired,
            isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
            isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, { setAlert, register })(Register)