import React from 'react'
import Dapp from './component/Dapp'
import { useContract } from 'web3-hooks'
import { SmartwordsAddress, SmartWordsAbi } from './contracts/SmartWords'


export const SmartWordsContext = React.createContext(null)


function App() {

  const smartWords = useContract(SmartwordsAddress, SmartWordsAbi)
  return (
    <>
      <SmartWordsContext.Provider value={smartWords}>
        <Dapp />
      </SmartWordsContext.Provider>
    </>
  )
}

export default App;