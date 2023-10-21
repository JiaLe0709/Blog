import { Html, Head, Main, NextScript } from 'next/document'
import BLOG from '@/blog.config'

export default function Document() {
  return (
    <Html lang="en-US" >
      <Head>
        <link rel='icon' href={BLOG.icon} />
        <meta name='theme-color' content='#0C0A09' />
        {BLOG.pwa && (
          <link rel="manifest" href="/manifest.json" />
        )}
        <meta name="robots" content="follow, index" />
        <meta name="keywords" content={BLOG.keywords.join(', ')} />
        {BLOG.SEO_GOOGLE_SITE_VERIFICATION && (
          <meta
            name="google-site-verification"
            content={BLOG.SEO_GOOGLE_SITE_VERIFICATION}
          />)}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
