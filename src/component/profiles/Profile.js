import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types'
import spinner from '../layout/spinner'
import ProfileItem from './ProfileItem';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { getProfiles } from '../../action/profile'
const Profile = ({ getProfiles, profile: { profiles, loading } }) => {
            useEffect(() => {
                        getProfiles();
            }, [getProfiles])
            return (
                        <>
                                    {loading ? <spinner /> : (<>
                                                <h1 className='large text-primary'>Developers</h1>
                                                <p className='lead'>
                                                            <i className='fab fa-connectivity'></i> Browse and connect with devs
                                    </p>
                                                <li><Link to='/profiles'>Developer</Link></li>
                                                <div className='profiles'>
                                                            {profiles.length > 0 ? (profiles.map(pro => (
                                                                        <ProfileItem key={pro._id} profile={pro} />
                                                            ))) : (<h4>Nope</h4>)}
                                                </div>
                                    </>)}
                        </>
            )
}

Profile.propTypes = {
            getProfiles: PropTypes.func.isRequired,
            profile: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
            profile: state.profile
})
export default connect(mapStateToProps, { getProfiles })(Profile)
