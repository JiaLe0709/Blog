import BLOG from '@/blog.config'
import PropTypes from 'prop-types'
import Link from 'next/link'
import ThemeSwitcher from '@/components/Theme/ThemeSwitcher'
import FormattedDate from '@/components/Common/FormattedDate'
import NotionRenderer from '@/components/Post/NotionRenderer'
import Back from '@/components/Navbar/Back'
import { ChevronLeftIcon } from '@heroicons/react/outline'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function Content(props) {
  const { frontMatter, blockMap, pageTitle } = props

  let icon;
  if (frontMatter.icon === undefined) {
    icon = '';
  } else {
    icon = frontMatter.icon;
  }

  let count;
  if (Math.round(frontMatter.count / 250) < 1) {
    count = 1;
  } else {
    count = Math.round(frontMatter.count / 250);
  }

  return (
    <>
      <div className="mx-auto space-y-8">
        <div className="sticky py-4 top-0 z-50 flex justify-between w-full bg-opacity-75 backdrop-blur-lg">
          <Back />

          <p className="text-sm my-auto">{`${icon} ${frontMatter.title}`}</p>


          <ThemeSwitcher />
        </div>

      </div>

      <article className='prose prose-muted dark:prose-invert max-w-2xl mx-auto prose-img:shadow-2xl prose-img:rounded-md prose-img:mx-auto dark:prose-p:text-white prose-p:text-black'>
        {pageTitle && (
          <Link
            passHref
            href={`${BLOG.path}/${frontMatter.slug}`}
            scroll={false}
            className='block md:-ml-6 mb-2 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300'
          >
            <ChevronLeftIcon className='inline-block mb-1 h-5 w-5' />
            <span className='m-1'>{frontMatter.title}</span>
          </Link>
        )}
        {frontMatter.type[0] !== 'Page' && (
          <>

            <div className="max-w-2xl mx-auto space-y-2">

              <h1 className='font-bold text-3xl text-black dark:text-white'>
                {icon} {frontMatter.title}
              </h1>

              <div className="flex  text-muted-foreground text-sm">
                <FormattedDate date={frontMatter.date} />
              </div>

              <div className="flex  justify-between text-muted-foreground text-sm">
                {frontMatter.tags && (
                  <div className='flex flex-nowrap gap-2 max-w-full overflow-x-auto article-tags'>
                    {frontMatter.tags.map((tag) => (
                      <div key={tag} className='inline-flex  items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/8'>
                        {/*<Link href={`tag/${tag}`}>*/}{tag}
                      </div>
                    ))}
                  </div>
                )}



                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                        {frontMatter.count !== null && frontMatter.count !== undefined && frontMatter.count !== '' && (
                          <>
                            <div>
                              <p>{ count } min</p>
                            </div>
                          </>
                        )}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Time to read</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </>
        )}
        <br />
        <div className="-mt-4 relative">
          <NotionRenderer
            blockMap={blockMap}
            previewImages={BLOG.previewImagesEnabled}
            {...props}
          />
        </div>
      </article>
    </>
  )
}

Content.propTypes = {
  frontMatter: PropTypes.object.isRequired,
  blockMap: PropTypes.object.isRequired,
  pageTitle: PropTypes.string
}
