import SocialLink from '@/components/Home/LinkBlock';
import ArticeList from '@/components/Home/ArticleList'
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

  const postsToShow = posts.slice(0, 5)
  return {
    props: {
      postsToShow,
      blockMap
    }
  }
}

const IndexPage = ({postsToShow, blockMap}) => {
  
  return (
    <>
      <Layout title='Home'>
        <main>
          <div className='mx-auto max-w-2xl space-y-8 my-10'>
            <div className='my-auto font-semibold text-lg'>
              <NotionRenderer
            className='md:ml-0'
            blockMap={blockMap}
            frontMatter={{}}
            subPageTitle={null}
          />
            </div>
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
          {postsToShow.map((post) => (
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