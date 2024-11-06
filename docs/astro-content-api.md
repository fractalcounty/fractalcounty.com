Title: Content Collections API Reference

URL Source: https://5-0-0-beta.docs.astro.build/en/reference/modules/astro-content/

Markdown Content:
**Added in:** `astro@2.0.0`

Content collections offer APIs to configure and query your Markdown or MDX documents in `src/content/`. For features and usage examples, [see our content collections guide](https://5-0-0-beta.docs.astro.build/en/guides/content-collections/).

Imports from `astro:content`
----------------------------

[Section titled Imports from astro:content](https://5-0-0-beta.docs.astro.build/en/reference/modules/astro-content/#imports-from-astrocontent)

```
import {  z,  defineCollection,  getCollection,  getEntry,  getEntries,  reference, } from 'astro:content';
```

### `defineCollection()`

[Section titled defineCollection()](https://5-0-0-beta.docs.astro.build/en/reference/modules/astro-content/#definecollection)

**Type:** `(input: CollectionConfig) => CollectionConfig`

**Added in:** `astro@2.0.0`

`defineCollection()` is a utility to configure a collection in a `src/content/config.*` file.

```
import { z, defineCollection } from 'astro:content';import { glob } from 'astro/loaders';const blog = defineCollection({  loader: glob({ pattern: '**/*.md', base: './src/data/blog' }),  schema: z.object({    title: z.string(),    permalink: z.string().optional(),  }),});// Expose your defined collection to Astro// with the `collections` exportexport const collections = { blog };
```

This function accepts the following properties:

**Type:** `() => Promise<Array<{ id: string, [key: string]: any }> | Record<string, Record<string, any>>> | [Loader](https://5-0-0-beta.docs.astro.build/en/reference/content-loader-reference/#loader-api)`

**Added in:** `astro@5.0.0` Beta

A `loader` is either an object or a function that allows you to load data from any source, local or remote, into content collections.

[See the `Content Collection` guide](https://5-0-0-beta.docs.astro.build/en/guides/content-collections/#defining-the-collection-loader) for example usage.

**Type:** `ZodType | (context: [SchemaContext](https://5-0-0-beta.docs.astro.build/en/reference/modules/astro-content/#schemacontext)) => ZodType`

**Added in:** `astro@2.0.0`

`schema` is an optional Zod object to configure the type and shape of document frontmatter for a collection. Each value must use [a Zod validator](https://github.com/colinhacks/zod).

[See the `Content Collection` guide](https://5-0-0-beta.docs.astro.build/en/guides/content-collections/#defining-the-collection-schema) for example usage.

**Type:** `(collection: string) => ZodEffects<ZodString, { collection, id: string }>`

**Added in:** `astro@2.5.0`

The `reference()` function is used in the content config to define a relationship, or “reference,” from one collection to another. This accepts a collection name and validates the entry identifier(s) specified in your content frontmatter or data file.

This example defines references from a blog author to the `authors` collection and an array of related posts to the same `blog` collection:

```
import { defineCollection, reference, z } from 'astro:content';import { glob, file } from 'astro/loaders';const blog = defineCollection({  loader: glob({ pattern: '**/*.md', base: './src/data/blog' }),  schema: z.object({    // Reference a single author from the `authors` collection by `id`    author: reference('authors'),    // Reference an array of related posts from the `blog` collection by `slug`    relatedPosts: z.array(reference('blog')),  })});const authors = defineCollection({  loader: file("src/data/authors.json"),  schema: z.object({ /* ... */ })});export const collections = { blog, authors };
```

[See the `Content Collection` guide](https://5-0-0-beta.docs.astro.build/en/guides/content-collections/#defining-collection-references) for example usage.

### `getCollection()`

[Section titled getCollection()](https://5-0-0-beta.docs.astro.build/en/reference/modules/astro-content/#getcollection)

**Type:** `(collection: string, filter?: (entry: CollectionEntry<collection>) => boolean) => CollectionEntry<collection>[]`

**Added in:** `astro@2.0.0`

`getCollection()` is a function that retrieves a list of content collection entries by collection name.

It returns all items in the collection by default, and accepts an optional `filter` function to narrow by entry properties. This allows you to query for only some items in a collection based on `id` or frontmatter values via the `data` object.

```
---import { getCollection } from 'astro:content';// Get all `src/content/blog/` entriesconst allBlogPosts = await getCollection('blog');// Only return posts with `draft: true` in the frontmatterconst draftBlogPosts = await getCollection('blog', ({ data }) => {  return data.draft === true;});---
```

[See the `Content Collection` guide](https://5-0-0-beta.docs.astro.build/en/guides/content-collections/#querying-collections) for example usage.

**Type:** `( collection: string, id: string ) => CollectionEntry<collection> | ({ collection: string, id: string }) => CollectionEntry<collection>`

**Added in:** `astro@2.5.0`

`getEntry()` is a function that retrieves a single collection entry by collection name and the entry `id`. `getEntry()` can also be used to get referenced entries to access the `data` or `body` properties:

```
---import { getEntry } from 'astro:content';// Get `src/content/blog/enterprise.md`const enterprisePost = await getEntry('blog', 'enterprise');// Get `src/content/captains/picard.json`const picardProfile = await getEntry('captains', 'picard');// Get the profile referenced by `data.captain`const enterpriseCaptainProfile = await getEntry(enterprisePost.data.captain);---
```

See the `Content Collections` guide for examples of [querying collection entries](https://5-0-0-beta.docs.astro.build/en/guides/content-collections/#querying-collections).

**Type:** `(Array<{ collection: string, id: string }>) => Array<CollectionEntry<collection>>`

**Added in:** `astro@2.5.0`

`getEntries()` is a function that retrieves multiple collection entries from the same collection. This is useful for [returning an array of referenced entries](https://5-0-0-beta.docs.astro.build/en/guides/content-collections/#defining-collection-references) to access their associated `data` and `body` properties.

```
---import { getEntries } from 'astro:content';const enterprisePost = await getEntry('blog', 'enterprise');// Get related posts referenced by `data.relatedPosts`const enterpriseRelatedPosts = await getEntries(enterprisePost.data.relatedPosts);---
```

**Type:** `() => Promise<RenderedEntry>`

**Added in:** `astro@5.0.0` Beta

A function to compile a given entry for rendering. This returns the following properties:

*   `<Content />` - A component used to render the document’s contents in an Astro file.
*   `headings` - A generated list of headings, [mirroring Astro’s `getHeadings()` utility](https://5-0-0-beta.docs.astro.build/en/guides/markdown-content/#available-properties) on Markdown and MDX imports.
*   `remarkPluginFrontmatter ` - The modified frontmatter object after any [remark or rehype plugins have been applied](https://5-0-0-beta.docs.astro.build/en/guides/markdown-content/#modifying-frontmatter-programmatically). Set to type `any`.

```
---import { getEntry, render } from 'astro:content';const entry = await getEntry('blog', 'entry-1');const { Content, headings, remarkPluginFrontmatter } = await render(entry);---
```

[See the `Content Collection` guide](https://5-0-0-beta.docs.astro.build/en/guides/content-collections/#rendering-body-content) for example usage.

`astro:content` types
---------------------

[Section titled astro:content types](https://5-0-0-beta.docs.astro.build/en/reference/modules/astro-content/#astrocontent-types)

```
import type {  CollectionEntry,  CollectionKey,  ContentCollectionKey,  DataCollectionKey,  SchemaContext, } from 'astro:content';
```

### `CollectionEntry`

[Section titled CollectionEntry](https://5-0-0-beta.docs.astro.build/en/reference/modules/astro-content/#collectionentry)

Query functions including [`getCollection()`](https://5-0-0-beta.docs.astro.build/en/reference/modules/astro-content/#getcollection), [`getEntry()`](https://5-0-0-beta.docs.astro.build/en/reference/modules/astro-content/#getentry), and [`getEntries()`](https://5-0-0-beta.docs.astro.build/en/reference/modules/astro-content/#getentries) each return entries with the `CollectionEntry` type. This type is available as a utility from `astro:content`:

```
import type { CollectionEntry } from 'astro:content';
```

`CollectionEntry` is a generic type. Use it with the name of the collection you’re querying. For example, an entry in your `blog` collection would have the type `CollectionEntry<'blog'>`.

Each `CollectionEntry` is an object with the following values:

**Example Type:** `'author-1' | 'author-2' | ...`

A unique ID. Note that all IDs from Astro’s built-in `glob()` loader are slugified.

**Example Type:** `'blog' | 'authors' | ...`

The name of a collection in which entries are located. This is the name used to reference the collection in your schema, and in querying functions.

**Type:** `CollectionSchema<TCollectionName>`

An object of frontmatter properties inferred from your collection schema ([see `defineCollection()` reference](https://5-0-0-beta.docs.astro.build/en/reference/modules/astro-content/#definecollection)). Defaults to `any` if no schema is configured.

**Type:** `string`

A string containing the raw, uncompiled body of the Markdown or MDX document.

**Added in:** `astro@3.1.0`

A string union of all collection names defined in your `src/content/config.*` file. This type can be useful when defining a generic function that accepts any collection name.

```
import { type CollectionKey, getCollection } from 'astro:content';async function getCollection(collection: CollectionKey) {  return getCollection(collection);}
```

The `context` object that `defineCollection` uses for the function shape of `schema`. This type can be useful when building reusable schemas for multiple collections.

This includes the following property:

*   `image` - The `image()` schema helper that allows you [to use local images in Content Collections](https://5-0-0-beta.docs.astro.build/en/guides/images/#images-in-content-collections)

```
import type { SchemaContext } from 'astro:content';export const imageSchema = ({ image }: SchemaContext) =>    z.object({        image: image(),        description: z.string().optional(),    });const blog = defineCollection({  loader: /* ... */,  schema: ({ image }) => z.object({    title: z.string(),    permalink: z.string().optional(),    image: imageSchema({ image })  }),});
```
