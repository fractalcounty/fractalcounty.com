import { site } from '@/config'
import rss, { type RSSFeedItem } from '@astrojs/rss'
import { getCollection } from 'astro:content'

interface Context {
  site: string
}

export async function GET(context: Context) {
  const posts = (await getCollection('blog'))
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf())

  const items: RSSFeedItem[] = posts.map((post) => ({
    title: post.data.title,
    description: post.data.description,
    pubDate: post.data.publishDate,
    link: new URL(`/blog/${post.id}/`, context.site).toString(),
    guid: new URL(`/blog/${post.id}/`, context.site).toString(),
  }))

  return rss({
    title: site.pages.blog.title,
    description: site.pages.blog.description,
    site: context.site,
    items,

    stylesheet: '/rss/styles.xsl',
    xmlns: {
      atom: 'http://www.w3.org/2005/Atom',
      dc: 'http://purl.org/dc/elements/1.1/',
      content: 'http://purl.org/rss/1.0/modules/content/',
    },
    customData: `
      <language>en-us</language>
      <atom:link href="${new URL('rss.xml', context.site)}" rel="self" type="application/rss+xml"/>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    `,
  })
}
