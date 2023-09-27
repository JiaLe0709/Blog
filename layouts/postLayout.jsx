import { useEffect, useState } from 'react'
import { getPageTitle } from 'notion-utils'
import Comments from '@/components/Post/Comments'
import Head from 'next/head'
import BLOG from '@/blog.config'
import Content from '@/components/Post/Content'

const Layout = ({ blockMap, frontMatter, fullWidth = false, subPage = false }) => {
  const [showSubPageTitle, setShowSubPageTitle] = useState(false)

  const pageTitle = getPageTitle(blockMap)
  useEffect(() => {
    if (frontMatter.title !== pageTitle) {
      setShowSubPageTitle(true)
    }
  }, [frontMatter, pageTitle, subPage])

  return (
    <>
    <Head>
      <title>{`${frontMatter.title}${frontMatter.title === pageTitle ? '' : ' | ' + pageTitle} | ${BLOG.author}`}</title>
    </Head>
    <div>
        <Content
          frontMatter={frontMatter}
          blockMap={blockMap}
          pageTitle={showSubPageTitle ? pageTitle : null}
        />
        <div className={`max-w-2xl mx-auto space-y-2 `}>
          <Comments frontMatter={frontMatter} />
        </div>
      </div>
    </>
    
  )
}

export default Layout;