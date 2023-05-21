// import { UserProvider } from '@auth0/nextjs-auth0/client';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { StateContextProvider } from '../context/StateContext';

export default function App({ Component, pageProps }: AppProps): JSX.Element {

  return (
    // <UserProvider>
      <StateContextProvider>
        <Component {...pageProps} />
      </StateContextProvider>
    // </UserProvider>
  );
}
