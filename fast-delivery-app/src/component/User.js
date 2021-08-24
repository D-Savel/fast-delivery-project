import { useContext, useEffect, useState } from 'react'
import {
  Badge,
  Box,
  Text,
  Flex,
  VStack,
} from '@chakra-ui/react'

import { Web3Context } from 'web3-hooks'
import { SmartWordsContext } from '../App'

function User(props) {
  const { nftTokenBalance, setNftTokenBalance } = props
  const [web3State] = useContext(Web3Context)
  const smartWords = useContext(SmartWordsContext)
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // si simpleStorage est pas null alors
    if (smartWords) {
      const GetNftBalanceOf = async () => {
        try {
          console.log('useEffect USER')
          setIsLoading(true)
          const getTokenBalance = await smartWords.balanceOf(web3State.account)
          setNftTokenBalance(Number(getTokenBalance))
        } catch (e) {
          console.log(e)
        } finally {
          setIsLoading(false)
        }
      }
      const cb = (from, to, tokenId) => {
        GetNftBalanceOf()
      }
      GetNftBalanceOf()
      const userFilter = smartWords.filters.Transfer(null, web3State.account)
      // ecouter sur l'event DataSet avec le filter eveFilter appliqué
      smartWords.on(userFilter, cb)
      return () => {
        // arreter d'ecouter lorsque le component sera unmount
        smartWords.off(userFilter, cb)
      }
    }
  }, [setNftTokenBalance, smartWords, web3State.account])



  return (
    <VStack py="1" align="center">
      <Box>
        <Badge w="430px" mx="2" py="1" px="2" fontSize="14" textTransform="lowerCase" borderRadius="md"> Address : {' '}
          {
            web3State.isLogged ? <Badge fontSize="12" mx="1" px="2" variant="solid" color="white" colorScheme="blue">{web3State.account}</Badge>
              : <Badge mx="1" py="1" px="2" variant="solid" colorScheme="red">{web3State.account}</Badge>
          }
        </Badge>
      </Box>
      <Flex>
        <VStack mr="5" pt="1">
          <Text color="white" as="b" fontSize="20">User</Text>
          <Text color="white" as="b" fontSize="20">Balance</Text>
        </VStack>
        <Box maxW="215px" mr="2">
          <Badge w="268px" mx="2" py="1" px="2" fontSize="11" borderRadius="md">Ether(s):{' '}
            {web3State.provider ? <Badge fontSize="13" mx="2" px="2" variant="solid" colorScheme="blue">{web3State.balance}</Badge>
              : <Badge mx="2" py="1" px="2" variant="solid" colorScheme="red">{web3State.balance}</Badge>}
          </Badge>
          <Badge w="268px" mx="2" py="1" mt="2" px="2" fontSize="11" borderRadius="md">NFT Token(s):{' '}
            {web3State.provider ? <Badge fontSize="13" mx="2" px="2" variant="solid" colorScheme="blue">{nftTokenBalance} NFT</Badge>
              : <Badge mx="2" py="1" px="2" variant="solid" colorScheme="red">{nftTokenBalance} NFT</Badge>}
          </Badge>
        </Box>
      </Flex>
    </VStack>
  )
}

export default User