import React, { useState, useEffect, lazy, Suspense } from 'react';

const LatestPost = lazy(() => import('./LatestPost'));
const UserPostsIndex = lazy(() => import('./UserPostsIndex'));

const Blog = ({ signedIn }) => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [localTime, setLocalTime] = useState(new Date().toLocaleTimeString());

  const fetchPosts = () => {
    const allPosts = require('../data/allPosts.json');
    const newPosts = require('../data/newPosts.json');
    const randomIndex = Math.round(Math.random() * 2);
    setPosts([...allPosts, newPosts[randomIndex]]);
    fetchUsers();
  };

  const fetchUsers = React.useCallback(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const handleAddPost = React.useCallback((newPost) => {
    setPosts([newPost, ...posts]);
    fetchUsers();
  }, [posts, fetchUsers]);

  const handleDeletePost = React.useCallback((id) => {
    setPosts(posts.filter((post) => post.id !== id));
    fetchUsers();
  }, [posts, fetchUsers]);

  const handleUpdatePost = React.useCallback((id, updatedPost) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, ...updatedPost } : post
      )
    );
    fetchUsers();
  }, [posts, fetchUsers]);

  useEffect(() => {
    fetchPosts();
    fetchUsers();
    const intervalId = setInterval(() => {
      setLocalTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(intervalId);
  }, [fetchUsers]);

  return (
    <div className="container">
      <h1 className="m-1 p-1 text-center heading-lg">code splitting in React</h1>
      <div className="m-1 p-2">
        <div className="my-1 p-2 box">
          <div className="latest-posts-top">
            <h3 className="heading-md my-1 p-1">Latest posts</h3>
            <div className="p-1">{localTime}</div>
          </div>
          <div className="my-1">
            <button className="btn btn-primary" onClick={fetchPosts}>
              Get Latest Post
            </button>
          </div>
          <hr className="hr my-2" />
          <Suspense fallback={<div>Loading...</div>}>
            <LatestPost signedIn={signedIn} post={posts[0]} />
          </Suspense>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <UserPostsIndex
            signedIn={signedIn}
            posts={posts}
            localTime={localTime}
            onAddPost={handleAddPost}
            onDeletePost={handleDeletePost}
            onUpdatePost={handleUpdatePost}
          />
        </Suspense>
        {signedIn && (
          <div className="my-1 p-2 box">
            <h2 className="heading-md">Fetched Users</h2>
            <ul>
              {users.map((user) => (
                <li key={user.id}>
                  {user.name} - {user.email}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
