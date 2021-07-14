import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment';
const ProfileExp = ({ experience: {
            company, title, location, current, to, from, description
} }) => {
            return (
                        <div>
                                    <h3 className='text-dark'>{company}</h3>
                                    <p><Moment format='YYY/MM/DD'>{from}</Moment>-{!to ? 'Now' :

                                                <Moment format='YYY/MM/DD'>{to}</Moment>}</p>

                                    <p> <strong>Position :</strong>{title}
                                    </p>
                                    <p>{description}</p>
                        </div>
            )
}

ProfileExp.propTypes = {
            experience: PropTypes.object.isRequired
}

export default ProfileExp
