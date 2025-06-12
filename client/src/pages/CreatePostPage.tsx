import React from 'react';
import '../styles/posts.scss';
import CreatePost from '../components/posts/CreatePost';
import PostList from '../components/posts/PostList';

const CreatePostPage: React.FC = () => {


  return (
    <div className="post_container p-2 xxs:p-8">
    
          <CreatePost />
          <PostList />

     
    </div>
  );
};

export default CreatePostPage;