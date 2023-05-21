import React from 'react';
import Link from 'next/link';

const LandingPage = () => {
  return (
    <header style={HeaderStyle} className='flex flex-col justify-center items-center gap-2'>
      
      <div className="site-card-wrapper" >
        <div className="container border border-slate-200/50 rounded-xl flex flex-col items-center gap-2 m-1 p-4 bg-slate-200/25" style={{minWidth:"300px", position:"relative"}}>
          <div className="text-center">
            <h1 className=" text-white text-2xl font-bold pb-4">Login page</h1>
            <Link href="/api/auth/login"><button className="btn btn-primary">Log in</button></Link>
          </div>
        </div>
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
};

export default LandingPage;
