import SocialLink from '@/components/Home/LinkBlock';
import ArticeList from '@/components/Home/ArticleList';
import FormattedDate from '@/components/Common/FormattedDate'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Home from '@/components/Home/Home'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { getAllPosts, getPostBlocks } from '@/lib/notion'
import NotionRenderer from '@/components/Post/NotionRenderer'
import PropTypes from 'prop-types'
import Layout from '@/layouts/Glayouts';
import BLOG from '@/blog.config';
import Link from 'next/link'
import { ArrowRight, Newspaper, FolderGit2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button"
import Image from 'next/image';

export async function getStaticProps() {
  const posts = await getAllPosts({ onlyPost: true })
  const project = await getAllPosts({ onlyProject: true })

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
  const projectToShow = project.slice(0, BLOG.postsPerPage)
  return {
    props: {
      page: 1, // current page is 1
      postsToShow,
      projectToShow,
      blockMap,
      posts,
      project // Add posts data to props
    },
    revalidate: 1
  }
}

const IndexPage = ({ postsToShow, blockMap, posts, project, projectToShow }) => {

  return (
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
            <div className='my-auto font-semibold text-lg flex gap-2 '>
              <Newspaper width={20} height={20} className="my-auto" />
              <p className="my-auto font-semibold text-lg">Posts</p>
            </div>

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
          <br />
          <div className="flex justify-between my-auto">
            <div className='my-auto font-semibold text-lg flex gap-2 '>
              <FolderGit2 width={20} height={20} className="my-auto" />
              <p className="my-auto font-semibold text-lg">Project</p>
            </div>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/project"
                    className={buttonVariants({ variant: "ghost" })}
                    aria-label="All projects"
                  >
                    All project
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View all project</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">

            {projectToShow?.map((project) => (
              <Dialog key={project.id}>
                <DialogTrigger asChild>
                  <div className='cursor-pointer space-y-4 rounded-lg p-4 hover:bg-muted hover:shadow-2xl transition-all duration-300'>
                    <p className="">{project.title}</p>
                    <p className="text-sm text-black dark:text-transparent bg-clip-text bg-gradient-to-br dark:from-muted-foreground from-40% dark:to-muted">
                      {project.summary}
                    </p>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <br />
                    <Image
                      alt="Profile picture"
                      className="object-cover w-full rounded-lg"
                      src={project?.page_cover}
                      style={{
                        width: "370px",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                    <br />
                    <DialogTitle><h3>{project.title}</h3></DialogTitle>
                    {project.tags && (
                      <div className='flex flex-nowrap gap-2 max-w-full overflow-x-auto article-tags'>
                        {project.tags.map((tag) => (
                          <div key={tag} className='inline-flex  items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/8'>
                            <p>{tag}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    <DialogDescription>
                      <FormattedDate date={project.date} />
                      <br /><br />
                      {project.summary}
                    </DialogDescription>
                  </DialogHeader>

                  <DialogFooter>
                    <Button className="w-full transition-all duration-200" size="sm">
                      <Link target="_blank" href={project.project_url}>
                        Code
                      </Link>
                    </Button>
                    {project.live_demo && (
                      <Button
                        className="w-full transition-all duration-200"
                        size="sm"
                        variant="outline"
                      >
                        <Link target="_blank" href={project.live_demo}>
                          Live Demo
                        </Link>
                      </Button>
                    )}
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            ))}
          </div>

          {BLOG.showButton && (
            <SocialLink />
          )}
        </div>
      </main>
    </Layout>
  );
};

export default IndexPage;

IndexPage.propTypes = {
  blockMap: PropTypes.object.isRequired,
}