import BLOG from '@/blog.config'
import dynamic from 'next/dynamic'

const GiscusComponent = dynamic(
  () => {
    return import('@/components/Post/Giscus')
  },
  { ssr: false }
)

const WalineComponent = dynamic(
  () => {
    return import('@/components/Post/WalineComponent')
  },
  { ssr: false }
)


const Comments = ({ frontMatter }) => {
  return (
    <div>
      {BLOG.comment && BLOG.comment.provider === 'giscus' && (
        <GiscusComponent />
      )}
      {BLOG.comment.provider === 'waline' && BLOG.comment.waline.url && (<div key='Waline'>
                <WalineComponent key={frontMatter}/>
            </div>)}
    </div>
  )
}

export default Comments
