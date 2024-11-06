import rss from '@astrojs/rss'
import { HOME } from '@consts'
import { getCollection } from 'astro:content'

interface Context {
  site: string
}

export async function GET(context: Context) {
  const items = (await getCollection('blog'))
    .filter((post) => !post.data.draft)
    .sort(
      (a, b) =>
        new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf()
    )

  return rss({
    title: HOME.TITLE,
    description: HOME.DESCRIPTION,
    site: context.site,
    items: items.map((item) => ({
      title: item.data.title,
      description: item.data.description,
      pubDate: item.data.date,
      link: `/blog/${item.slug}/`,
    })),
  })
}
