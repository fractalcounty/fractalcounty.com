Title: Astro Content Loader API

URL Source: https://5-0-0-beta.docs.astro.build/en/reference/content-loader-reference/

Markdown Content:
Astro’s Content Loader API allows you to load your data from any source, local or remote, and interact with Astro’s content layer to manage your [content collections](https://5-0-0-beta.docs.astro.build/en/guides/content-collections/).

What is a loader?
-----------------

[Section titled What is a loader?](https://5-0-0-beta.docs.astro.build/en/reference/content-loader-reference/#what-is-a-loader)

Astro loaders allow you to load data into [content collections](https://5-0-0-beta.docs.astro.build/en/guides/content-collections/), which can then be used in pages and components. The [built-in `glob()` and `file()` loaders](https://5-0-0-beta.docs.astro.build/en/guides/content-collections/#built-in-loaders) are used to load content from the file system, and you can create your own loaders to load content from other sources.

Each collection needs [a loader defined in its schema](https://5-0-0-beta.docs.astro.build/en/guides/content-collections/#defining-the-collection-loader). You can define a loader inline in your project’s `src/content/config.ts` file, share one loader between multiple collections, or even [publish your loader to NPM as a package](https://5-0-0-beta.docs.astro.build/en/reference/publish-to-npm/) to share with others and be included in our integrations library.

Loaders can be defined either as a simple function that returns an array of entries or with the more powerful object Content Loader API for more control over the loading process.

An inline loader is an async function that returns an array or object containing entries. Use this for simple loaders, particularly those that are defined inline in the `src/content/config.ts` file.

The function can be async and must return either an array of entries that each contain a unique `id` field, or an object where each key is a unique ID and each value is the entry. Whenever the loader is invoked, it will clear the store and reload all the entries.

```
const countries = defineCollection({  loader: async () => {    const response = await fetch("https://restcountries.com/v3.1/all");    const data = await response.json();    // Must return an array of entries with an id property    // or an object with IDs as keys and entries as values    return data.map((country) => ({      id: country.cca3,      ...country,    }));  },  schema: /* ... */});
```

A loader is an object with a `load()` method that is called at build time to fetch data and update the data store. It allows entries to be updated incrementally, or for the store to be cleared only when necessary. It can also define a schema for the entries, which can be used to validate the data and generate static types.

The recommended pattern is to define a function that accepts configuration options and returns the loader object, in the same way that you would normally define an Astro integration or Vite plugin.

```
import type { Loader, LoaderContext } from 'astro/loaders';import { z } from 'astro:content';import { loadFeedData } from "./feed.js";// Define any options that the loader needsexport function myLoader(options: { url: string, apiKey: string }): Loader {  // Configure the loader  const feedUrl = new URL(options.url);  // Return a loader object  return {    name: "my-loader",    // Called when updating the collection.    load: async (context: LoaderContext): Promise<void> => {      // Load data and update the store      const response = await loadFeedData(feedUrl, options.apiKey);    },    // Optionally, define the schema of an entry.    // It will be overridden by user-defined schema.    schema: async () => z.object({      // ...    })  };}
```

These configuration options can then be set when defining a collection:

```
import { defineCollection, z } from 'astro:content';import myLoader from '../../loader.ts';const blog = defineCollection({  loader: myLoader({    url: "https://api.example.com/posts",    apiKey: "my-secret",  }),  schema: /* ... */});
```

The API for [inline loaders](https://5-0-0-beta.docs.astro.build/en/reference/content-loader-reference/#inline-loaders) is very simple, and is shown above. This section shows the API for defining an object loader.

### The `Loader` object

[Section titled The Loader object](https://5-0-0-beta.docs.astro.build/en/reference/content-loader-reference/#the-loader-object)

The loader object has the following properties:

**Type**: `string`

A unique name for the loader, used in logs and [for conditional loading](https://5-0-0-beta.docs.astro.build/en/reference/integrations-reference/#refreshcontent-option).

**Type**: `(context: [LoaderContext](https://5-0-0-beta.docs.astro.build/en/reference/content-loader-reference/#loadercontext)) => Promise<void>`

An async function that is called at build time to load data and update the store. See [`LoaderContext`](https://5-0-0-beta.docs.astro.build/en/reference/content-loader-reference/#loadercontext) for more information.

**Type**: `ZodSchema | Promise<ZodSchema> | (() => ZodSchema | Promise<ZodSchema>)`

An optional [Zod schema](https://5-0-0-beta.docs.astro.build/en/guides/content-collections/#defining-datatypes-with-zod) that defines the shape of the entries. It is used to both validate the data and also to generate TypeScript types for the collection.

If a function is provided, it will be called at build time before `load()` to generate the schema. You can use this to dynamically generate the schema based on the configuration options or by introspecting an API.

This object is passed to the `load()` method of the loader, and contains the following properties:

**Type**: `string`

The unique name of the collection. This is the key in the `collections` object in the `src/content/config.ts` file.

**Type**: [`DataStore`](https://5-0-0-beta.docs.astro.build/en/reference/content-loader-reference/#datastore)

A database to store the actual data. Use this to update the store with new entries. See [`DataStore`](https://5-0-0-beta.docs.astro.build/en/reference/content-loader-reference/#datastore) for more information.

**Type**: `MetaStore`

A key-value store scoped to the collection, designed for things like sync tokens and last-modified times. This metadata is persisted between builds alongside the collection data but is only available inside the loader.

```
const lastModified = meta.get("lastModified");// ...meta.set("lastModified", new Date().toISOString());
```

**Type**: [`AstroIntegrationLogger`](https://5-0-0-beta.docs.astro.build/en/reference/integrations-reference/#astrointegrationlogger)

A logger that can be used to log messages to the console. Use this instead of `console.log` for more helpful logs that include the loader name in the log message. See [`AstroIntegrationLogger`](https://5-0-0-beta.docs.astro.build/en/reference/integrations-reference/#astrointegrationlogger) for more information.

**Type**: `AstroConfig`

The full, resolved Astro configuration object with all defaults applied. See [the configuration reference](https://5-0-0-beta.docs.astro.build/en/reference/configuration-reference/) for more information.

**Type**: `(props: ParseDataOptions<TData>) => Promise<TData>`

Validates and parses the data according to the collection schema. Pass data to this function to validate and parse it before storing it in the data store.

```
import type { Loader } from "astro/loaders";import { loadFeed } from "./feed.js";export function feedLoader({ url }): Loader {  const feedUrl = new URL(url);  return {    name: "feed-loader",    load: async ({ store, logger, parseData, meta, generateDigest }) => {      logger.info("Loading posts");      const feed = loadFeed(feedUrl);      store.clear();      for (const item of feed.items) {        const data = await parseData({          id: item.guid,          data: item,        });        store.set({          id,          data,        });      }    },  };}
```

**Type**: `(data: Record<string, unknown> | string) => string`

Generates a non-cryptographic content digest of an object or string. This can be used to track if the data has changed by setting [the `digest` field](https://5-0-0-beta.docs.astro.build/en/reference/content-loader-reference/#digest) of an entry.

```
import type { Loader } from "astro/loaders";import { loadFeed } from "./feed.js";export function feedLoader({ url }): Loader {  const feedUrl = new URL(url);  return {    name: "feed-loader",    load: async ({ store, logger, parseData, meta, generateDigest }) => {      logger.info("Loading posts");      const feed = loadFeed(feedUrl);      store.clear();      for (const item of feed.items) {        const data = await parseData({          id: item.guid,          data: item,        });        const digest = generateDigest(data);        store.set({          id,          data,          digest,        });      }    },  };}
```

**Type**: `FSWatcher`

When running in dev mode, this is a filesystem watcher that can be used to trigger updates. See [`ViteDevServer`](https://vite.dev/guide/api-javascript.html#vitedevserver) for more information.

```
return {  name: 'file-loader',  load: async ({ config, store, watcher }) => {    const url = new URL(fileName, config.root);    const filePath = fileURLToPath(url);    await syncData(filePath, store);    watcher?.on('change', async (changedPath) => {      if (changedPath === filePath) {        logger.info(`Reloading data from ${fileName}`);        await syncData(filePath, store);      }    });  },};
```

#### `refreshContextData`

[Section titled refreshContextData](https://5-0-0-beta.docs.astro.build/en/reference/content-loader-reference/#refreshcontextdata)

**Type**: `Record<string, unknown>`

If the loader has been triggered by an integration, this may optionally contain extra data set by that integration. It is only set when the loader is triggered by an integration. See the [`astro:server:setup`](https://5-0-0-beta.docs.astro.build/en/reference/integrations-reference/#refreshcontent-option) hook reference for more information.

```
export function myLoader(options: { url: string }): Loader {  return {    name: "my-loader",    load: async ({ refreshContextData, store, logger }) => {      if(refreshContextData?.webhookBody) {        logger.info("Webhook triggered with body");        processWebhook(store, refreshContextData.webhookBody);      }      // ...    },  };}
```

The data store is a loader’s interface to the content collection data. It is a key-value (KV) store, scoped to the collection, and therefore a loader can only access the data for its own collection.

**Type**: `(key: string) => [DataEntry](https://5-0-0-beta.docs.astro.build/en/reference/content-loader-reference/#dataentry) | undefined`

Get an entry from the store by its ID. Returns `undefined` if the entry does not exist.

```
const existingEntry = store.get("my-entry");
```

The returned object is a [`DataEntry`](https://5-0-0-beta.docs.astro.build/en/reference/content-loader-reference/#dataentry) object.

**Type**: `(entry: [DataEntry](https://5-0-0-beta.docs.astro.build/en/reference/content-loader-reference/#dataentry)) => boolean`

Used after data has been [validated and parsed](https://5-0-0-beta.docs.astro.build/en/reference/content-loader-reference/#parsedata) to add an entry to the store, returning `true` if the entry was set. This returns `false` when the [`digest`](https://5-0-0-beta.docs.astro.build/en/reference/content-loader-reference/#digest) property determines that an entry has not changed and should not be updated.

```
    for (const item of feed.items) {      const data = await parseData({        id: item.guid,        data: item,      });      const digest = generateDigest(data);      store.set({        id,        data,        rendered: {          html: data.description ?? "",        },        digest,      });    }
```

**Type**: `() => Array<[id: string, DataEntry]>`

Get all entries in the collection as an array of key-value pairs.

**Type**: `() => Array<string>`

Get all the keys of the entries in the collection.

**Type**: `() => Array<DataEntry>`

Get all entries in the collection as an array.

**Type**: `(key: string) => void`

Delete an entry from the store by its ID.

**Type**: `() => void`

Clear all entries from the collection.

**Type**: `(key: string) => boolean`

Check if an entry exists in the store by its ID.

This is the type of the object that is stored in the data store. It has the following properties:

**Type**: `string`

An identifier for the entry, which must be unique within the collection. This is used to look up the entry in the store and is the key used with `getEntry` for that collection.

**Type**: `Record<string, unknown>`

The actual data for the entry. When a user accesses the collection, this will have TypeScript types generated according to the collection schema.

It is the loader’s responsibility to use [`parseData`](https://5-0-0-beta.docs.astro.build/en/reference/content-loader-reference/#parsedata) to validate and parse the data before storing it in the data store: no validation is done when getting or setting the data.

**Type**: `string | undefined`

A path to the file that is the source of this entry, relative to the root of the site. This only applies to file-based loaders and is used to resolve paths such as images or other assets.

If not set, then any fields in the schema that use [the `image()` helper](https://5-0-0-beta.docs.astro.build/en/guides/images/#images-in-content-collections) will be treated as [public paths](https://5-0-0-beta.docs.astro.build/en/guides/images/#where-to-store-images) and not transformed.

**Type**: `string | undefined`

The raw body of the entry, if applicable. If the entry includes [rendered content](https://5-0-0-beta.docs.astro.build/en/reference/content-loader-reference/#rendered), then this field can be used to store the raw source. This is optional and is not used internally.

**Type**: `string | undefined`

An optional content digest for the entry. This can be used to check if the data has changed.

When [setting an entry](https://5-0-0-beta.docs.astro.build/en/reference/content-loader-reference/#set), the entry will only update if the digest does not match an existing entry with the same ID.

The format of the digest is up to the loader, but it must be a string that changes when the data changes. This can be done with the [`generateDigest`](https://5-0-0-beta.docs.astro.build/en/reference/content-loader-reference/#generatedigest) function.

**Type**: `RenderedContent | undefined`

Stores an object with an entry’s rendered content and metadata if it has been rendered to HTML. For example, this can be used to store the rendered content of a Markdown entry, or HTML from a CMS.

If this field is provided, then [the `render()` function and `<Content />` component](https://5-0-0-beta.docs.astro.build/en/guides/content-collections/#rendering-body-content) are available to render the entry in a page.

The format of the `RenderedContent` object is:

```
{  /** Rendered HTML string. If present then `render(entry)` will return a component that renders this HTML. */  html: string;  metadata?: {    /** Any images that are present in this entry. Relative to the {@link DataEntry} filePath. */    imagePaths?: Array<string>;    /** Any headings that are present in this file. Returned as `headings` from `render()` */    headings?: MarkdownHeading[];    /** Raw frontmatter, parsed parsed from the file. This may include data from remark plugins. */    frontmatter?: Record<string, any>;    /** Any other metadata that is present in this file. */    [key: string]: unknown;  };}
```
