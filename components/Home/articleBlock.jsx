import { Badge } from "@/components/ui/badge";
import BLOG from "@/blog.config"
import FormattedDate from '@/components/Common/FormattedDate'

import Link from "next/link";

const Articles = ({ post }) => {

  let icon;
  if (post.icon === undefined) {
      icon = ''
  } else {
      icon = post.icon
  }

  let count;
  if (Math.round(post.count / 250) < 1) {
    count = 1;
  } else {
    count = Math.round(post.count / 250);
  }

  return (
    <>
      <div key={post.id} className="p-8 bg-muted rounded-2xl">
        <Link
          href={`${BLOG.path}/${post.slug}`}
          aria-label={post.title}
        >
          <div className="space-y-2">
            <p className="font-semibold ">{`${icon} ${post.title}`}</p>
            <div className="flex gap-2">
              {post.count !== null && post.count !== undefined && post.count !== '' && (
                <p>{ count } min</p>
              )}
              {post.count !== null && post.count !== undefined && post.count !== '' && (
                <p>/</p>
              )}
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