import SocialLink from '@/components/Home/LinkBlock';
import ArticeList from '@/components/Home/ArticleList'
import Home from '@/components/Home/Home'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { getAllPosts, getPostBlocks } from '@/lib/notion'
import NotionRenderer from '@/components/Post/NotionRenderer'
import PropTypes from 'prop-types'
import Layout from '@/layouts/Glayouts';
import BLOG from '@/blog.config';
import Link from 'next/link'
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

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

  const postsToShow = posts.slice(0, BLOG.postsPerPage)
  return {
    props: {
      page: 1, // current page is 1
      postsToShow,
      blockMap,
      posts, // Add posts data to props
    },
    revalidate: 1
  }
}



const IndexPage = ({ postsToShow, blockMap, posts }) => {

  return (
    <>
      <Layout title={BLOG.title} needContainer={true}>
        <main>
          <div className='mx-auto max-w-2xl space-y-8 my-10'>

            {BLOG.homePageUseNotion ? (
              <div className='font-semibold text-lg space-y-4'>
                <NotionRenderer
                  className='md:ml-0'
                  blockMap={blockMap}
                  frontMatter={{}}
                  subPageTitle={null}
                />
              </div>
            ) : (
              <Home />
            )}

            <div className="flex justify-between my-auto">
              <p className="my-auto font-semibold text-lg">Posts</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href="/posts"
                      className={buttonVariants({ variant: "ghost" })}
                      aria-label="All articles"
                    >
                      All posts
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View all posts</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            {postsToShow?.map((post) => (
              <ArticeList key={post.id} post={post} />
            ))}
            {BLOG.showButton && (
              <SocialLink />
            )}
          </div>
        </main>
      </Layout>
    </>
  );
};

export default IndexPage;

IndexPage.propTypes = {
  blockMap: PropTypes.object.isRequired,
}