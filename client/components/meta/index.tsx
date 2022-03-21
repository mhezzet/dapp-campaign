import Head from 'next/head'
import React from 'react'

type Props = {
  title?: string
  description?: string
}

export const Meta: React.FC<Props> = ({
  title = 'Capmaigns',
  description = 'dapp for crowed funding'
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={description} />
      <link rel='icon' href='/favicon.ico' />
    </Head>
  )
}
