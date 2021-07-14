import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import spinner from '../layout/spinner';
import { getProfileById } from '../../action/profile'
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExp from './ProfileExp';
import ProfileEdu from './ProfileEdu';
import ProfileGit from './ProfileGit';


const Profiles = ({ getProfileById, match, profile: { profile, loading }, auth }) => {
            useEffect(() => {
                        getProfileById(match.params.id)
            }, [getProfileById])
            return (
                        <div>
                                    {profile === null || loading ? <spinner /> : (<Fragment>
                                                <Link to='/profiles' className='btn btn-light'>Back to Profiles</Link>

                                                {auth.isAuthenticated && auth.loading === false
                                                            && auth.user._id === profile.user._id && (
                                                                        <Link t0='/edit-profile'>Edit</Link>
                                                            )}


                                                <div className="profile-grid my-1">
                                                            <ProfileTop profile={profile} />
                                                            <ProfileAbout profile={profile} />
                                                            <div className='profile-exp bg-white p-2'>
                                                                        <h2 className='text-primary'>Experience</h2>
                                                                        {profile.experience.length > 0 ? (
                                                                                    <div>
                                                                                                {profile.experience.map(exp => (
                                                                                                            <ProfileExp key={exp._id} experience={exp} />
                                                                                                ))}
                                                                                    </div>
                                                                        ) : (<h4>No exp provided</h4>)}
                                                            </div>

                                                            <div className='profile-exp bg-white p-2'>
                                                                        <h2 className='text-primary'>Education</h2>
                                                                        {profile.education.length > 0 ? (
                                                                                    <div>
                                                                                                {profile.education.map(exp => (
                                                                                                            <ProfileEdu key={exp._id} experience={exp} />
                                                                                                ))}
                                                                                    </div>
                                                                        ) : (<h4>No education credential  provided</h4>)}
                                                            </div>
                                                            {profile.githubusername && (
                                                                        <ProfileGit username={profile.githubusername} />
                                                            )}
                                                </div>
                                    </Fragment>)}
                        </div>
            )
}

Profiles.propTypes = {
            getProfileById: PropTypes.func.isRequired,
            profile: PropTypes.object.isRequired,
            auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
            profile: state.profile,
            auth: state.auth
})

export default connect(mapStateToProps, { getProfileById })(Profiles)
