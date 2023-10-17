import '@/styles/globals.css'
import 'react-notion-x/src/styles.css'
import 'katex/dist/katex.min.css'
import '@/styles/prism.css'
import 'prismjs/themes/prism-tomorrow.css'
// import '@/styles/animated.css'
import '@/styles/nprogress.css'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { ThemeProvider } from 'next-themes'
import { Inter } from "next/font/google"
import NProgress from 'nprogress'

import Footer from '@/components/Footer/Footer'
import StarrySky from '@/components/Theme/StarrySky'
import BLOG from '@/blog.config'

const inter = Inter({ subsets: ['latin'] })

function App({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleStart = (url) => {
      NProgress.start()
    }
    const handleStop = () => {
      NProgress.done()
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])

  /*
  Router.events.on('routeChangeStart', () => NProgress.start());
  Router.events.on('routeChangeComplete', () => NProgress.done());
  Router.events.on('routeChangeError', () => NProgress.done());
  */
  NProgress.configure({ showSpinner: false })


  return (
    <>
      <ThemeProvider attribute="class" enableSystem>
        {BLOG.starrySky && (<StarrySky />)}
          <Component {...pageProps} />       
      </ThemeProvider>
      <style jsx global>
                {`
        html {
          font-family: ${inter.style.fontFamily} !important;
        }
        .wl-power, .wl-addr {
          display: none !important;
      }
      `}
      </style>
    </>
  )
}

export default App;