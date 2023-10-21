import { useEffect, useState } from 'react'
import { getPageTitle } from 'notion-utils'
import Comments from '@/components/Post/Comments'
import Head from 'next/head'
import Content from '@/components/Post/Content'
import BLOG from '@/blog.config'

const Layout = ({ blockMap, frontMatter, fullWidth = true, subPage = false }) => {
  const [showSubPageTitle, setShowSubPageTitle] = useState(false)

  const pageTitle = getPageTitle(blockMap)
  useEffect(() => {
    if (frontMatter.title !== pageTitle) {
      setShowSubPageTitle(true)
    }
  }, [frontMatter, pageTitle, subPage])

  const ogImage = `https://${BLOG.ogImageGenerateHost}/api/default?logo=${BLOG.link
    }/favicon.png&siteName=${encodeURIComponent(
      BLOG.title?.trim()
    )}&description=${encodeURIComponent(
      BLOG.bio?.trim()
    )}&title=${encodeURIComponent(
      frontMatter.title?.trim()
    )}&summary=${encodeURIComponent(
      frontMatter.summary?.trim()
    )}
    &theme=light&border=solid
    `
    
  return (
    <>
      <Head>
        <meta
          property='og:image'
          content={ogImage || BLOG.defaultCover}
        />
        <meta name="description" content={frontMatter.summary} />
        <title>{`${frontMatter.title}${frontMatter.title === pageTitle ? '' : ' | ' + pageTitle}`}</title>
      </Head>
      <main className={`m-auto flex-grow w-full transition-all ${!fullWidth ? 'max-w-2xl px-4' : 'px-4 md:px-24'
        }`}>
        <Content
          frontMatter={frontMatter}
          blockMap={blockMap}
          pageTitle={showSubPageTitle ? pageTitle : null}
        />
        <div className={`max-w-2xl mx-auto space-y-2 `}>
          <Comments frontMatter={frontMatter} />
        </div>
      </main>
    </>

  )
}

export default Layout;