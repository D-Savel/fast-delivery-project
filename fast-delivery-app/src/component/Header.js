import { useContext } from 'react'
import { Web3Context } from 'web3-hooks'
import {

  Text,
  Box,
  Button,
  Stack,
  VStack,
  Flex
} from '@chakra-ui/react'

import MetaMaskParameters from './MetaMaskParameters'
import User from './User'

function Header(props) {
  const { tokenBalance, setTokenBalance, deliveryBalance, setDeliveryBalance } = props
  const [web3State, login] = useContext(Web3Context);

  return (
    <Box as="header" bg="black" pt="1">
      <Stack
        direction={["column", "column", "row"]}
        sx={{
          gap: "0rem",
        }}
        align="center"
        justify="space-between"
      >
        < MetaMaskParameters />
        <Flex direction="column">
          <Text align="center" fontSize="3xl" color="white" > Fast</Text>
          <Text align="center" fontSize="3xl" color="white" > Delivery</Text>
          <Text align="center" fontSize="3xl" color="white" >App</Text>
        </Flex>
        <User web3Id={web3State.chainId} tokenBalance={tokenBalance} setTokenBalance={setTokenBalance} deliveryBalance={deliveryBalance} setDeliveryBalance={setDeliveryBalance} />
      </Stack>
    </Box>
  )
}

export default Header