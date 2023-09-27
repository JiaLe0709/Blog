import NextHead from "next/head";
import React from "react";
import BLOG from "@/blog.config";

export default function Layout({ children, title }) {
    return (
        <>
            <NextHead>
                <link rel="icon" href={BLOG.icon} />
                <title>{`${ title } | ${ BLOG.author }`}</title>
            </NextHead>
                {children}
        </>
    );
}
