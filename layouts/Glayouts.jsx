import NextHead from "next/head";
import React from "react";
import BLOG from "@/blog.config";

export default function Layout({ children, title, needContainer }) {
    let titles;
    if (title === undefined) {
        titles = ''
    } else {
        titles = title;
    }
    const ogImage = `https://${BLOG.ogImageGenerateHost}/api/default?logo=${BLOG.link
        }/favicon.png&siteName=${encodeURIComponent(
            BLOG.title?.trim()
        )}&description=${encodeURIComponent(
            BLOG.bio?.trim()
        )}&title=${encodeURIComponent(
            BLOG.title?.trim()
        )}&summary=${encodeURIComponent(
            BLOG.bio?.trim()
        )}&theme=light&border=solid`
    return (
        <>
            <NextHead>
                <meta
                    property='og:image'
                    content={ogImage || BLOG.defaultCover}
                />
                <link rel="icon" href={BLOG.icon} />
                <title>{`${titles}`}</title>
                <meta name="description" content={BLOG.bio} />
            </NextHead>
            <div className={`flex flex-col min-h-screen justify-between space-y-4 ${needContainer && 'container'} `}>
                {children}
            </div>

        </>
    );
}
