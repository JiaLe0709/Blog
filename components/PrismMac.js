import { useEffect } from 'react'
import Prism from 'prismjs'
import 'prismjs/plugins/toolbar/prism-toolbar'
import 'prismjs/plugins/toolbar/prism-toolbar.min.css'
import 'prismjs/plugins/show-language/prism-show-language'
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard'
import 'prismjs/plugins/line-numbers/prism-line-numbers'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

import BLOG from '@/blog.config'
import { useRouter } from 'next/navigation'


export function loadExternalResource(url, type) {
    const elements = type === 'js' ? document.querySelectorAll(`[src='${url}']`) : document.querySelectorAll(`[href='${url}']`)
  
    return new Promise((resolve, reject) => {
      if (elements.length > 0 || !url) {
        resolve(url)
        return url
      }
  
      let tag
  
      if (type === 'css') {
        tag = document.createElement('link')
        tag.rel = 'stylesheet'
        tag.href = url
      } else if (type === 'font') {
        tag = document.createElement('link')
        tag.rel = 'preload'
        tag.as = 'font'
        tag.href = url
      } else if (type === 'js') {
        tag = document.createElement('script')
        tag.src = url
      }
      if (tag) {
        tag.onload = () => {
          console.log('Load Success', url)
          resolve(url)
        }
        tag.onerror = () => {
          console.log('Load Error', url)
          reject(url)
        }
        document.head.appendChild(tag)
      }
    })
  }

const PrismMac = () => {
  const router = useRouter()
  const isDarkMode = BLOG.theme === 'dark'

  useEffect(() => {
    if (JSON.parse(BLOG.CODE_MAC_BAR)) {
      loadExternalResource('/css/prism-mac-style.css', 'css')
    }
    loadPrismThemeCSS(isDarkMode)
    loadExternalResource(BLOG.PRISM_JS_AUTO_LOADER, 'js').then((url) => {
      if (window?.Prism?.plugins?.autoloader) {
        window.Prism.plugins.autoloader.languages_path = BLOG.PRISM_JS_PATH
      }

      renderPrismMac()
      renderMermaid()
      renderCollapseCode()
    })
  }, [router, isDarkMode])

  return <></>
}

const loadPrismThemeCSS = (isDarkMode) => {
  let PRISM_THEME
  let PRISM_PREVIOUS
  if (JSON.parse(BLOG.PRISM_THEME_SWITCH)) {
    if (isDarkMode) {
      PRISM_THEME = BLOG.PRISM_THEME_DARK_PATH
      PRISM_PREVIOUS = BLOG.PRISM_THEME_LIGHT_PATH
    } else {
      PRISM_THEME = BLOG.PRISM_THEME_LIGHT_PATH
      PRISM_PREVIOUS = BLOG.PRISM_THEME_DARK_PATH
    }
    const previousTheme = document.querySelector(`link[href="${PRISM_PREVIOUS}"]`)
    if (previousTheme) {
      previousTheme.parentNode.removeChild(previousTheme)
    }
    loadExternalResource(PRISM_THEME, 'css')
  } else {
    loadExternalResource(BLOG.PRISM_THEME_PREFIX_PATH, 'css')
  }
}

