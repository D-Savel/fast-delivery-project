import { useContext } from 'react'
import { Web3Context } from 'web3-hooks'
import {

  Heading, Box,
  Button,
  Stack,
  VStack
} from '@chakra-ui/react'

import MetaMaskParameters from './MetaMaskParameters'
import User from './User'

function Header(props) {
  const { nftTokenBalance, setNftTokenBalance } = props
  const [web3State, login] = useContext(Web3Context);

  return (
    <Box as="header" bg="black" pt="1">
      <Stack
        direction={["column", "column", "row"]}
        sx={{
          gap: "1rem",
        }}
        align="center"
        justify="space-between"
      >
        < MetaMaskParameters />
        <VStack py="1">
          <Heading align="center" as="h1" color="white">FastDelivery</Heading>
          <Heading align="center" as="h1" color="white">App</Heading>
          {!web3State.isLogged && (<Button colorScheme="orange" onClick={login}>login MetaMask
          </Button>)}
        </VStack>
        <User web3Id={web3State.chainId} nftTokenBalance={nftTokenBalance} setNftTokenBalance={setNftTokenBalance} />
      </Stack>
    </Box>
  )
}

export default Header