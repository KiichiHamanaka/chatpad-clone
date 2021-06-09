import { AppProps } from 'next/app'
import React from 'react'
import {SocketContext, socket} from 'context/socket';

const App = ({ Component, pageProps }: AppProps) => {
  return (
      <SocketContext.Provider value={socket}>
        <Component {...pageProps} />
      </SocketContext.Provider>
  )
}

export default App
