import Header from './Header'
import Footer from './Footer'
import LandingPage from './LandingPage'
import { useContext, useState } from 'react'
import { Web3Context } from 'web3-hooks'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Link as ReachLink } from 'react-router-dom'
import {
  Box,
  Button,
  Link,
  Center,
  VStack,
  HStack,
} from '@chakra-ui/react'
import CreateUser from './CreateUser'

function Dapp() {
  const [web3State, login] = useContext(Web3Context)
  const [tokenBalance, setTokenBalance] = useState(9999999)
  const [deliveryBalance, setDeliveryBalance] = useState(1111111)

  return (
    <>
      <Router>
        <Box position="sticky" w="100%" top="0" zIndex="sticky">
          <HStack as="nav" bg="gray.300" py="1">
            <Link as={ReachLink} to={'/CreateUser'} ml="2" px="5"> My account </Link>
            <Link as={ReachLink} to={'/LandingPage'} px="5">My NFT List</Link>
          </HStack>
          <Header tokenBalance={tokenBalance} setTokenBalance={setTokenBalance} deliveryBalance={deliveryBalance} setDeliveryBalance={setDeliveryBalance} />
        </Box>
        <VStack pb="20">
          {!web3State.isLogged ?
            <>
              <Center px="2" mt="10" mb="5" w="75%" py="12" bg="red.500" fontSize="20" color="white">Vous devez vous connecter à MetaMask sur le TestNet Kovan</Center>
              {!web3State.isLogged && (<Button colorScheme="orange" onClick={login}>login MetaMask
              </Button>)}
            </> :
            <>
              <Switch>
                <Route exact path='/' component={LandingPage} />
                <Route
                  path='/'
                  component={() => <LandingPage tokenBalance={tokenBalance} setTokenBalance={setTokenBalance} />} />
                <Route path='/CreateUser' component={CreateUser} />
              </Switch>
            </>
          }
        </VStack>
      </Router>
      < Footer />
    </>
  )
}

export default Dapp