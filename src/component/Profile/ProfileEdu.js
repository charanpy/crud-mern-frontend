import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment';
const ProfileEdu = ({ experience: {
            school, degree, fieldsofstudy, current, to, from, description
} }) => {
            return (
                        <div>
                                    <h3 className='text-dark'>{school}</h3>
                                    <p><Moment format='YYY/MM/DD'>{from}</Moment>-{!to ? 'Now' :

                                                <Moment format='YYY/MM/DD'>{to}</Moment>}</p>

                                    <p> <strong>Degree:</strong>{degree}
                                    </p>

                                    <p> <strong>Fieldofstudy</strong>{fieldsofstudy}
                                    </p>
                                    <p>{description}</p>
                        </div>
            )
}

ProfileEdu.propTypes = {
            experience: PropTypes.object.isRequired
}

export default ProfileEdu
