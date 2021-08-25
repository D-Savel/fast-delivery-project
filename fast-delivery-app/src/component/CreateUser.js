/* eslint-disable no-useless-escape */
import { useContext, useState, useEffect } from 'react'
import {
  Input,
  List,
  ListItem,
  Flex,
  FormControl,
  FormLabel,
  Box,
  Center,
  Button,
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
  const [addressX, setaddressX] = useState('')
  const [addressY, setaddressY] = useState('')
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
          setaddressX(response.data[0].x.toString())
          setaddressY(response.data[0].y.toString())
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

  const handleClickRegister = async (e) => {
    e.preventDefault()
    if (firstName && lastName && addressX && addressY && tel && mail && isAdress) {
      try {
        setIsLoading(true)
        let tx
        userProfil === "Sender" ?
          tx = await fastDeliveryUser.parcelSenderRegister(firstName, lastName, addressX, addressY, addressInfo, tel, mail) :
          tx = await fastDeliveryUser.deliverymanRegister(firstName, lastName, addressX, addressY, companySiren, addressInfo, tel, mail)
        console.log(tx)
        await tx.wait()
        toast({
          title: 'Confirmed transaction',
          description: `You have been registered \nTransaction hash: ${tx.hash}`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
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
    } else {
      toast({
        title: "Error : Please enter a value for empty fields and select address",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }
  }
  return (

    <Flex direction="column" align="center" justify="center" pb="8" m="1">
      <Center borderColor="dark" w="420px" color="blue" p="1">
        <Heading size="xl">Fast Delivery register</Heading>
      </Center>
      <Box m="2" border="1px" borderRadius="lg" w="sm" bg="blue.500" borderColor="blue.300">
        <Box m="2" as="form">
          <FormControl isRequired>
            <FormLabel my="0" htmlFor="userProfil">User Profil</FormLabel>
            <Select
              size="sm"
              borderRadius="lg"
              bg="light"
              onChange={(event) => setUserProfil(event.target.value)}
              value={userProfil} placeholder="Select a Profil">
              <option value="Sender">Sender</option>
              <option value="Deliveryman">Deliveryman</option>
            </Select>
          </FormControl>
        </Box>
      </Box>
      {userProfil && (
        <VStack >
          <Box border="1px" borderRadius="lg" w="sm" bg="blue.500" borderColor="blue.300">
            <Box m="2" as="form">
              <FormControl isRequired>
                <FormLabel my="0" htmlFor="firstName">{userProfil === "Sender" ? 'First name' : 'Manager first name'}</FormLabel>
                <Input
                  size="sm"
                  borderRadius="lg"
                  bg="light"
                  type="text"
                  placeholder="First name"
                  onChange={(event) => setFirstName(event.target.value)}
                  value={firstName}
                  isInvalid={firstName === "" ? true : false} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel pt="1" my="0" htmlFor="lastName">{userProfil === "Sender" ? 'Last name' : 'Manager last name'}</FormLabel>
                <Input
                  size="sm"
                  borderRadius="lg"
                  bg="light"
                  type="text"
                  placeholder="Last name"
                  onChange={(event) => setLastName(event.target.value)}
                  value={lastName}
                  isInvalid={lastName === "" ? true : false} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel pt="1" my="0" htmlFor="address">{userProfil === "Sender" ? 'Address' : 'Company address'}</FormLabel>
                <Input
                  size="sm"
                  borderRadius="lg"
                  bg="light"
                  type="text"
                  list="suggestionList"
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="An address in Paris"
                  value={userAddress.toLowerCase()}
                  isInvalid={userAddress === "" || !isAdress ? true : false} />
                {
                  userAddress && !isAdress && <List as="ul" fontSize="12px" onClick={handleClickResult} p="2" spacing="1" bg="gray.200" border="1px" borderColor="gray.300" borderRadius="md">
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
                <FormLabel pt="0" my="1" htmlFor="companySirenNumber">Company Siren Number</FormLabel>
                <Input
                  size="sm"
                  borderRadius="lg"
                  bg="light"
                  type="text"
                  placeholder="Siren number"
                  onChange={(event) => setCompanySiren(event.target.value)}
                  value={companySiren}
                  isInvalid={companySiren === "" ? true : false} />
              </FormControl>)
              }
              <FormControl >
                <FormLabel pt="1" my="0" htmlFor="info">Info (floor, code, door)</FormLabel>
                <Input
                  id="info"
                  size="sm"
                  borderRadius="lg"
                  bg="light"
                  type="text"
                  placeholder="Floor, code ..."
                  autocomplete="off"
                  onChange={(event) => setAddressInfo(event.target.value)}
                  value={addressInfo} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel pt="1" my="0" htmlFor="tel">Telephone</FormLabel>
                <Input
                  id="tel"
                  type="tel"
                  size="sm"
                  borderRadius="lg"
                  bg="light"
                  placeholder="Your phone number"
                  onChange={(event) => setTel(event.target.value)}
                  value={tel}
                  isInvalid={tel === "" ? true : false} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel pt="1" my="0" htmlFor="email">Mail</FormLabel>
                <Input
                  type="email"
                  id="email"
                  size="sm"
                  borderRadius="lg"
                  bg="light"
                  placeholder="bob@mail.com"
                  onChange={(event) => setMail(event.target.value)}
                  value={mail}
                  isInvalid={mail === "" ? true : false}
                />
              </FormControl>
            </Box>
          </Box>
          <Box py="2">
            <Button
              size="md"
              borderRadius="lg"
              type="submit"
              isLoading={isLoading}
              loadingText="Register"
              colorScheme="blue"
              onClick={handleClickRegister} >
              Register
            </Button>
          </Box>
        </VStack>
      )
      }
    </Flex>
  )
}

export default CreateUser