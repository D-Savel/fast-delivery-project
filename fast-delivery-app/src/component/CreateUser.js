/* eslint-disable no-useless-escape */
import { useContext, useState } from 'react'
import { ethers } from 'ethers'
import {
  Input,
  Textarea,
  HStack,
  FormControl,
  FormLabel,
  Box,
  Center,
  Button,
  Flex,
  Heading,
  VStack,
  useToast,
} from '@chakra-ui/react'

import { SmartWordsContext } from '../App'

function CreateUser() {

  const smartWords = useContext(SmartWordsContext)
  const [isLoading, setIsLoading] = useState(false)
  const [textContent, setTextContent] = useState('')
  const [textTitle, setTextTitle] = useState('')
  const [textUrl, setTextUrl] = useState('')
  const toast = useToast()

  const handleClickRegister = async () => {
    // eslint-disable-next-line no-useless-escape
    const regex = /[\+?*//.,\/#!$%\^&\*;:{}=\-_`~()§/\s]/g
    let cleanTextContent = (textContent.replace(regex, ""))
      .toUpperCase()
    let textHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(cleanTextContent))
    try {
      setIsLoading(true)
      let textAddress = await smartWords.textHashOf(textHash)
      if (textAddress !== ethers.constants.AddressZero) {
        toast({
          title: 'This text has already been registered',
          description: `Your NFT has not been created by ${textAddress}\n
          le `,
          duration: 9000,
          status: 'error',
          isClosable: true,
        })
      } else {
        let tx = await smartWords.registerText(textTitle, textHash, textUrl)
        await tx.wait()
        toast({
          title: 'Confirmed transaction',
          description: `Your text have been registered\nTransaction hash: ${tx.hash}`,
          status: 'success',
          duration: 9000,
          isClosable: true,
          position: 'bottom'
        })
        setTextContent('')
        setTextTitle('')
        setTextUrl('')
      }
    } catch (e) {
      if (e.code) {
        toast({
          title: 'Transaction signature denied',
          description: e.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  return (

    <Flex flexDirection="column" alignItems="center" m="1">
      <Center border="1px" borderRadius="lg" borderColor="dark" bg="blue.500" w="600px" color="white" mb="1" p="1">
        <Heading size="xl">Create my NFT Text</Heading>
      </Center>
      <Box display="flex" border="1px"
        borderRadius="lg"
        borderColor="blue.300"
        w="100%"
        h="auto">
        <VStack >
          <Box m="2" as="form">
            <FormControl id="nftInfo" isRequired>
              <FormLabel my="0" htmlFor="nftText">My Text</FormLabel>
              <Textarea m="2" w="100%" h="135px" placeholder="My text here" onChange={(event) => setTextContent(event.target.value)} value={textContent} />
            </FormControl>
            <FormControl id="nftTitle" isRequired>
              <FormLabel my="0" htmlFor="nftTitle">NFT Title</FormLabel>
              <Input
                m="2"
                w="100%"
                placeholder="Title "
                onChange={(event) => setTextTitle(event.target.value)} value={textTitle} />
            </FormControl>
            <HStack align="end" justify="center">
              <FormControl id="nftUrl" isRequired>
                <FormLabel my="0" htmlFor="nftUrl">NFT Url</FormLabel>
                <Input
                  mx="2"
                  w="480px"
                  type="url"
                  placeholder="http://...."
                  onChange={(event) => setTextUrl(event.target.value)}
                  value={textUrl}
                />
              </FormControl>
              <Button
                isLoading={isLoading}
                loadingText="Register"
                colorScheme="blue"
                onClick={handleClickRegister}
                fontSize="13"
                size="sm"
              >
                Register
              </Button>
            </HStack>
          </Box>
        </VStack>
      </Box>
      <VStack spacing="0" borderRadius="lg" borderColor="dark" bg="red.400" w="600px" color="white" mt="2">
      </VStack>
    </Flex>
  )
}

export default CreateUser