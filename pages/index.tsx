import { Inter } from '@next/font/google'
import { Button } from 'antd-mobile'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { useGlobal } from '@/src/store/global/hooks'

const inter = Inter({ subsets: ['latin'] })
const Home: NextPage = () => {
  const { t } = useTranslation()
  const global = useGlobal()

  useEffect(() => {
    console.log(global.locale)
    console.log(global.version)
    console.log(process.env.NODE_ENV)
    console.log(process.env.BASE_LNG)
  })

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 w-full px-20 text-center">
        <h1 className={`text-6xl font-bold ${inter.className}`}>
          Welcome to{' '}
          <a className="text-blue-600" href="https://nextjs.org">
            Next.js!
          </a>
        </h1>

        <Button
          className="top-8"
          color="primary"
          size="large"
          onClick={() => {
            window.location.replace('/demo')
          }}
        >
          {t('demo')}
        </Button>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer>
    </div>
  )
}

export default Home
