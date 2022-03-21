import { Container, SimpleGrid } from '@chakra-ui/react'
import type { NextPage } from 'next'
import useSWR from 'swr'
import { AddCampaign } from '../components/add-campaign'
import { CampaignCard } from '../components/campaign-card'
import { Header } from '../components/header'
import { Meta } from '../components/meta'
import { getCampaigns } from '../services/get-campaigns'

const Home: NextPage = () => {
  const { data: campaigns, error, isValidating } = useSWR('campaigns', getCampaigns)

  return (
    <Container maxW='container.xl'>
      <Header />
      <Meta />

      {!error && <AddCampaign />}

      <SimpleGrid minChildWidth='350px' spacing='40px'>
        {campaigns?.map(campaign => (
          <CampaignCard key={campaign} address={campaign} />
        ))}
      </SimpleGrid>
    </Container>
  )
}

export default Home
