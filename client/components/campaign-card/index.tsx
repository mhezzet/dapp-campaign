import { Box, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { memo } from 'react'

interface Props {
  address: string
}

export const CampaignCard: React.FC<Props> = memo(({ address }) => {
  const router = useRouter()

  return (
    <Box
      onClick={() => router.push(`/campaign/${address}`)}
      width='100%'
      borderWidth='1px'
      p='6'
      borderRadius='lg'
      cursor='pointer'
      overflow='hidden'
      transitionProperty='shadow'
      transitionDuration='1'
      transitionTimingFunction='ease-in-out'
      shadow='sm'
      _hover={{ shadow: 'md' }}
    >
      <Text mt='1' fontWeight='semibold' as='h4' lineHeight='tight' isTruncated>
        {address}
      </Text>
    </Box>
  )
})

CampaignCard.displayName = 'CampaignCard'
