import React from 'react';
import { connect } from 'react-redux';
import { addPost } from '../../action/post';

const PostForm = ({ auth, addPost }) => {
  console.log(auth);
  const text = React.useRef(null);
  const onSubmit = () => {
    const postText = text.current.value;
    const {
      user: { _id, name, avatar },
    } = auth;
    if (!postText) {
      alert('Please enter text');
      return;
    }
    addPost({ text: postText, user: _id, name, avatar });
  };
  return (
    <div>
      <input type='text' placeholder='Post Title' ref={text} />
      <button type='button' class='btn btn-light' onClick={onSubmit}>
        Add Post
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addPost })(PostForm);
