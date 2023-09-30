import { Badge } from "@/components/ui/badge";
import BLOG from "@/blog.config"
import FormattedDate from '@/components/Common/FormattedDate'

import Link from "next/link";

const Articles = ({ post }) => {
  return (
    <>
      <div key={post.id} className="p-8 bg-muted rounded-2xl">
        <Link
          href={`${BLOG.path}/${post.slug}`}
          aria-label={post.title}
        >
          <div className="space-y-2">
            <p className="font-semibold hover:underline">{`${post.icon} ${post.title}`}</p>
            <div className="flex gap-2">
              <p>{Math.round(post.count / 250)} min</p>/
              <Badge variant="default">{post.category}</Badge>/
              <p>
                <FormattedDate date={post.date} />
              </p>
            </div>
            <p>{post.summary}</p>
          </div>
        </Link>
      </div>
    </>
  );
}

export default Articles