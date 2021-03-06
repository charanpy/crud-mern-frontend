import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deletePost, addLike, removeLike } from '../../action/post';

const PostItem = ({
  deletePost,
  addLike,
  removeLike,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
}) => {
  return (
    <div class='post bg-white p-1 my-1'>
      <div>
        <a href='profile.html'>
          <img class='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </a>
      </div>
      <div>
        <p class='my-1'>{text}</p>
        <p class='post-date'>
          <Moment format='YYY/MM/DD'>{date}</Moment>
        </p>
        <button
          type='button'
          class='btn btn-light'
          onClick={(e) => addLike(_id)}
        >
          <i class='fas fa-thumbs-up'></i>
          {likes.length > 0 && <span>{likes.length}</span>}
        </button>
        <button
          type='button'
          class='btn btn-light'
          onClick={(e) => removeLike(_id)}
        >
          <i class='fas fa-thumbs-down'></i>
        </button>

        {!auth.loading && user === auth.user._id && (
          <button
            onClick={() => deletePost(_id)}
            type='button'
            class='btn btn-danger'
          >
            <i class='fas fa-times'></i>
          </button>
        )}
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { deletePost, addLike, removeLike })(
  PostItem
);
