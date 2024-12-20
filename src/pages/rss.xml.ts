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

  // const firstPost = posts[0]
  // console.log('Post structure:', {
  //   id: firstPost.id,
  //   slug: firstPost.slug,
  //   collection: firstPost.collection,
  //   data: firstPost.data
  // })

  const items: RSSFeedItem[] = posts.map((post) => {
    const slug = post.id.replace(/\/index\.mdx$/, '')
    const url = new URL(`blog/${slug}`, context.site).toString()

    return {
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      link: url,
      guid: url,
    }
  })

  return rss({
    title: site.pages.blog.title,
    description: site.pages.blog.description,
    site: context.site,
    items,
    customData: `
      <language>en-us</language>
      <atom:link href="${new URL('rss.xml', context.site)}" rel="self" type="application/rss+xml"/>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    `.trim(),
    xmlns: {
      atom: 'http://www.w3.org/2005/Atom',
      dc: 'http://purl.org/dc/elements/1.1/',
      content: 'http://purl.org/rss/1.0/modules/content/',
    },
  })
}
