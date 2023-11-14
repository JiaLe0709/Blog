import React from "react";
import { useState } from "react";
import Layout from '@/layouts/Glayouts';
import Link from 'next/link'
import ArticleBlock from '@/components/Home/articleBlock';
import ThemeSwitcher from "@/components/Theme/ThemeSwitcher";
import Back from "@/components/Navbar/Back";
import { buttonVariants } from "@/components/ui/button";
import BLOG from '@/blog.config'

const SearchLayout = ({ posts, currentTag, tags }) => {
  const [searchValue, setSearchValue] = useState('');

  let filteredBlogPosts = [];
  if (posts) {
    filteredBlogPosts = posts.filter((post) => {
      const tagContent = post.tags ? post.tags.join(' ') : '';
      const searchContent = post.title + post.summary + tagContent;
      return searchContent.toLowerCase().includes(searchValue.toLowerCase());
    });
  }

  return (
    <>
      <div className="sticky py-4 top-0 z-50 w-full bg-opacity-75 backdrop-blur-lg">
        <div className="flex justify-between container">
          <div>
            <Back />
          </div>
          <div className="flex gap-2">
            <Link
              href="/about"
              className={buttonVariants({ variant: "ghost" })}
              aria-label="About Page"
            >
              About
            </Link>
            {BLOG.contact && (
              <Link
                href="/contact"
                className={buttonVariants({ variant: "ghost" })}
                aria-label="Uses Page"
              >
                Contact
              </Link>
            )}
            <ThemeSwitcher />
          </div>
        </div>
      </div>
      <Layout title={'Search'} needContainer={true}>
        <div className=''>
          <input
            type='text'
            placeholder={
              currentTag
                ? `Only Search Tags - #${currentTag}`
                : `Search Post`
            }
            className=' bg-white dark:bg-neutral-800 shadow-md rounded-lg outline-none focus:shadow p-3'
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className='tag-container'>
          <div className='flex flex-wrap justify-center mt-4'>
            {tags &&
              Object.keys(tags).map((key) => {
                const selected = key === currentTag;
                return (
                  <div
                    key={key}
                    className={`m-1 font-medium rounded-lg whitespace-nowrap hover:text-gray-100 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-neutral-800 ${
                      selected
                        ? 'text-gray-100 bg-gray-400 dark:bg-neutral-800'
                        : 'text-gray-400 bg-gray-100 dark:bg-night'
                    }`}
                  >
                    <Link
                      key={key}
                      scroll={false}
                      href={selected ? '/search' : `/tag/${encodeURIComponent(key)}`}
                      className='px-4 py-2 block'
                    >
                      {`${key} (${tags[key]})`}
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
        <div className='article-container my-8'>
          {!filteredBlogPosts.length && (
            <p className='text-gray-500 dark:text-gray-300'>
              Posts Not Found
            </p>
          )}
          {filteredBlogPosts.map((post) => {
            return <ArticleBlock key={post.id} post={post} />;
          })}
        </div>
      </Layout>
    </>
  );
};

export default SearchLayout;