import Layout from '@/layouts/postLayout'
import { getAllPosts, getPostBlocks } from '@/lib/notion'
import BLOG from '@/blog.config'
import { useRouter } from 'next/router'
import NotFound from '@/components/NotFound'

const Post = ({ post, blockMap }) => {
  const router = useRouter()
  if (router.isFallback) {
    return (
      <p>Loading</p>
    )
  }

  if (!post) {
    return <NotFound statusCode={404} />
  }

  return (
    <Layout blockMap={blockMap} frontMatter={post} />
  )
}

export async function getStaticPaths() {
  const posts = await getAllPosts({ onlyNewsletter: false })
  console.log(posts)
  return {
    paths: posts.map((row) => `${BLOG.path}/${row.slug}`),
    fallback: true
  }
}

export async function getStaticProps({ params: { slug } }) {
  const posts = await getAllPosts({ onlyNewsletter: false });
  const post = posts.find((t) => t.slug === slug);
  console.log(posts)

  if (!post) {
    return {
      notFound: true
    }
  }

  try {
    const blockMap = await getPostBlocks(post.id);
    return {
      props: {
        post,
        blockMap,
      },
      revalidate: 1
    };
  } catch (err) {
    console.error(err);
    return {
      props: {
        post: null,
        blockMap: null,
        notFound: true,
      },
    };
  }
}


export default Post