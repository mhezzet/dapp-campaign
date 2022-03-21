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
  Text,
  useToast
} from '@chakra-ui/react'
import { useCallback, useState } from 'react'
import { useSWRConfig } from 'swr'
import { contributeToCampaign } from '../../services/contribute-campaign'

interface Props {
  camapignAddress: string
  minimumContribution: string
}

export const CampaignContribute: React.FC<Props> = ({ minimumContribution, camapignAddress }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [contribution, setContribution] = useState((parseInt(minimumContribution) + 1).toString())
  const { mutate } = useSWRConfig()
  const toast = useToast()

  const onClose = useCallback(() => {
    setContribution((parseInt(minimumContribution) + 1).toString())
    setIsOpen(false)
  }, [minimumContribution])

  const onContribute = useCallback(async () => {
    setIsLoading(true)
    onClose()

    try {
      await contributeToCampaign(contribution, camapignAddress)

      mutate(['campaign', camapignAddress])

      toast({
        title: 'contributed to the campaign.',
        status: 'success',
        duration: 9000,
        isClosable: true
      })
    } catch (error: any) {
      toast({
        title: 'failed contributing to the campaign',
        description: error.message,
        status: 'error',
        isClosable: true
      })
    } finally {
      setIsLoading(false)
    }
  }, [camapignAddress, contribution, mutate, onClose, toast])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Contributed to the Campaign</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel htmlFor='amount'>Amount (in Wei)</FormLabel>
              <NumberInput
                value={contribution}
                onChange={setContribution}
                min={parseInt(minimumContribution) + 1}
              >
                <NumberInputField id='amount' />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onContribute} colorScheme='blue' mr={3}>
              Contribute
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Button
        isLoading={isLoading}
        loadingText='contributing to the campaign...'
        onClick={() => setIsOpen(true)}
        leftIcon={<AddIcon />}
      >
        <Text isTruncated>Contribute to the Campaing</Text>
      </Button>
    </>
  )
}
