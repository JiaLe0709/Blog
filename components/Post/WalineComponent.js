import React from 'react'
import { init } from '@waline/client'
import BLOG from '@/blog.config'
import { useRouter } from 'next/router'
import '@waline/client/dist/waline.css'

const path = ''
let waline = null

const WalineComponent = (props) => {
  const containerRef = React.createRef()
  const router = useRouter()

  const updateWaline = React.useCallback((url) => {
    if (url !== path && waline) {
      waline.update(props)
    }
  }, [props])

  React.useEffect(() => {
    if (!waline) {
      waline = init({
        ...props,
        el: containerRef.current,
        serverURL: BLOG.comment.waline.url,
        lang: 'en',
        reaction: true,
        dark: 'html.dark',
        emoji: [
          '//unpkg.com/@waline/emojis@1.1.0/qq',
          '//unpkg.com/@waline/emojis@1.1.0/bmoji',
          '//unpkg.com/@waline/emojis@1.1.0/bilibili',
          '//unpkg.com/@waline/emojis@1.1.0/weibo',
          '//unpkg.com/@waline/emojis@1.1.0/tieba',
          '//unpkg.com/@waline/emojis@1.1.0/tw-food'
        ]
      })
    }

    const handleRouteChange = () => {
      updateWaline(window.location.pathname)
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    const anchor = window.location.hash
    if (anchor) {
      const targetNode = document.getElementsByClassName('wl-cards')[0]

      const mutationCallback = (mutations) => {
        for (const mutation of mutations) {
          const type = mutation.type
          if (type === 'childList') {
            const anchorElement = document.getElementById(anchor.substring(1))
            if (anchorElement && anchorElement.className === 'wl-item') {
              anchorElement.scrollIntoView({ block: 'end', behavior: 'smooth' })
              setTimeout(() => {
                anchorElement.classList.add('animate__animated')
                anchorElement.classList.add('animate__bounceInRight')
                observer.disconnect()
              }, 300)
            }
          }
        }
      }

      const observer = new MutationObserver(mutationCallback)
      observer.observe(targetNode, { childList: true })
    }

    return () => {
      if (waline) {
        waline.destroy()
        waline = null
      }
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [containerRef, props, router.events, updateWaline])

  return <div ref={containerRef} />
}

export default WalineComponent
