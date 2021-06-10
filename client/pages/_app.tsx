import { AppProps } from 'next/app'
import React from 'react'
import {SocketContext, socket} from 'context/socket';
import {userInfoContext, userInfo} from 'context/userInfo';


const App = ({ Component, pageProps }: AppProps) => {
  return (
      <SocketContext.Provider value={socket}>
          <userInfoContext.Provider value={userInfo}>
              <Component {...pageProps} />
          </userInfoContext.Provider>
      </SocketContext.Provider>
  )
}

export default App
