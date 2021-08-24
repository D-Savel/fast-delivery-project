import { useContext } from 'react'
import { Web3Context } from 'web3-hooks'
import {
  Icon,
  Box,
  Badge,
  Text,
  HStack,
} from '@chakra-ui/react'

function MetaMaskParameters() {
  const [web3State] = useContext(Web3Context)

  const CircleIcon = (props) => (
    < Icon viewBox="0 0 200 200" {...props}>
      <path
        fill="currentColor"
        d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
      />
    </Icon >
  )

  return (
    <Box pl="2" py="2">
      <HStack pb="4" w="350px">
        <Text color="white" as="b" fontSize="20" me="1" p="1">MetaMask</Text>
        <Badge mx="2" py="1" px="3" fontSize="13" textTransform="lowerCase" borderRadius="md"> installed
          {web3State.isMetaMask ? <CircleIcon mx="1" boxSize="6" color="green.500" />
            : <CircleIcon mx="1" boxSize="6" color="red.500" />}
        </Badge>
        <Badge mx="2" py="1" px="2" fontSize="13" textTransform="lowerCase" borderRadius="md"> logged
          {web3State.isLogged ? <CircleIcon mx="1" boxSize="6" color="green.500" />
            : <CircleIcon mx="1" boxSize="6" color="red.500" />}
        </Badge>
      </HStack>
      <HStack>
        <Text mr="4" color="white" as="b" fontSize="20" p="1">Network</Text>
        <Badge mx="2" py="1" px="2" fontSize="13" textTransform="lowerCase" borderRadius="md">Id
          {web3State.isLogged ? <Badge mx="2" py="1" px="2" variant="solid" colorScheme="green">{web3State.chainId}</Badge>
            : <Badge mx="2" py="1" px="2" variant="solid" colorScheme="red">-</Badge>}
        </Badge>
        <Badge px="2" py="1" fontSize="13" textTransform="lowerCase" borderRadius="md">Name :{' '}
          {web3State.isLogged ? <Badge mx="2" py="1" px="2" variant="solid" colorScheme="green">{web3State.networkName}</Badge>
            : <Badge mx="2" py="1" px="2" variant="solid" colorScheme="red">{web3State.networkName}</Badge>}
        </Badge>
      </HStack>
    </Box>
  )
}

export default MetaMaskParameters