import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../action/post';
import spinner from '../layout/spinner';
import PostItem from './PostItem';
import { Link } from 'react-router-dom';
const Post = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return (
    <>
      {loading ? (
        <spinner />
      ) : (
        <>
          <h1 className='large text-primary'>Posts</h1>
          <p className='lead'>
            <i className='fas fa-user'></i>Welcome to the community
          </p>
          <Link to='/add-posts'>ADD POSTS</Link>
          <div className='posts'>
            {posts !== null &&
              posts.length > 0 &&
              posts.map((post) => <PostItem key={post._id} post={post} />)}
          </div>
        </>
      )}
    </>
  );
};

Post.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  post: state.post,
});
export default connect(mapStateToProps, { getPosts })(Post);
