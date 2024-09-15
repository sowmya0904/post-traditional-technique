// src/components/UserPostsIndex.jsx
import React, { lazy, useState, useCallback, Suspense } from 'react'; // Add Suspense here
import AddPostForm from './AddPostForm';

const UserPostsList = lazy(() => import('./UserPostsList'));

const UserPostsIndex = ({
  signedIn,
  posts,
  localTime,
  onAddPost,
  onDeletePost,
  onUpdatePost,
}) => {
  const [editingPostId, setEditingPostId] = useState(null);

  const handleEditPost = useCallback((id) => {
    setEditingPostId(id);
    fetchUsers();
  }, []);

  const handleCancelEdit = useCallback(() => {
    setEditingPostId(null);
  }, []);

  const fetchUsers = useCallback(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => console.log('Fetched users:', data));
  }, []);

  return (
    <div className="my-1 p-2 box">
      <div className="m-1 py-1">
        <h2 className="heading-md">Your Posts (Updated at {localTime})</h2>
        <p className="m-1 p-1">{signedIn ? 'Signed in' : 'Signed out'}</p>
        <AddPostForm addPost={onAddPost} />
        {posts && (
          <div className="px-1">
            <Suspense fallback={<div>Loading...</div>}>
              <UserPostsList
                posts={posts}
                deletePost={onDeletePost}
                editPost={handleEditPost}
                cancelEdit={handleCancelEdit}
                editingPostId={editingPostId}
                updatePost={onUpdatePost}
              />
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPostsIndex;
