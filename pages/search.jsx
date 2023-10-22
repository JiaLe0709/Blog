import SearchLayout from '@/layouts/searchLayouts';
import { getAllPosts, getAllTagsFromPosts } from '@/lib/notion';


export async function getStaticProps() {
    const posts = await getAllPosts({ onlyPost: true })
    const tags = getAllTagsFromPosts(posts)
    return {
        props: {
            tags,
            posts
        },
        revalidate: 1
    }
}

const Search = ({ posts, tags }) => {

    return (
        <>
            <SearchLayout tags={tags} posts={posts} />
        </>
    )
}

export default Search;