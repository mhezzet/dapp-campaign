import {
  Container,
  Flex,
  SimpleGrid,
  Spacer,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Web3 from 'web3'
import { SummaryCard } from '../../components/camppaign-summary-card'
import { CampaignContribute } from '../../components/contribute-campaign'
import { CreateRequest } from '../../components/create-request'
import { Header } from '../../components/header'
import { Meta } from '../../components/meta'
import { Request } from '../../components/request'
import { getCampaignSummary } from '../../services/get-campaign-summary'

interface Props {}

const Campaign: React.FC<Props> = () => {
  const router = useRouter()
  const { address } = router.query

  const { data, isValidating } = useSWR(
    address && typeof address === 'string' ? ['campaign', address] : null,
    getCampaignSummary
  )

  return (
    <Container maxW='container.xl'>
      <Meta title={`Campaign ${address ?? ''}`} />
      <Header />

      <Flex mb={5} alignItems='center' gap={5} flexWrap='wrap'>
        <Text fontWeight='semibold' fontSize='md' lineHeight='tight' isTruncated>
          Campaign{' '}
          <Text display='inline' fontSize='md' fontWeight='bold'>
            {address}
          </Text>
        </Text>

        <Spacer />

        {address && typeof address === 'string' && data && (
          <CampaignContribute
            minimumContribution={data.minimumContribution}
            camapignAddress={address}
          />
        )}
      </Flex>

      <SimpleGrid minChildWidth='310px' spacing='10px'>
        <SummaryCard
          loading={isValidating}
          header={data?.manager ?? ''}
          meta='Address of Manager'
          description='the manager created this campaign and can create requests to withdraw money'
        />
        <SummaryCard
          loading={isValidating}
          header={data?.minimumContribution ?? ''}
          meta='Minimum Contribution (Wei)'
          description='You must contribute at least this much wei to become an approver'
        />
        <SummaryCard
          loading={isValidating}
          header={data?.requestsCount ?? ''}
          meta='Number of Requests'
          description='A request tries to withdraw money from the contract. Requests must be approved by approvers'
        />
        <SummaryCard
          loading={isValidating}
          header={data?.approversCount ?? ''}
          meta='Number of Approvers'
          description='Numer of people who have already donated to this campaign'
        />
        <SummaryCard
          loading={isValidating}
          header={Web3.utils.fromWei(data?.balance ?? '', 'ether')}
          meta='Campaign Balance (ether)'
          description='The balance is how much money this campaign has left to spend'
        />
      </SimpleGrid>

      <Flex mt={10} alignItems='center' gap={5} flexWrap='wrap'>
        <Text fontWeight='semibold' fontSize='md' lineHeight='tight' isTruncated>
          Requests
        </Text>

        <Spacer />

        {address && typeof address === 'string' && data && (
          <CreateRequest camapignAddress={address} />
        )}
      </Flex>

      <Table variant='simple' p='4' size='sm' my={3}>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Description</Th>
            <Th isNumeric>Amount (Wei)</Th>
            <Th>Recipient</Th>
            <Th isNumeric>Approval Count</Th>
            <Th>Approve</Th>
            <Th>Finalize</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.requestsCount &&
            address &&
            typeof address === 'string' &&
            Array.from({ length: parseInt(data.requestsCount) }).map((_, idx) => (
              <Request
                key={idx}
                requestId={idx}
                campaignAddress={address}
                approversCount={data.approversCount}
              />
            ))}
        </Tbody>
      </Table>
    </Container>
  )
}

export default Campaign
