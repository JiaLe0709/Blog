import NextHead from "next/head";
import React from "react";
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import { Inter } from "next/font/google"
import BLOG from "@/blog.config";

const inter = Inter({ subsets: ['latin'] })

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
            <Navbar />
            <div className={`flex flex-col min-h-screen justify-between space-y-4 container ${inter.className}`}>
                {children}
                <Footer />
            </div>
        </>
    );
}
