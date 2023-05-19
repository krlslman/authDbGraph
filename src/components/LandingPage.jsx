import React from 'react';
import Link from 'next/link';

const LandingPage = () => {
  return (
    <header style={HeaderStyle} className='d-flex flex-column justify-content-center gap-5'>
      <h1 className="text-center">Login page</h1>
      <div className="d-flex justify-content-center gap-2">
          <Link href="/api/auth/login"><button className="btn btn-primary">log in</button></Link>
      </div>
    </header>
  );
};

const HeaderStyle = {
  width: '100vw',
  height: '100vh',
  background: 'url("https://wallpaperaccess.com/full/9070071.png")',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  // position: 'fixed',
  // top: '0'
};

export default LandingPage;
