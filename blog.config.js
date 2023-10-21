const BLOG = {
    title: "Jia Le's Blog", // Default, For navigation bar
    icon: '/favicon.ico', // if file path add '/', could be link (https:// or http://)
    bio: 'A Magical Blog', // Default
    email: 'jle26531@gmail.com', // For mailto: function and backup contact
    author: 'Jia Le', // Your name
    contact: process.env.CONTACT || true, // Boolean : true / false (use for display the button and '/contact' disable or enable)
    sortByDate: true,
    pwa: true, // Boolean: true / false
    link: 'https://jiale0709.link',
    defaultCover: '/cover.jpg',
    path: '', // dont't modify
    postsPerPage: 5, // int only
    /*
    * PWA = manifest.json in ./public
    - Update the data there
    ref: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps
    */
    // It's not safety to update the data here.
    // Don't modified them, just set & update the value in .env
    telegramToken: process.env.TG_TOKEN || '',
    telegramChatId: process.env.TG_CHAT_ID || '',
    notionDomain: process.env.NOTION_DOMAIN || "jiale0709.notion.site",
    notionPageId: process.env.NOTION_PAGE_ID || "62581ac7b5334d6197dc33d9416a9cc3", 
    notionSpacesId: process.env.NOTION_SPACES_ID || "3e2958af48ab41a3821642983fdeae70", 
    notionAccessToken: process.env.NOTION_ACCESS_TOKEN, 
    useMail: true, // Boolean: true / false ('mailto:' function)
    showButton: true, // Boolean: true / false (For Homepage)
    homePageUseNotion: false, // Boolean: true / false , if true edit page with slug 'index'
    useRss: false, // new feature - not working
    SEO_GOOGLE_SITE_VERIFICATION: process.env.SEO_GOOGLE || '',
    starrySky: true, // StarrySKy Background animation (dark theme only...)
    buttonData: [
        /*
        * currently support button: 
        * - github, discord, chess, facebook, instagram, twitter, telegram.
        * - You can follow the table to fill the type, name (display name for block), link (url)
        * 
        * ## TABLE
        *       Name    |      type       |
        *     Github    |       gh        |
        *    Instagram  |       ig        |
        *      Chess    |     chess       | ## like chess.com & lichess.org
        *     Discord   |    discord      |
        *    Telegram   |       tg        |
        *    Facebook   |       fb        |
        *    Twitter    |     twitter     |
        * 
        * - Example:
        * ## You want to show ur github link.
        * ## follow the table and fill the 'type'
        *   
        * ## if you want to add another link add comma (,)  behind the close Curly Bracket (}):
        * - Example:
        *   { type: 'github' , name: "JiaLe0709", link: "https://github.com/JiaLe0709" },
        *   { type: 'xxx' , name: "xxx", link: "https://localhost:3000" }
        * 
        */
        { type: 'gh' , name: "JiaLe0709", link: "https://github.com/JiaLe0709" },
        { type: 'discord', name:"@jiale0709", link: 'https://discord.com/users/jiale0709'},
        { type: 'chess', name: 'jiale0709', link: 'https://www.chess.com/member/jiale0709'}
    ],
    /*
    * Same as buttonData
    */
    footerButton: [

    ],
  comment: {
    // support provider: giscus, waline
    provider: 'giscus', // leave it empty if you don't need any comment plugin
    giscusConfig: {
      repo: 'JiaLe0709/Blog-Comments',
      repoId: 'R_kgDOKFlFKw',
      category: 'General',
      categoryId: 'DIC_kwDOKFlFK84CYgvK'
    },
    waline: {
      url: 'https://waline-jiale.vercel.app/'
    }
  },
}

module.exports = BLOG;
