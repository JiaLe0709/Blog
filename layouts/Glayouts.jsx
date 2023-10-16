import NextHead from "next/head";
import React from "react";
import BLOG from "@/blog.config";

export default function Layout({ children, title }) {
    let titles;
    if (title === undefined) {
        titles = ''
    } else {
        titles = title;
    }
    return (
        <>
            <NextHead>
                <link rel="icon" href={BLOG.icon} />
                <title>{`${titles}`}</title>
            </NextHead>
            {children}
        </>
    );
}
