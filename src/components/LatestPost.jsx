import React, { useState, useEffect, useCallback } from 'react';
import Post from './Post';

const LatestPost = ({ signedIn, post }) => {
  const [likesCount, setLikesCount] = useState(0);

  const fetchUsers = useCallback(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => console.log('Fetched users:', data));
  }, []);

  const expensiveCalculation = useCallback((num) => {
    let result = 0;
    for (let i = 0; i < 100000000; i++) {
      result += Math.sqrt(num) + Math.sin(num) * Math.cos(num);
    }
    return result;
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLikesCount((likesCount) => likesCount + 1);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  expensiveCalculation(likesCount);

  return (
    <div className="my-2 mx-2 p-2 border border-rounded">
      {post ? (
        <>
          <Post signedIn={signedIn} post={post} />
          <div className="my-1 p-1">
            <span>{likesCount}</span>&nbsp;<span>Likes</span>
          </div>
        </>
      ) : (
        <p>Click on Get Latest Post button</p>
      )}
    </div>
  );
};

export default LatestPost;
