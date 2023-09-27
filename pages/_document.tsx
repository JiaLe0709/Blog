import { Html, Head, Main, NextScript } from 'next/document'
import BLOG from '@/blog.config'

export default function Document() {
  return (
    <Html lang="en" >
      <Head>
      <link rel='icon' href={BLOG.icon} />
      <meta name='theme-color' content='#0C0A09'/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
