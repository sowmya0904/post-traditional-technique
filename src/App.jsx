import React, { useState, lazy, Suspense } from 'react';
import './App.css';

const Blog = lazy(() => import('./components/Blog'));

function App() {
  const [signedIn, setSignedIn] = useState(false);

  const handleToggleSignIn = () => {
    setSignedIn(!signedIn);
  };

  return (
    <main>
      <nav className="navbar">
        <button className="btn btn-danger" onClick={handleToggleSignIn}>
          {signedIn ? 'Sign Out' : 'Sign In'}
        </button>
      </nav>
      <Suspense fallback={<div>Loading...</div>}>
        <Blog signedIn={signedIn} />
      </Suspense>
    </main>
  );
}

export default App;
