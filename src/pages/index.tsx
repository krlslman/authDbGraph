import Head from 'next/head'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
// import { useUser } from '@auth0/nextjs-auth0/client'
// import LandingPage from '../components/LandingPage'
// import Membersonly from './membersonly'

export default function Home() {
  // const { user, error, isLoading } = useUser();
  // if (isLoading) return <div>Loading...</div>
  // if (error) return <div>{error.message}</div>
  
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/antd/dist/antd.min.css" />
      </Head>
      <main>
          {/* { !user && <LandingPage /> } */}
          {/* { user && <Membersonly /> } */}
          <h1 className='text-9xl text-center'>TEST</h1>
      </main>
    </>
  )
}
