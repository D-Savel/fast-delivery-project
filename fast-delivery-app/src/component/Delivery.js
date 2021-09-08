import {
  Popover,
  PopoverTrigger,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  Text
} from '@chakra-ui/react'

const Delivery = (delivery) => {

  return (
    <>
      <Text borderBottom="1px" borderRight="1px" px="2">{delivery.id}</Text>
      <Popover trigger="hover" >
        <PopoverTrigger >
          <Text borderBottom="1px" borderRight="1px" px="2">{delivery.senderFirstName} {delivery.senderLastNameSender}</Text>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverBody>{delivery.senderFirstName}</PopoverBody>
          <PopoverBody>{delivery.senderLastName}</PopoverBody>
          <PopoverBody>{delivery.senderAddress}</PopoverBody>
          <PopoverBody>{delivery.senderInfo}</PopoverBody>
          <PopoverBody>{delivery.senderTel}</PopoverBody>
          <PopoverBody>{delivery.senderMail}</PopoverBody>
        </PopoverContent>
      </Popover>
      <Popover trigger="hover" >
        <PopoverTrigger>
          <Text borderBottom="1px" borderRight="1px" px="2">{delivery.firstNameRecipient} {delivery.lastNameRecipient}</Text>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Info :</PopoverHeader>
          <PopoverBody>{delivery.recipientFirstNameRecipient} {delivery.recipientLastName}</PopoverBody>
          <PopoverBody>{delivery.recipientAddress}</PopoverBody>
          <PopoverBody>{delivery.recipientInfo}</PopoverBody>
          <PopoverBody>{delivery.recipientTel}</PopoverBody>
          <PopoverBody>{delivery.recipientMail}</PopoverBody>
        </PopoverContent>
      </Popover>
      <Text borderBottom="1px" borderRight="1px" px="2">{delivery.recipientAddress}</Text>
      <Popover trigger="hover" >
        <PopoverTrigger >
          <Text borderBottom="1px" borderRight="1px" px="2">{delivery.deliverymanNameCompany}</Text>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Info :</PopoverHeader>
          <PopoverBody>{delivery.deliverymanNameCompany}</PopoverBody>
          <PopoverBody>M. {delivery.deliveymanName}</PopoverBody>
          <PopoverBody>{delivery.deliverymanAddress}</PopoverBody>
          <PopoverBody>{delivery.deliverymanInfo}</PopoverBody>
          <PopoverBody>{delivery.deliverymanTel}</PopoverBody>
          <PopoverBody>{delivery.deliverymanMail}</PopoverBody>
        </PopoverContent>
      </Popover>
      <Text borderBottom="1px" borderRight="1px" px="2">{delivery.deliveryDistance}</Text>
      <Text borderBottom="1px" borderRight="1px" px="2">{delivery.price}</Text>
      <Text borderBottom="1px" borderRight="1px" px="2">{delivery.deliveryStatus}</Text>
    </>
  )
}

export default Delivery