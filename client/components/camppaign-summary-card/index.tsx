import { Badge, Box, Skeleton, Text } from '@chakra-ui/react'

interface Props {
  header: string
  meta: string
  description: string
  loading: boolean
}

export const SummaryCard: React.FC<Props> = ({ description, header, meta, loading }) => {
  return (
    <Box width='100%' borderWidth='1px' p='4' borderRadius='lg' cursor='pointer' overflow='hidden'>
      <Skeleton isLoaded={!loading}>
        <Badge>
          <Text fontWeight='semibold' fontSize='sm' lineHeight='tight'>
            {header}
          </Text>
        </Badge>
      </Skeleton>
      <Text fontWeight='normal' fontSize='lg' color='gray.500' lineHeight='tight'>
        {meta}
      </Text>
      <Text mt='1' fontWeight='normal' color='gray.700' fontSize='md' lineHeight='tight'>
        {description}
      </Text>
    </Box>
  )
}
