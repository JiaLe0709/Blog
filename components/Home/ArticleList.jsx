import FormattedDate from '@/components/Common/FormattedDate'
import Link from 'next/link'
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import BLOG from '@/blog.config'

const ArticleList = ({ post }) => {
    return (
        <>
            
            <div>
                <ul className="space-y-4">
                    <Link
                        href={`${BLOG.path}/${post.slug}`}
                        prefetch={false}
                        aria-label={post.title}
                    >
                        <div className="sm:flex justify-between gap-2">
                            <p className="truncate">{`${post.icon} ${post.title}`}</p>

                            <div className="flex gap-2">
                                {/*  in one minute, a person can typically read between 200 and 250 words (Maybe idk - i'm not expert) */}
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <p className="whitespace-nowrap">{Math.round(post.count / 250)} min</p>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Time to read</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                                /
                                <Badge variant="secondary">{post.category}</Badge>/
                                <p className="whitespace-nowrap">
                                    <FormattedDate date={post.date} />
                                </p>
                            </div>
                        </div>
                    </Link>

                </ul>
            </div>
        </>

    );
}

export default ArticleList;
