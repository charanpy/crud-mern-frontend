import React from 'react'
import { Link } from "react-router-dom"
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../action/auth'
function Navbar({ auth: { isAuthenticated, loading }, logout }) {
            const authLinks = (
                        <ul>
                                    <li><Link to='/dashboard'>Dashboard</Link></li>
                                    <li><a onClick={logout} href="#!">
                                                <i className='fas fa-sign-out-alt'></i>{' '}<span className='hide-sm'>
                                                            Logout</span></a></li>
                                    <li><Link to='/profiles'>Developer</Link></li>
                                    <li><Link to='/posts'>Posts</Link></li>

                        </ul>


            )
            const guestLinks = (
                        <ul>
                                    <li><Link to="/profiles">Developers</Link></li>
                                    <li><Link to="/register">Register</Link></li>
                                    <li><Link to="/login">Login</Link></li>
                        </ul>

            )
            return (
                        <div>
                                    <nav className="navbar bg-dark">
                                                <h1>
                                                            <a href="/"><i className="fas fa-code"></i> DevConnector</a>
                                                </h1>
                                                {!loading && (<div>{isAuthenticated ? authLinks : guestLinks}</div>)}
                                    </nav>
                        </div>
            )
}
Navbar.propTypes = {
            logout: PropTypes.func.isRequired,
            auth: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
            auth: state.auth
})
export default connect(mapStateToProps, { logout })(Navbar)