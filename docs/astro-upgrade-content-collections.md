### Legacy: v2.0 Content Collections API

In Astro 4.x, content collections were defined, queried, and rendered using [the Content Collections API first introduced in Astro v2.0](https://astro.build/blog/introducing-content-collections/).

Astro 5.0 introduces a new version of content collections using the Content Layer API which brings several performance improvements and added capabilities. While old (legacy) and new (Content Layer API) collections can continue exist together in this release, there are potentially breaking changes to existing legacy collections.

#### What should I do?

We recommend [converting any existing collections to the new Content Layer API](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#updating-existing-collections) as soon as you are able and making any new collections using the Content Layer API.

##### Updating existing collections

Step-by-step instructions to update a collection

1.  **Edit the collection definition**. Your updated collection requires a `loader`, and the option to select a collection `type` is no longer available.

    ```
    import { defineCollection, z } from 'astro:content';import { glob } from 'astro/loaders';const blog = defineCollection({  // For content layer you no longer define a `type`  type: 'content',  loader: glob({ pattern: '**\/[^_]*.md', base: "./src/data/blog" }),  schema: z.object({    title: z.string(),    description: z.string(),    pubDate: z.coerce.date(),    updatedDate: z.coerce.date().optional(),  }),});
    ```

2.  **Change references from `slug` to `id`**. Content layer collections do not have a `slug` field. Instead, all updated collections will have an `id`. You may also need to update your file name to match an updated getStaticPaths() parameter:

    ```
    ---export async function getStaticPaths() {  const posts = await getCollection('blog');  return posts.map((post) => ({    params: { slug: post.slug },    params: { slug: post.id },    props: post,  }));}---
    ```

3.  **Switch to the new `render()` function**. Entries no longer have a `render()` method, as they are now serializable plain objects. Instead, import the `render()` function from `astro:content`.

    ```
    ---import { getEntry, render } from 'astro:content';const post = await getEntry('blog', params.slug);const { Content, headings } = await post.render();const { Content, headings } = await render(post);---<Content />
    ```

##### Breaking changes to legacy `content` and `data` collections

[Section titled Breaking changes to legacy content and data collections](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#breaking-changes-to-legacy-content-and-data-collections)

By default, collections that use the old types (`content` or `data`) and do not define a `loader` are now implemented under the hood using the Content Layer API’s built-in `glob()` loader, with extra backward-compatibility handling.

While this backwards compatibility implementation is able to emulate most of the features of legacy collections, **there are some differences and limitations that may cause breaking changes to existing collections**:

- In previous versions of Astro, collections would be generated for all folders in `src/content/`, even if they were not defined in `src/content/config.ts`. This behavior is now deprecated, and collections should always be defined in `src/content/config.ts`. For existing collections, these can just be empty declarations (e.g. `const blog = defineCollection({})`) and Astro will implicitly define your legacy collection for you in a way that is compatible with the new loading behavior.
- The special `layout` field is not supported in Markdown collection entries. This property is intended only for standalone page files located in `src/pages/` and not likely to be in your collection entries. However, if you were using this property, you must now create dynamic routes that include your page styling.
- Sort order of generated collections is non-deterministic and platform-dependent. This means that if you are calling `getCollection()`, the order in which entries are returned may be different than before. If you need a specific order, you should sort the collection entries yourself.
- `image().refine()` is not supported. If you need to validate the properties of an image you will need to do this at runtime in your page or component.
- the `key` argument of `getEntry(collection, key)` is typed as `string`, rather than having types for every entry.
