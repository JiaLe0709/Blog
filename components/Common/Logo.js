// https://react-svgr.com/playground/
import * as React from 'react'
import Image from 'next/image'
import BLOG from '@/blog.config'

const Logo = () => (
  <Image src={BLOG.icon} width={24} height={24} alt='logo'></Image>
)

export default Logo