import { AddIcon } from '@chakra-ui/icons'
import {
  Button,
  FormControl,
  FormLabel,
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
  useToast
} from '@chakra-ui/react'
import { useCallback, useState } from 'react'
import { useSWRConfig } from 'swr'
import { createCampaign } from '../../services/create-campaign'

interface Props {}

export const AddCampaign: React.FC<Props> = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [contribution, setContribution] = useState('0')
  const { mutate } = useSWRConfig()
  const toast = useToast()

  const onClose = useCallback(() => {
    setContribution('0')
    setIsOpen(false)
  }, [])

  const onCreate = useCallback(async () => {
    setIsLoading(true)
    onClose()

    try {
      await createCampaign(contribution)

      mutate('campaigns')

      toast({
        title: 'Campaign created.',
        status: 'success',
        duration: 9000,
        isClosable: true
      })
    } catch (error: any) {
      toast({
        title: 'failed creating campaign',
        description: error.message,
        status: 'error',
        isClosable: true
      })
    } finally {
      setIsLoading(false)
    }
  }, [contribution, mutate, onClose, toast])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a Campaign</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel htmlFor='amount'>Minmum Contribution (in Wei)</FormLabel>
              <NumberInput value={contribution} onChange={setContribution} defaultValue={0} min={0}>
                <NumberInputField id='amount' />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
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
        loadingText='creating campaign...'
        mb='5'
        onClick={() => setIsOpen(true)}
        leftIcon={<AddIcon />}
      >
        Create Campaign
      </Button>
    </>
  )
}
