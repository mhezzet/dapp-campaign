import { AddIcon } from '@chakra-ui/icons'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  useToast
} from '@chakra-ui/react'
import { useCallback, useState } from 'react'
import { useSWRConfig } from 'swr'
import { createRequest } from '../../services/create-request'

interface Props {
  camapignAddress: string
}

export const CreateRequest: React.FC<Props> = ({ camapignAddress }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { mutate } = useSWRConfig()
  const toast = useToast()

  const [value, setValue] = useState('0')
  const [description, setDescription] = useState('')
  const [toAddress, setToAddress] = useState('')

  const onClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  const onCreate = useCallback(async () => {
    setIsLoading(true)
    onClose()

    try {
      await createRequest(
        {
          description: description,
          value: value,
          toAddress: toAddress
        },
        camapignAddress
      )

      mutate(['campaign', camapignAddress])

      toast({
        title: 'request created',
        status: 'success',
        duration: 9000,
        isClosable: true
      })
    } catch (error: any) {
      toast({
        title: 'failed to create the request',
        description: error.message,
        status: 'error',
        isClosable: true
      })
    } finally {
      setIsLoading(false)
    }
  }, [camapignAddress, description, mutate, onClose, toAddress, toast, value])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Request</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel htmlFor='desc'>Description</FormLabel>
              <Input
                id='desc'
                placeholder='payment request description'
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </FormControl>
            <FormControl mt={2}>
              <FormLabel htmlFor='amount'>Amount (in Wei)</FormLabel>
              <NumberInput value={value} onChange={setValue} min={0}>
                <NumberInputField id='amount' />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl mt={2}>
              <FormLabel htmlFor='address'>Recipient</FormLabel>
              <Input
                id='address'
                placeholder='0x28C24Bd91e4FdA989E2cBfEBf9475e9716e667bc'
                value={toAddress}
                onChange={e => setToAddress(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onCreate} colorScheme='blue' mr={3}>
              Create
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Button
        isLoading={isLoading}
        loadingText='creating the request...'
        onClick={() => setIsOpen(true)}
        leftIcon={<AddIcon />}
      >
        <Text isTruncated>Create Request</Text>
      </Button>
    </>
  )
}
