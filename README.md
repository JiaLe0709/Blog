This is a [Notion](https://www.notion.so) Blog that code in [Next.js](https://nextjs.org/).

## Docs

- Under Progress

## Getting Started

Development:

```bash
git clone https://github.com/JiaLe0709/Blog.git
cd Blog
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Env

```bash
TG_CHAT_ID=
TG_TOKEN=
NOTION_PAGE_ID=
NOTION_SPACES_ID=
NOTION_DOMAIN=
```

Env  | Required ?
------------- | -------------
TG_CHAT_ID  | False
TG_TOKEN  | False
NOTION_PAGE_ID  | True
NOTION_SPACES_ID  | True 
NOTION_DOMAIN  | True 

## Deploy

The easiest way to deploy this Blog app is to use the [Vercel](https://vercel.com/).

1. fork this repo
2. update blog.config.js if needed
3. using Vercel create new project select the repo that you fork just now
4. add env
5. deploy and wait until it done

## Docker

```bash
docker push jiale0709/blog
```

docker.io/jiale0709/blog