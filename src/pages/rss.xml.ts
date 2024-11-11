import { site } from '@/config'
import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'

interface Context {
  site: string
}

export async function GET(context: Context) {
  const items = (await getCollection('blog'))
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf())

  return rss({
    title: site.pages.blog.title,
    description: site.pages.blog.description,
    site: context.site,
    items: items.map((item) => ({
      title: item.data.title,
      description: item.data.description,
      pubDate: item.data.publishDate,
      link: `/blog/${item.slug}/`,
    })),
  })
}
