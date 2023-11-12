import Layout from '@/layouts/Glayouts'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import FormattedDate from '@/components/Common/FormattedDate'
import { FolderGit2 } from "lucide-react";
import Link from 'next/link'
import { getAllPosts } from '@/lib/notion'
import BLOG from '@/blog.config'
import { Button } from "@/components/ui/button"

export async function getStaticProps() {
  const posts = await getAllPosts({ onlyProject: true })

  const postsToShow = posts.slice(0, BLOG.postsPerPage)
  return {
    props: {
      page: 1, // current page is 1
      postsToShow,
      posts, // Add posts data to props
    },
    revalidate: 1
  }
}

const Project = ({ post, postsToShow }) => {
  //console.log(postsToShow)
  return (
    <>
      <Layout title={'Project'}>
        <main>
          <div className='mx-auto max-w-2xl space-y-8 my-10'>
            <div className='my-auto font-semibold text-lg flex gap-2 '>
                <FolderGit2 width={20} height={20} className="my-auto" />
                <p className="my-auto font-semibold text-lg">Project</p>
              </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">

              {postsToShow?.map((post) => (
                <Dialog key={post.id}>
                  <DialogTrigger asChild>
                    <div className='cursor-pointer space-y-4 rounded-lg p-4 hover:bg-muted hover:shadow-2xl transition-all duration-300'>
                      <p className="">{post.title}</p>
                      <p className="text-sm text-black dark:text-transparent bg-clip-text bg-gradient-to-br dark:from-muted-foreground from-40% dark:to-muted">
                        {post.summary}
                      </p>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <br />
                      <img
                        alt="Profile picture"
                        className="object-cover w-full rounded-lg"
                        src={post?.page_cover}
                        style={{
                          width: "370px",
                          height: "200px",
                          objectFit: "cover",
                        }}
                      />
                      <br />
                      <DialogTitle><h3>{post.title}</h3></DialogTitle>
                      <DialogDescription>
                        <FormattedDate date={post.date} />
                        <br /><br />
                        {post.summary}
                      </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                      <Button className="w-full transition-all duration-200" size="sm">
                        <Link target="_blank" href={post.project_url}>
                          Code
                        </Link>
                      </Button>
                      {post.live_demo && (
                        <Button
                          className="w-full transition-all duration-200"
                          size="sm"
                          variant="outline"
                        >
                          <Link target="_blank" href={post.live_demo}>
                            Live Demo
                          </Link>
                        </Button>
                      )}
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              ))}
            </div>


          </div>
        </main>




      </Layout>
    </>
  )
}

export default Project;