const renderCollapseCode = () => {
  if (!JSON.parse(BLOG.CODE_COLLAPSE)) {
    return
  }
  const codeBlocks = document.querySelectorAll('.code-toolbar')
  for (const codeBlock of codeBlocks) {
    if (codeBlock.closest('.collapse-wrapper')) {
      continue 
    }

    const code = codeBlock.querySelector('code')
    const language = code.getAttribute('class').match(/language-(\w+)/)[1]

    const collapseWrapper = document.createElement('div')
    collapseWrapper.className = 'collapse-wrapper w-full py-2'
    const panelWrapper = document.createElement('div')
    panelWrapper.className = 'border dark:border-gray-600 rounded-md hover:border-indigo-500 duration-200 transition-colors'

    const header = document.createElement('div')
    header.className = 'flex justify-between items-center px-4 py-2 cursor-pointer select-none'
    header.innerHTML = `<h3 class="text-lg font-medium">${language}</h3><svg class="transition-all duration-200 w-5 h-5 transform rotate-0" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M6.293 6.293a1 1 0 0 1 1.414 0L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z" clip-rule="evenodd"/></svg>`

    const panel = document.createElement('div')
    panel.className = 'invisible h-0 transition-transform duration-200 border-t border-gray-300'

    panelWrapper.appendChild(header)
    panelWrapper.appendChild(panel)
    collapseWrapper.appendChild(panelWrapper)

    codeBlock.parentNode.insertBefore(collapseWrapper, codeBlock)
    panel.appendChild(codeBlock)

    header.addEventListener('click', () => {
      panel.classList.toggle('invisible')
      panel.classList.toggle('h-0')
      panel.classList.toggle('h-auto')
      header.querySelector('svg').classList.toggle('rotate-180')
      panelWrapper.classList.toggle('border-gray-300')
    })
  }
}

const renderMermaid = async() => {
  const observer = new MutationObserver(async mutationsList => {
    for (const m of mutationsList) {
      if (m.target.className === 'notion-code language-mermaid') {
        const chart = m.target.querySelector('code').textContent
        if (chart && !m.target.querySelector('.mermaid')) {
          const mermaidChart = document.createElement('div')
          mermaidChart.className = 'mermaid'
          mermaidChart.innerHTML = chart
          m.target.appendChild(mermaidChart)
        }

        const mermaidsSvg = document.querySelectorAll('.mermaid')
        if (mermaidsSvg) {
          let needLoad = false
          for (const e of mermaidsSvg) {
            if (e?.firstChild?.nodeName !== 'svg') {
              needLoad = true
            }
          }
          if (needLoad) {
            loadExternalResource(BLOG.MERMAID_CDN, 'js').then(url => {
              setTimeout(() => {
                const mermaid = window.mermaid
                mermaid?.contentLoaded()
              }, 100)
            })
          }
        }
      }
    }
  })
  if (document.querySelector('#notion-article')) {
    observer.observe(document.querySelector('#notion-article'), { attributes: true, subtree: true })
  }
}

function renderPrismMac() {
  const container = document?.getElementById('notion-article')

  if (JSON.parse(BLOG.CODE_LINE_NUMBERS)) {
    const codeBlocks = container?.getElementsByTagName('pre')
    if (codeBlocks) {
      Array.from(codeBlocks).forEach(item => {
        if (!item.classList.contains('line-numbers')) {
          item.classList.add('line-numbers')
          item.style.whiteSpace = 'pre-wrap'
        }
      })
    }
  }

  try {
    Prism.highlightAll()
  } catch (err) {
    console.log(err)
  }

  const codeToolBars = container?.getElementsByClassName('code-toolbar')
  if (codeToolBars) {
    Array.from(codeToolBars).forEach(item => {
      const existPreMac = item.getElementsByClassName('pre-mac')
      if (existPreMac.length < codeToolBars.length) {
        const preMac = document.createElement('div')
        preMac.classList.add('pre-mac')
        preMac.innerHTML = '<span></span><span></span><span></span>'
        item?.appendChild(preMac, item)
      }
    })
  }

  if (JSON.parse(BLOG.CODE_LINE_NUMBERS)) {
    fixCodeLineStyle()
  }
}

const fixCodeLineStyle = () => {
  const observer = new MutationObserver(mutationsList => {
    for (const m of mutationsList) {
      if (m.target.nodeName === 'DETAILS') {
        const preCodes = m.target.querySelectorAll('pre.notion-code')
        for (const preCode of preCodes) {
          Prism.plugins.lineNumbers.resize(preCode)
        }
      }
    }
  })
  observer.observe(document.querySelector('#notion-article'), { attributes: true, subtree: true })
  setTimeout(() => {
    const preCodes = document.querySelectorAll('pre.notion-code')
    for (const preCode of preCodes) {
      Prism.plugins.lineNumbers.resize(preCode)
    }
  }, 10)
}

export default PrismMac