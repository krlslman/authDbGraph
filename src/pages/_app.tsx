import {UserProvider} from '@auth0/nextjs-auth0/client';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { StateContextProvider } from '../context/StateContext';
import '@/utils/passiveEvents.js';

export default function App({ Component, pageProps }: AppProps): JSX.Element {

  return (
    <UserProvider>
      <StateContextProvider>
        <Component {...pageProps} />
      </StateContextProvider>
    </UserProvider>
  );
}
