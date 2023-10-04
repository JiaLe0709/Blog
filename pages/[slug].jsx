import Layout from '@/layouts/postLayout'
import { getAllPosts, getPostBlocks } from '@/lib/notion'
// import BLOG from '@/blog.config'
import { useRouter } from 'next/router'
import { NotFoundError } from 'next/error'

const Post = ({ post, blockMap }) => {
  const router = useRouter()
  if (router.isFallback) {
    return (
      <p>Loading</p>
    )
  }
  if (!post) {
    throw new NotFoundError();
  }
  return (
    <Layout blockMap={blockMap} frontMatter={post} />
  )
}

export async function getServerSideProps({ params: { slug }, req, res  }) {
  const posts = await getAllPosts({ onlyNewsletter: false });
  const post = posts.find((t) => t.slug === slug);

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=86400, stale-while-revalidate=59'
  )

  try {
    const blockMap = await getPostBlocks(post.id);
    return {
      props: {
        post,
        blockMap,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      notFound: true,
    };
  }
}

export default Post