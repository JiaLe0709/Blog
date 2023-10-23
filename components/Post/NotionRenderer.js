import BLOG from '@/blog.config'
import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { NotionRenderer as Renderer } from 'react-notion-x'

// Lazy-load some heavy components & override the renderers of some block types
const components = {
  // Code block
  Code: dynamic(() =>
    import('react-notion-x/build/third-party/code').then(async (m) => {
      return m.Code
    }), { ssr: false }
  )
  ,
  // Database block
  Collection: dynamic(() => {
    return import('react-notion-x/build/third-party/collection').then(module => module.Collection)
  }),
  // Equation block & inline variant
  Equation: dynamic(() => {
    return import('react-notion-x/build/third-party/equation').then(module => module.Equation)
  })
}

const PrismMac = dynamic(() => import('@/components/PrismMac'), {
  ssr: false
})

/**
 * Notion page renderer
 *
 * A wrapper of react-notion-x/NotionRenderer with predefined `components` and `mapPageUrl`
 *
 * @param props - Anything that react-notion-x/NotionRenderer supports
 */
export default function NotionRenderer (props) {
  const mapPageUrl = (id) => {
    // console.log('mapPageUrl', BLOG.lang.split('-')[0])
    
      return '/' + locale + '/s/' + id.replace(/-/g, '')
    }
 
  return (
    <div>
      <Renderer
      components={components}
      mapPageUrl={mapPageUrl}
      recordMap={props.blockMap}
      {...props}
    />
    </div>
  )
 }

NotionRenderer.propTypes = {
  frontMatter: PropTypes.object.isRequired,
  blockMap: PropTypes.object.isRequired
}
