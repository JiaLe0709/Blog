import NextHead from "next/head";
import React from "react";
import BLOG from "@/blog.config";

export default function Layout({ children, title, showAuthor }) {
    return (
        <>
            <NextHead>
                <link rel="icon" href={BLOG.icon} />
                <title>{`${title}${showAuthor ? ' | ' + BLOG.author : ''}`}</title>
            </NextHead>
                {children}
        </>
    );
}
