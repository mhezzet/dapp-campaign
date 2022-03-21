import { CheckCircleIcon, CheckIcon, EditIcon } from '@chakra-ui/icons'
import { Button, Skeleton, Td, Tr, useToast } from '@chakra-ui/react'
import { memo, useCallback, useState } from 'react'
import useSWR from 'swr'
import { approveRequest } from '../../services/approve-request'
import { finalizeRequest } from '../../services/finalize-request'
import { getRequest } from '../../services/get-request'

interface Props {
  requestId: number
  campaignAddress: string
  approversCount: string
}

export const Request: React.FC<Props> = memo(({ requestId, campaignAddress, approversCount }) => {
  const { data, isValidating, mutate } = useSWR(['request', campaignAddress, requestId], getRequest)
  const [isApproveLoading, setIsApproveLoading] = useState(false)
  const [isFinalizeLoading, setIsFinalizeLoading] = useState(false)
  const toast = useToast()

  const onApprove = useCallback(async () => {
    setIsApproveLoading(true)
    try {
      await approveRequest(campaignAddress, requestId)

      mutate()

      toast({
        title: 'You approved the request',
        status: 'success',
        duration: 9000,
        isClosable: true
      })
    } catch (error: any) {
      toast({
        title: 'failed approving the request',
        description: error.message,
        status: 'error',
        isClosable: true
      })
    } finally {
      setIsApproveLoading(false)
    }
  }, [campaignAddress, mutate, requestId, toast])

  const onFinalize = useCallback(async () => {
    setIsFinalizeLoading(true)
    try {
      await finalizeRequest(campaignAddress, requestId)

      mutate()

      toast({
        title: 'You finalized the request',
        status: 'success',
        duration: 9000,
        isClosable: true
      })
    } catch (error: any) {
      toast({
        title: 'failed to finalize the request',
        description: error.message,
        status: 'error',
        isClosable: true
      })
    } finally {
      setIsFinalizeLoading(false)
    }
  }, [campaignAddress, mutate, requestId, toast])

  return (
    <Tr>
      <Td>
        <Skeleton isLoaded={!isValidating}>{requestId}</Skeleton>
      </Td>
      <Td>
        <Skeleton isLoaded={!isValidating}>{data?.description}</Skeleton>
      </Td>
      <Td isNumeric>
        <Skeleton isLoaded={!isValidating}>{data?.value}</Skeleton>
      </Td>
      <Td>
        <Skeleton isLoaded={!isValidating}>{data?.recipient}</Skeleton>
      </Td>
      <Td isNumeric>
        <Skeleton isLoaded={!isValidating && !isApproveLoading}>
          {data?.approvalCount}/{approversCount}
        </Skeleton>
      </Td>
      <Td>
        <Skeleton isLoaded={!isValidating}>
          {!data?.complete && (
            <Button
              onClick={onApprove}
              loadingText='approving the request...'
              isLoading={isApproveLoading}
              colorScheme='green'
              size='sm'
              variant='outline'
              leftIcon={<EditIcon />}
            >
              Approve
            </Button>
          )}
        </Skeleton>
      </Td>
      <Td>
        <Skeleton isLoaded={!isValidating}>
          {data?.complete ? (
            <CheckCircleIcon color='green.600' />
          ) : (
            <Button
              onClick={onFinalize}
              loadingText='finalizating the request...'
              isLoading={isFinalizeLoading}
              colorScheme='purple'
              size='sm'
              variant='outline'
              leftIcon={<CheckIcon />}
            >
              Finalize
            </Button>
          )}
        </Skeleton>
      </Td>
    </Tr>
  )
})

Request.displayName = 'Request'
