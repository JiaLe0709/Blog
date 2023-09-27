import Giscus from '@giscus/react';
import BLOG from '@/blog.config';
import { useTheme } from 'next-themes';

const GiscusComment = ({ layout }) => {
    const { resolvedTheme } = useTheme();
    const lang = 'en' 
    const initialGiscusTheme = resolvedTheme === 'light' ? 'light' : 'transparent_dark';

    return (
        <>
            <div
                id='comments'
                className={layout && layout === 'fullWidth' ? '' : 'max-w-5xl mx-auto'}
            >
                <Giscus
                    id="comments"
                    repo={BLOG.comment.giscusConfig.repo}
                    repoId={BLOG.comment.giscusConfig.repoId}
                    category={BLOG.comment.giscusConfig.category}
                    categoryId={BLOG.comment.giscusConfig.categoryId}
                    mapping="title"
                    reactionsEnabled="1"
                    emitMetadata="0"
                    inputPosition="top"
                    theme={initialGiscusTheme}
                    lang={lang}
                    //loading="lazy"
                />
            </div>
        </>
    );
};

export default GiscusComment;