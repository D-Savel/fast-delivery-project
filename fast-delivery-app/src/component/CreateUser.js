/* eslint-disable no-useless-escape */
import { useContext, useState, useEffect } from 'react'
import { ethers } from 'ethers'
import {
  Input,
  List,
  ListItem,
  HStack,
  FormControl,
  FormLabel,
  Box,
  Center,
  Button,
  Flex,
  Heading,
  VStack,
  Select,
  useToast,
} from '@chakra-ui/react'
import axios from 'axios'
import { FastDeliveryUserContext } from '../App'

function CreateUser() {

  const [loading, setLoading] = useState(false);
  const [userAddress, setUserAddress] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isAdress, setisAdress] = useState(true);

  const fastDeliveryUser = useContext(FastDeliveryUserContext)
  const [isLoading, setIsLoading] = useState(false)
  const [userProfil, setUserProfil] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [companySiren, setCompanySiren] = useState('')
  const [addressInfo, setAddressInfo] = useState('')
  const [tel, setTel] = useState('')
  const [mail, setMail] = useState('')
  const toast = useToast()

  const handleChange = (e) => setUserAddress(e.target.value)
  const handleClickResult = (e) => {
    setUserAddress(e.target.textContent)
  }

  useEffect(() => {
    let url = `http://localhost:3333/address/?address=${userAddress}`
    console.log(url, 'url')
    const request = async () => {
      setLoading(true)
      try {
        let response = await axios.get(url)
        setSearchResults(response.data)
        if (response.data.length) {
          userAddress.toUpperCase().trim().localeCompare(response.data[0].adresse.trim()) === 0 ? setisAdress(true) : setisAdress(false)
        }
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    }
    request()
  }
    , [userAddress])

  const handleClickRegister = async () => {
    try {
      setIsLoading(true)
      /*
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
            */
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

    <Flex flexDirection="column" alignItems="center" pb="8" m="1">
      <Center border="1px" borderRadius="lg" borderColor="dark" bg="blue.500" w="420px" color="white" mb="1" p="1">
        <Heading size="xl">Fast Delivery register</Heading>
      </Center>
      <Box m="2" border="1px" borderRadius="lg" w="sm" borderColor="blue.300">
        <Box m="2" as="form">
          <FormControl isRequired>
            <FormLabel my="0" htmlFor="userProfil">User Profil</FormLabel>
            <Select onChange={(event) => setUserProfil(event.target.value)} value={userProfil} placeholder="Select a Profil">
              <option value="Sender">Sender</option>
              <option value="Deliveryman">Deliveryman</option>
            </Select>
          </FormControl>
        </Box>
      </Box>
      {userProfil && (
        <VStack >
          <Box m="2" border="1px" borderRadius="lg" w="sm" borderColor="blue.300">
            <Box m="2" as="form">
              <FormControl isRequired>
                <FormLabel my="0" htmlFor="firstName">{userProfil === "Sender" ? 'First name' : 'Manager first name'}</FormLabel>
                <Input
                  type="text"
                  m="1"
                  placeholder="First name"
                  onChange={(event) => setFirstName(event.target.value)} value={firstName} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel my="0" htmlFor="lastName">{userProfil === "Sender" ? 'Last name' : 'Manager last name'}</FormLabel>
                <Input
                  type="text"
                  m="1"
                  placeholder="Last name"
                  onChange={(event) => setLastName(event.target.value)} value={lastName} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel my="0" htmlFor="address">{userProfil === "Sender" ? 'Address' : 'Company address'}</FormLabel>
                <Input type="text" list="suggestionList" onChange={handleChange} autoComplete="off" placeholder="An address in Paris" value={userAddress.toLowerCase()} />
                {userAddress && !isAdress && <List as="ul" fontSize="12px" onClick={handleClickResult} p="2" spacing="1" bg="gray.200" border="1px" borderColor="gray.300" borderRadius="md">
                  {loading && (<ListItem>loading...</ListItem>)}
                  {!searchResults.length && !loading && (<ListItem>No result.</ListItem>)}
                  {searchResults.length && (
                    searchResults.map((result) => {
                      return (
                        <ListItem key={result.id} _hover={{
                          background: "white",
                          fontSize: "15px",
                        }}>{result.adresse} </ListItem>
                      )
                    }
                    )
                  )
                  }
                </List>
                }
              </FormControl>
              {userProfil !== "Sender" && (<FormControl isRequired>
                <FormLabel my="1" htmlFor="companySirenNumber">Company Siren Number</FormLabel>
                <Input
                  type="text"
                  m="1"
                  placeholder="Siren number"
                  onChange={(event) => setCompanySiren(event.target.value)} value={companySiren} />
              </FormControl>)
              }
              <FormControl isRequired>
                <FormLabel my="1" htmlFor="addressInfo">Address info</FormLabel>
                <Input
                  type="text"
                  m="1"
                  placeholder="Floor, code ..."
                  onChange={(event) => setAddressInfo(event.target.value)} value={addressInfo} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel my="1" htmlFor="Telephone">Telephone</FormLabel>
                <Input
                  type="tel"
                  m="1"
                  placeholder="Your phone number"
                  onChange={(event) => setTel(event.target.value)} value={tel} />
              </FormControl>
              <HStack align="end" justify="center">
                <FormControl isRequired>
                  <FormLabel my="1" htmlFor="mail">Mail</FormLabel>
                  <Input
                    px="2"
                    type="mail"
                    placeholder="bob@mail.com"
                    onChange={(event) => setMail(event.target.value)}
                    value={mail}
                  />
                </FormControl>
                <Button
                  type="submit"
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
          </Box>
        </VStack>
      )
      }
      <VStack spacing="0" borderRadius="lg" borderColor="dark" bg="red.400" w="600px" color="white" mt="2">
      </VStack>
    </Flex >
  )
}

export default CreateUser