import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Moment from 'react-moment'
import { addEducation } from '../../action/profile';
import { deleteEducation } from '../../action/profile';

const Education = ({ education, deleteEducation }) => {
            const educations = education.map(exp => (

                        < tr key={exp._id}>
                                    <td>{exp.school}</td>
                                    <td className='hide-sm'>{exp.degree}</td>

                                    <td>
                                                <Moment format='YYY/MM/DD'>{exp.from}</Moment>-{
                                                            exp.to === null ? ('Now') : (<Moment format='YYY/MM/DD'></Moment>)
                                                }
                                    </td>
                                    <td><button onClick={() => deleteEducation(exp._id)} className='btn btn-danger'>Delete</button></td>

                        </tr>
            ))
            return (
                        <td>
                                    <h2 className='my-2'>Education Credentials</h2>
                                    <table className='table'>
                                                <thead>
                                                            <tr>
                                                                        <th>school</th>
                                                                        <th className='hide-sm'>degree</th>
                                                                        <th className='hide-sm'>Years</th>
                                                            </tr>
                                                </thead>
                                                <tbody>
                                                            {educations}
                                                </tbody>
                                    </table>
                        </td>
            )
}

Education.propTypes = {
            education: PropTypes.array.isRequired,
            deleteEducation: PropTypes.func.isRequired
}

export default connect(null, { deleteEducation })(Education)
