import Layout from '@/layouts/Glayouts'
import { getAllPosts, getPostBlocks } from '@/lib/notion'
import Article from '@/components/Home/articleBlock'

export async function getStaticProps() {
  const posts = await getAllPosts({ onlyPost: true })

  const heros = await getAllPosts({ onlyHidden: true })
  const hero = heros.find((t) => t.slug === 'index')

  let blockMap
  try {
    blockMap = await getPostBlocks(hero.id)
  } catch (err) {
    console.error(err)
    return { props: { post: null, blockMap: null } }
  }

  return {
    props: {
      page: 1, // current page is 1
      blockMap,
      posts, // Add posts data to props
    },
    revalidate: 1
  }
}

const Posts = ({ posts }) => {
    return (
        <>
        <Layout title='Posts'>
        <main>
      <div className="mx-auto max-w-2xl space-y-8 my-10">
            {posts && posts.map((post) => (
                <Article key={post.id} post={post} />
            ))}
            </div>
            </main>
        </Layout>
        </>
    )
}

export default Posts;