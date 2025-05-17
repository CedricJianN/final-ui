import { useEffect, useState } from 'react';
import { getPosts } from '../api';
import PostItem from './PostItem';

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  return (
    <div>
      {posts.map(post => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostList;