import { Heading } from '@chakra-ui/react'
import { useRouter } from 'next/router'

interface Props {
  title?: string
}

export const Header: React.FC<Props> = ({ title = 'Campaigns' }) => {
  const router = useRouter()
  return (
    <Heading cursor='pointer' onClick={() => router.push('/')} textAlign='center' mb='7'>
      {title}
    </Heading>
  )
}
