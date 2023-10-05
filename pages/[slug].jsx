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

export async function getStaticPaths() {
  const posts = await getAllPosts({ onlyNewsletter: false })
  return {
    paths: posts.map((row) => `${BLOG.path}/${row.slug}`),
    fallback: true
  }
}

export async function getStaticProps({ params: { slug } }) {
  const posts = await getAllPosts({ onlyNewsletter: false });
  const post = posts.find((t) => t.slug === slug);

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