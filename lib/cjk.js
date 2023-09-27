const BLOG = require('../blog.config')

function cjk() {
  switch (BLOG.lang.toLowerCase()) {
    case 'zh-cn':
    case 'zh-sg':
      return 'SC'
    case 'zh':
    case 'zh-hk':
    case 'zh-tw':
      return 'TC'
    default:
      return null
  }
}

module.exports = cjk