Title: Astro v5.0-beta

URL Source: https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/

Markdown Content:
This guide will help you migrate from Astro v4 to Astro v5-beta.

Need to upgrade an older project to v4 first? See our [older migration guide](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v4/).

The following features are **new/stable in Astro v5.0-beta**:

- The [new content collections](https://5-0-0-beta.docs.astro.build/en/guides/content-collections/) using the [Content Layer API](https://5-0-0-beta.docs.astro.build/en/reference/modules/astro-content/) and [Content Loader API](https://5-0-0-beta.docs.astro.build/en/reference/content-loader-reference/)
- [Server Islands](https://5-0-0-beta.docs.astro.build/en/guides/server-islands/)
- [Type Safe environment variables](https://5-0-0-beta.docs.astro.build/en/guides/environment-variables/#type-safe-environment-variables)
- [On-demand rendering available in `static` mode](https://5-0-0-beta.docs.astro.build/en/guides/on-demand-rendering/) (like the previous `hybrid` mode)

## Start a new v5-beta project

[Section titled Start a new v5-beta project](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#start-a-new-v5-beta-project)

Try the Astro v5-beta in a new project:

- [npm](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#tab-panel-504)
- [pnpm](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#tab-panel-505)
- [Yarn](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#tab-panel-506)

```
npm create astro@latest -- --ref next
```

Update your existing project’s version of Astro and all official integrations to the latest versions using your package manager.

- [npm](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#tab-panel-507)
- [pnpm](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#tab-panel-508)
- [Yarn](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#tab-panel-509)

```
# Upgrade Astro and official integrations togethernpx @astrojs/upgrade beta
```

Astro v5.0 includes [potentially breaking changes](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#breaking-changes), as well as the removal and deprecation of some features.

If your project doesn’t work as expected after upgrading to v5.0, check this guide for an overview of all breaking changes and instructions on how to update your codebase.

See [the Astro changelog](https://github.com/withastro/astro/blob/main/packages/astro/CHANGELOG.md) for full release notes.

## Dependency Upgrades

[Section titled Dependency Upgrades](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#dependency-upgrades)

The minimum supported version of Node.js in Astro v5.0 is `v18.17.1`

#### What should I do?

[Section titled What should I do?](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#what-should-i-do)

Check that both your development environment and your deployment environment are using **Node `18.17.1` or higher**.

1.  Check your local version of Node using:

2.  Check your [deployment environment’s](https://5-0-0-beta.docs.astro.build/en/guides/deploy/) own documentation to verify that they support this version of Node.

    You can specify Node `18.17.1` for your Astro project either in a dashboard configuration setting or a `.nvmrc` file.

Astro 5.0-beta updates to Vite 6.0-beta as the development server and production bundler. Note: Astro v5 will remain in beta until Vite v6 has been released as stable. During this period, The Vite version is pinned and upgraded by Astro manually to prevent unhandled breaking changes.

#### What should I do?

[Section titled What should I do?](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#what-should-i-do-1)

If you are using Vite-specific plugins, configuration, or APIs, check the [Vite CHANGELOG](https://github.com/vitejs/vite/blob/main/packages/vite/CHANGELOG.md#600-beta0-2024-09-12) for their breaking changes and upgrade your project as needed.

Vite’s current beta release has no breaking changes for Astro at this time.

In Astro v4.x, Astro performed internal JSX handling for the `@astrojs/mdx` integration.

Astro v5.0 moves this responsibility to handle and render JSX and MDX to the `@astrojs/mdx` package directly. This means that Astro 5.0 is no longer compatible with older versions of the MDX integration.

#### What should I do?

[Section titled What should I do?](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#what-should-i-do-2)

If your project includes `.mdx` files, you must upgrade `@astrojs/mdx` to the latest version (v4.0.0) so that your JSX can be handled properly by the integration.

If you are using an MDX server renderer with the experimental [Astro Container API](https://5-0-0-beta.docs.astro.build/en/reference/container-reference/) you must update the import to reflect the new location:

```
import mdxRenderer from "astro/jsx/server.js";import mdxRenderer from "@astrojs/mdx/server.js";
```

The following features are considered legacy features. They should function normally but are no longer recommended and are in maintenance mode. They will see no future improvements and documentation will not be updated. These features will eventually be deprecated, and then removed entirely.

### Legacy: v2.0 Content Collections API

[Section titled Legacy: v2.0 Content Collections API](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#legacy-v20-content-collections-api)

In Astro 4.x, content collections were defined, queried, and rendered using [the Content Collections API first introduced in Astro v2.0](https://astro.build/blog/introducing-content-collections/).

Astro 5.0 introduces a new version of content collections using the Content Layer API which brings several performance improvements and added capabilities. While old (legacy) and new (Content Layer API) collections can continue exist together in this release, there are potentially breaking changes to existing legacy collections.

#### What should I do?

[Section titled What should I do?](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#what-should-i-do-3)

We recommend [converting any existing collections to the new Content Layer API](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#updating-existing-collections) as soon as you are able and making any new collections using the Content Layer API.

If you are unable to convert your collections, then please consult the [legacy collections breaking changes](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#breaking-changes-to-legacy-content-and-data-collections) to see whether your existing collections are affected and require updating.

If you are unable to make any changes to your collections at this time, you can [enable the `legacy.collections` flag](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#enabling-the-legacycollections-flag) which will allow you to keep your colletions in their current state until the legacy flag is no longer supported.

##### Updating existing collections

[Section titled Updating existing collections](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#updating-existing-collections)

See the instructions below for converting an existing content collection with Markdown, MDX, Markdoc, or JSON entries to use the Content Layer API.

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

##### Enabling the `legacy.collections` flag

[Section titled Enabling the legacy.collections flag](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#enabling-the-legacycollections-flag)

If you are not yet ready to update your existing collections, you can enable the [`legacy.collections`](https://5-0-0-beta.docs.astro.build/en/reference/configuration-reference/#legacycollections) flag and your existing collections will continue to function as before.

The following deprecated features are no longer supported and are no longer documented. Please update your project accordingly.

Some deprecated features may temporarily continue to function until they are completely removed. Others may silently have no effect, or throw an error prompting you to update your code.

### Deprecated: `Astro.glob()`

[Section titled Deprecated: Astro.glob()](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#deprecated-astroglob)

In Astro v4.x, you could use `Astro.glob()` in your `.astro` components to query multiple files in your project. This had some limitations (where it could be used, performance, etc.), and using querying functions from the Content Collections API or Vite’s own `import.meta.glob()` often provided more function and flexibility.

Astro 5.0 deprecates `Astro.glob()` in favor of using `getCollection()` to query your collections, and `import.meta.glob()` to query other source files in your project.

#### What should I do?

[Section titled What should I do?](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#what-should-i-do-4)

Replace all use of `Astro.glob()` with `import.meta.glob()`. Note that `import.meta.glob()` no longer returns a `Promise`, so you may have to update your code accordingly. You should not require any updates to your [glob patterns](https://5-0-0-beta.docs.astro.build/en/guides/imports/#glob-patterns).

```
---const posts = await Astro.glob('./posts/*.md');const posts = Object.values(import.meta.glob('./posts/*.md', { eager: true }));---{posts.map((post) => <li><a href={post.url}>{post.frontmatter.title}</a></li>)}
```

Where appropriate, consider using [content collections](https://5-0-0-beta.docs.astro.build/en/guides/content-collections/) to organize your content, which has its own newer, more performant querying functions.

You may also wish to consider using glob packages from NPM, such as [`fast-glob`](https://www.npmjs.com/package/fast-glob).

### Deprecated: `functionPerRoute` (Adapter API)

[Section titled Deprecated: functionPerRoute (Adapter API)](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#deprecated-functionperroute-adapter-api)

In Astro v4.x, you could opt into creating a separate file for each route defined in the project, mirroring your `src/pages/` directory in the build folder. By default, Astro emitted a single `entry.mjs` file, which was responsible for emitting the rendered page on each request.

Astro v5.0 removes the option to opt out of the default behavior. This behavior is now standard, and non-configurable.

Remove the `functionPerRoute` property from your `adapterFeatures` configuration. It is no longer available.

```
export default function createIntegration() {  return {    name: '@matthewp/my-adapter',    hooks: {      'astro:config:done': ({ setAdapter }) => {        setAdapter({          name: '@matthewp/my-adapter',          serverEntrypoint: '@matthewp/my-adapter/server.js',          adapterFeatures: {              functionPerRoute: true          }        });      },    },  };}
```

The following features have now been entirely removed from the code base and can no longer be used. Some of these features may have continued to work in your project even after deprecation. Others may have silently had no effect.

Projects now containing these removed features will be unable to build, and there will no longer be any supporting documentation prompting you to remove these features.

### Removed: The Lit integration

[Section titled Removed: The Lit integration](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#removed-the-lit-integration)

In Astro v4.x, [Lit](https://lit.dev/) was a core-maintained framework library through the `@astrojs/lit` package.

Astro v5.0 removes the integration and it will not receive further updates for compatibility with 5.x and above.

#### What should I do?

[Section titled What should I do?](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#what-should-i-do-5)

You can continue to use Lit for client components by adding a client-side script tag. For example:

```
<script>  import "../components/MyTabs";</script><my-tabs title="These are my tabs">...</my-tabs>
```

If you’re interested in maintaining a Lit integration yourself, you may wish to use the [last published version of `@astrojs/lit`](https://github.com/withastro/astro/tree/astro%404.13.0/packages/integrations/lit) as a starting point and upgrade the relevant packages.

### Removed: `hybrid` rendering mode

[Section titled Removed: hybrid rendering mode](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#removed-hybrid-rendering-mode)

In Astro v4.x, Astro provided three rendering `output` rendering modes: `'static'`, `'hybrid'`, and `'server'`

Astro v5.0 merges the `output: 'hybrid'` and `output: 'static'` configurations into one single configuration (now called `'static'`) that works the same way as the previous hybrid option.

It is no longer necessary to specify `output: 'hybrid'` in your Astro config to use server-rendered pages. The new `output: 'static'` has this capability included.

Astro will now automatically allow you to opt out of prerendering in your static site with no change to your output configuration required. Any page route or endpoint can include `export const prerender = false` to be server-rendered on demand, while the rest of your site is statically generated.

#### What should I do?

[Section titled What should I do?](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#what-should-i-do-6)

If your project used hybrid rendering, you must now remove the `output: 'hybrid'` option from your Astro config as it no longer exists. However, no other changes to your project are required, and you should have no breaking changes. The previous `'hybrid'` behavior is now the default, under a new name `'static'`.

```
import { defineConfig } from "astro/config";export default defineConfig({  output: 'hybrid',});
```

If you were using the `output: 'static'` (default) option, you can continue to use it as before. By default, all of your pages will continue to be prerendered and you will have a completely static site. You should have no breaking changes to your project.

An adapter is still required to deploy an Astro project with any server-rendered pages, no matter which `output` mode your project uses. Failure to include an adapter will result in a warning in development and an error at build time.

### Removed: Squoosh image service

[Section titled Removed: Squoosh image service](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#removed-squoosh-image-service)

In Astro 4.x, you could configure `image.service: squooshImageService()` to use Squoosh to transform your images instead of Sharp. However, the underlying library `libsquoosh` is no longer maintained and has memory and performance issues.

Astro 5.0 removes the Squoosh image optimization service entirely.

#### What should I do?

[Section titled What should I do?](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#what-should-i-do-7)

To switch to the built-in Sharp image service, remove the `squooshImageService` import from your Astro config. By default, you will use Sharp for `astro:assets`.

```
import { squooshImageService } from "astro/config";import { defineConfig } from "astro/config";export default defineConfig({ image: {   service: squooshImageService() }});
```

If you are using a strict package manager like `pnpm`, you may need to install the `sharp` package manually to use the Sharp image service, even though it is built into Astro by default.

If your adapter does not support Astro’s built-in Sharp image optimization, you can [configure a no-op image service](https://5-0-0-beta.docs.astro.build/en/guides/images/#configure-no-op-passthrough-service) to allow you to use the `<Image />` and `<Picture />` components.

Alternatively, you may wish to consider [a community-maintained Squoosh image service](https://github.com/Princesseuh/astro-image-service-squoosh) if you are unable to use the Sharp image service.

If your adapter previously precised its compatibility status with Squoosh, you should now remove this information from your adapter configuration.

```
supportedAstroFeatures: {  assets: {    isSquooshCompatible: true  }}
```

### Removed: some public-facing types

[Section titled Removed: some public-facing types](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#removed-some-public-facing-types)

In Astro v4.x, `@types/astro.ts` exposed all types publicly to users, whether or not they were still actively used or only intended for internal use.

Astro v5.0 refactors this file to remove outdated and internal types. This refactor brings improvements to your editor (e.g. faster completions, lower memory usage, and more relevant completion options). However, this refactor may cause errors in some projects that have been relying on types that are no longer available to the public.

#### What should I do?

[Section titled What should I do?](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#what-should-i-do-8)

Remove any types that now cause errors in your project as you no longer have access to them. These are mostly APIs that have previously been deprecated and removed, but may also include types that are now internal.

### Experimental Flags

[Section titled Experimental Flags](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#experimental-flags)

The following experimental flags have been removed in Astro v5.0 and these features are available for use:

- `env`
- `serverIslands`

Additionally, the following experimental flags have been removed and **are now the default or recommended behavior in Astro v5.0**.

- `directRenderScript` (See below for breaking changes to [default `<script>` behavior](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#script-tags-are-rendered-directly-as-declared).)
- `globalRoutePriority` (See below for breaking changes to [default route priority order](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#route-priority-order-for-injected-routes-and-redirects).)
- `contentLayer` (See guidance for [upgrading existing content collections](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#legacy-v20-content-collections-api) to the new, preferred Content Layer API.)

The following experimental flags have been removed and **their corresponding features are not part of Astro v5.0**.

- `contentCollectionsCache`

Remove these experimental flags if you were previously using them, and move your `env` configuration to the root of your Astro config:

```
import { defineConfig } from 'astro/config';export default defineConfig({  experimental: {    directRenderScript: true,    globalRoutePriority: true,    contentLayer: true,    serverIslands: true,    contentCollectionsCache: true,    env: {      schema: {...}    }  },  env: {      schema: {...}  }})
```

These features are all available by default in Astro v5.0.

## Changed Defaults

[Section titled Changed Defaults](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#changed-defaults)

Some default behavior has changed in Astro v5.0 and your project code may need updating to account for these changes.

In most cases, the only action needed is to review your existing project’s deployment and ensure that it continues to function as you expect, making updates to your code as necessary. In some cases, there may be a configuration setting to allow you to continue to use the previous default behavior.

### CSRF protection is now set by default

[Section titled CSRF protection is now set by default](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#csrf-protection-is-now-set-by-default)

In Astro v4.x, The default value of `security.checkOrigin` was `false`. Previously, you had to explicitly set this value to `true` to enable Cross-Site Request Forgery (CSRF) protection.

Astro v5.0 changes the default value of this option to `true`, and will automatically check that the “origin” header matches the URL sent by each request in on-demand rendered pages.

#### What should I do?

[Section titled What should I do?](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#what-should-i-do-9)

If you had previously configured `security.checkOrigin: true`, you no longer need this line in your Astro config. This is now the default.

To disable this behavior, you must explicitly set `security.checkOrigin: false`.

```
export default defineConfig({  output: "server",  security: {    checkOrigin: false  }})
```

### Route priority order for injected routes and redirects

[Section titled Route priority order for injected routes and redirects](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#route-priority-order-for-injected-routes-and-redirects)

In Astro v4.x, `experimental.globalRoutePriority` was an optional flag that ensured that injected routes, file-based routes, and redirects were all prioritized using the [route priority order rules for all routes](https://5-0-0-beta.docs.astro.build/en/guides/routing/#route-priority-order). This allowed more control over routing in your project by not automatically prioritizing certain kinds of routes and standardizing the route priority order.

Astro v5.0 removes this experimental flag and makes this the new default behavior in Astro: redirects and injected routes are now prioritized equally alongside file-based project routes.

Note that this was already the default behavior in Starlight, and should not affect updated Starlight projects.

#### What should I do?

[Section titled What should I do?](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#what-should-i-do-10)

If your project includes injected routes or redirects, please check that your routes are building page URLs as expected. An example of the new expected behavior is shown below.

In a project containing the following routes:

- File-based route: `/blog/post/[pid]`
- File-based route: `/[page]`
- Injected route: `/blog/[...slug]`
- Redirect: `/blog/tags/[tag] -> /[tag]`
- Redirect: `/posts -> /blog`

The following URLs will be built (instead of following the route priority order of Astro v4.x):

- `/blog/tags/astro` is built by the redirect to `/tags/[tag]` (instead of the injected route `/blog/[...slug]`)
- `/blog/post/0` is built by the file-based route `/blog/post/[pid]` (instead of the injected route `/blog/[...slug]`)
- `/posts` is built by the redirect to `/blog` (instead of the file-based route `/[page]`)

In the event of route collisions, where two routes of equal route priority attempt to build the same URL, Astro will log a warning identifying the conflicting routes.

### `<script>` tags are rendered directly as declared

[Section titled &lt;script&gt; tags are rendered directly as declared](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#script-tags-are-rendered-directly-as-declared)

In Astro v4.x, `experimental.directRenderScript` was an optional flag to directly render `<scripts>` as declared in `.astro` files (including existing features like TypeScript, importing `node_modules`, and deduplicating scripts). This strategy prevented scripts from being executed in places where they were not used.

Astro 5.0 removes this experimental flag and makes this the new default behavior in Astro: scripts are no longer hoisted to the `<head>`, multiple scripts on a page are no longer bundled together, and a `<script>` tag may interfere with CSS styling.

#### What should I do?

[Section titled What should I do?](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#what-should-i-do-11)

Please review your `<script>` tags and ensure they behave as desired.

## Breaking Changes

[Section titled Breaking Changes](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#breaking-changes)

The following changes are considered breaking changes in Astro v5.0. Breaking changes may or may not provide temporary backwards compatibility. If you were using these features, you may have to update your code as recommended in each entry.

### Renamed: `<ViewTransitions />` component

[Section titled Renamed: &lt;ViewTransitions /&gt; component](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#renamed-viewtransitions--component)

In Astro 4.x, Astro’s View Transitions API included a `<ViewTransitions />` router component to enable client-side routing, page transitions, and more.

Astro 5.0 renames this component to `<ClientRouter />` to clarify the role of the component within the API. This makes it more clear that the features you get from Astro’s `<ClientRouter />` routing component are slightly different from the native CSS-based MPA router.

No functionality has changed. This component has only changed its name.

#### What should I do?

[Section titled What should I do?](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#what-should-i-do-12)

Replace all occurances of the `ViewTransitions` import and component with `ClientRouter`:

```
import { ViewTransitions } from 'astro:transitions';import { ClientRouter } from 'astro:transitions';<html>  <head>    ...   <ViewTransitions />   <ClientRouter />  </head></html>
```

### Changed: TypeScript configuration

[Section titled Changed: TypeScript configuration](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#changed-typescript-configuration)

In Astro v4.x, Astro relied on a `src/env.d.ts` file for type inferencing and defining modules for features that relied on generated types.

Astro 5.0 instead uses a `.astro/types/d.ts` file for type inferencing, and now recommends setting `include` and `exclude` in `tsconfig.json` to benefit from Astro types and avoid checking built files.

Running `astro sync` no longer creates, nor updates, `src/env.d.ts` as it is not required for type-checking standard Astro projects.

#### What should I do?

[Section titled What should I do?](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#what-should-i-do-13)

To update your project to Astro’s recommended TypeScript settings, add the following `include` and `exclude` properties to your existing `tsconfig.json`:

```
{  "extends": "astro/tsconfigs/base",  "include": [".astro/types.d.ts", "**/*"],  "exclude": ["dist"]}
```

Note that `src/env.d.ts` is only necessary if you have added custom configurations, or if you’re not using a `tsconfig.json` file.

### Changed: `compiledContent()` is now an async function

[Section titled Changed: compiledContent() is now an async function](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#changed-compiledcontent-is-now-an-async-function)

In Astro 4.x, top level await was included in Markdown modules. This caused some issues with custom image services and images inside Markdown, causing Node to suddenly exit with no error message.

Astro 5.0 makes the `compiledContent()` property on Markdown import an async function, requiring an `await` to resolve the content.

#### What should I do?

[Section titled What should I do?](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#what-should-i-do-14)

Update your code to use `await` when calling `compiledContent()`.

```
---import * as myPost from "../blog/post.md";const content = myPost.compiledContent();const content = await myPost.compiledContent();---<Fragment set:html={content} />
```

### Changed: `astro:content` can no longer be used on the client

[Section titled Changed: astro:content can no longer be used on the client](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#changed-astrocontent-can-no-longer-be-used-on-the-client)

In Astro 4.x, it was possible to access the `astro:content` module on the client.

Astro 5.0 removes this access as it was never intentionally exposed for client use. Using `astro:content` this way had limitations and bloated client bundles.

#### What should I do?

[Section titled What should I do?](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#what-should-i-do-15)

If you are currently currently using `astro:content` in the client, pass the data you need through props to your client components instead:

```
---import { getCollection } from 'astro:content';import ClientComponent from '../components/ClientComponent';const posts = await getCollection('blog');const postsData = posts.map(post => post.data);---<ClientComponent posts={postsData} />
```

### Renamed: Shiki `css-variables` theme color token names

[Section titled Renamed: Shiki css-variables theme color token names](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#renamed-shiki-css-variables-theme-color-token-names)

In Astro v4.x, the Shiki `css-variables` theme used the `--astro-code-color-text` and `--astro-code-color-background` tokens for styling the foreground and background colors of code blocks respectively.

Astro v5.0 renames them to `--astro-code-foreground` and `--astro-code-background` respectively to better align with the Shiki v1 defaults.

#### What should I do?

[Section titled What should I do?](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#what-should-i-do-16)

You can perform a global find and replace in your project to migrate to the new token names.

```
:root {  --astro-code-color-text: #000;  --astro-code-color-background: #fff;  --astro-code-foreground: #000;  --astro-code-background: #fff;}
```

### Changed: internal Shiki rehype plugin for highlighting code blocks

[Section titled Changed: internal Shiki rehype plugin for highlighting code blocks](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#changed-internal-shiki-rehype-plugin-for-highlighting-code-blocks)

In Astro 4.x, Astro’s internal Shiki rehype plugin highlighted code blocks as HTML.

Astro 5.0 updates this plugin to highlight code blocks as hast. This allows a more direct Markdown and MDX processing and improves the performance when building the project. However, this may cause issues with existing Shiki transformers.

#### What should I do?

[Section titled What should I do?](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#what-should-i-do-17)

If you are using Shiki transformers passed to `markdown.shikiConfig.transformers`, you must make sure they do not use the `postprocess` hook. This hook no longer runs on code blocks in `.md` and `.mdx` files. (See [the Shiki documentation on transformer hooks](https://shiki.style/guide/transformers#transformer-hooks) for more information).

Code blocks in `.mdoc` files and Astro’s built-in `<Code />` component do not use the internal Shiki rehype plugin and are unaffected.

### Changed: Automatic `charset=utf-8` behavior for Markdown and MDX pages

[Section titled Changed: Automatic charset=utf-8 behavior for Markdown and MDX pages](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#changed-automatic-charsetutf-8-behavior-for-markdown-and-mdx-pages)

In Astro 4.0, Markdown and MDX pages (located in `src/pages/`) automatically responded with `charset=utf-8` in the `Content-Type` header, which allowed rendering non-ASCII characters in your pages.

Astro 5.0 updates the behaviour to add the `<meta charset="utf-8">` tag instead, and only for pages that do not use Astro’s special `layout` frontmatter property. Similarly for MDX pages, Astro will only add the tag if the MDX content does not import a wrapping `Layout` component.

If your Markdown or MDX pages use the `layout` frontmatter property, or if the MDX page content imports a wrapping `Layout` component, then the HTML encoding will be handled by the designated layout component instead, and the `<meta charset="utf-8">` tag will not be added to your page by default.

#### What should I do?

[Section titled What should I do?](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#what-should-i-do-18)

If you require `charset=utf-8` to render your page correctly, make sure that your layout components contain the `<meta charset="utf-8">` tag. You may need to add this if you have not already done so.

### Changed: Astro-specific metadata attached in remark and rehype plugins

[Section titled Changed: Astro-specific metadata attached in remark and rehype plugins](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#changed-astro-specific-metadata-attached-in-remark-and-rehype-plugins)

In Astro 4.x, the Astro-specific metadata attached to `vfile.data` in remark and rehype plugins was attached in different locations with inconsistent names.

Astro 5 cleans up the API and the metadata is now renamed as below:

- `vfile.data.__astroHeadings` -\> `vfile.data.astro.headings`
- `vfile.data.imagePaths` -\> `vfile.data.astro.imagePaths`

The types of `imagePaths` has also been updated from `Set<string>` to `string[]`. The `vfile.data.astro.frontmatter` metadata is left unchanged.

#### What should I do?

[Section titled What should I do?](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#what-should-i-do-19)

While we don’t consider these APIs public, they can be accessed by remark and rehype plugins that want to re-use Astro’s metadata. If you are using these APIs, make sure to access them in the new locations.

### Changed: image endpoint configuration

[Section titled Changed: image endpoint configuration](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#changed-image-endpoint-configuration)

In Astro 4.x, you could set an endpoint in your `image` configuration to use for image optimization.

Astro 5.0 allows you to customize a `route` and `entrypoint` of the `image.endpoint` config. This can be useful in niche situations where the default route `/_image` conflicts with an existing route or your local server setup.

#### What should I do?

[Section titled What should I do?](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#what-should-i-do-20)

If you had previously customized `image.endpoint`, move this endpoint to the new `endpoint.entrypoint` property. Optionally, you may customize a `route`:

```
import { defineConfig } from "astro/config";defineConfig({  image: {    endpoint: './src/image-endpoint.ts',    endpoint: {      route: "/image",      entrypoint: "./src/image_endpoint.ts"    }  },})
```

### Changed: `build.client` and `build.server` resolve behavior

[Section titled Changed: build.client and build.server resolve behavior](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#changed-buildclient-and-buildserver-resolve-behavior)

In Astro v4.x, the `build.client` and `build.server` options were documented to resolve relatively from the `outDir` option, but it didn’t always work as expected.

Astro 5.0 fixes the behavior to correctly resolve from the `outDir` option. For example, if `outDir` is set to `./dist/nested/`, then by default:

- `build.client` will resolve to `<root>/dist/nested/client/`
- `build.server` will resolve to `<root>/dist/nested/server/`

Previously the values were incorrectly resolved:

- `build.client` was resolved to `<root>/dist/nested/dist/client/`
- `build.server` was resolved to `<root>/dist/nested/dist/server/`

#### What should I do?

[Section titled What should I do?](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#what-should-i-do-21)

If you were relying on the previous build paths, make sure that your project code is updated to the new build paths.

### Changed: Dependencies are no longer processed by Vite

[Section titled Changed: Dependencies are no longer processed by Vite](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#changed-dependencies-are-no-longer-processed-by-vite)

In Astro 4.x, locally-linked dependencies (e.g. `npm link`, in a monorepo, etc) were able to use Vite features like TypeScript when imported by the Astro config file.

Astro 5 updates the Astro config loading flow to ignore processing locally-linked dependencies with Vite. Instead, these dependencies will be normally imported by the Node.js runtime the same way as other dependencies from `node_modules`.

This change was made as the previous behavior caused confusion among integration authors who tested against a package that worked locally, but not when published. It also restricted using CJS-only dependencies because Vite required the code to be ESM. Therefore, Astro’s behavior has now changed to ignore processing any type of dependencies by Vite.

#### What should I do?

[Section titled What should I do?](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#what-should-i-do-22)

Make sure your locally-linked dependencies are built to JS before running your Astro project. Then, the config loading should work as before.

### Changed: URLs returned by `paginate()`

[Section titled Changed: URLs returned by paginate()](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#changed-urls-returned-by-paginate)

In Astro v4.x, the URL returned by `paginate()` (e.g. `page.url.next`, `page.url.first`, etc.) did not include the value set for `base` in your Astro config. You had to manually prepend your configured value for `base` to the URL path.

Astro 5.0 automatically includes the `base` value in `page.url`.

#### What should I do?

[Section titled What should I do?](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#what-should-i-do-23)

If you are using the `paginate()` function for these URLs, remove any existing `base` value as it is now added for you:

```
---export async function getStaticPaths({ paginate }) {  const astronautPages = [{    astronaut: 'Neil Armstrong',  }, {    astronaut: 'Buzz Aldrin',  }, {    astronaut: 'Sally Ride',  }, {    astronaut: 'John Glenn',  }];  return paginate(astronautPages, { pageSize: 1 });}const { page } = Astro.props;// `base: /'docs'` configured in `astro.config.mjs`const prev = "/docs" + page.url.prev;const prev = page.url.prev;---<a id="prev" href={prev}>Back</a>
```

### Changed: non-boolean HTML attribute values

[Section titled Changed: non-boolean HTML attribute values](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#changed-non-boolean-html-attribute-values)

In Astro v4.x, non-[boolean HTML attributes](https://developer.mozilla.org/en-US/docs/Glossary/Boolean/HTML) may not have included their values when rendered to HTML.

Astro v5.0 renders the values explicitly as `="true"` or `="false"`, matching proper attribute handling in browsers.

In the following `.astro` examples, only `allowfullscreen` is a boolean attribute:

```
<!-- `allowfullscreen` is a boolean attribute --><p allowfullscreen={true}></p><p allowfullscreen={false}></p><!-- `inherit` is *not* a boolean attribute --><p inherit={true}></p><p inherit={false}></p><!-- `data-*` attributes are not boolean attributes --><p data-light={true}></p><p data-light={false}></p>
```

Astro v5.0 now preserves the full data attribute with its value when rendering the HTML of non-boolean attributes:

```
<p allowfullscreen></p><p></p><p inherit="true"></p><p inherit></p><p inherit="false"></p><p data-light></p><p data-light="true"></p><p></p><p data-light="false"></p>
```

#### What should I do?

[Section titled What should I do?](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#what-should-i-do-24)

If you rely on attribute values, for example, to locate elements or to conditionally render, update your code to match the new non-boolean attribute values:

```
el.getAttribute('inherit') === ''el.getAttribute('inherit') === 'false'el.hasAttribute('data-light')el.dataset.light === 'true'
```

### Changed: adding values to `context.locals`

[Section titled Changed: adding values to context.locals](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#changed-adding-values-to-contextlocals)

In Astro 4.x, it was possible to completely replace the entire `locals` object in middleware, API endpoints, and pages when adding new values.

Astro 5.0 requires you to append values to the existing `locals` object without deleting it. Locals in middleware, API endpoints, and pages, can no longer be completely overridden.

#### What should I do?

[Section titled What should I do?](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#what-should-i-do-25)

Where you previously were overwriting the object, you must now instead assign values to it:

```
ctx.locals = {Object.assign(ctx.locals, {  one: 1,  two: 2}})
```

### Changed: `params` no longer decoded

[Section titled Changed: params no longer decoded](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#changed-params-no-longer-decoded)

In Astro v4.x, `params` passed to `getStaticPath()` were automatically decoded using `decodeURIComponent`.

Astro v5.0 no longer decodes the value of `params` passed to `getStaticPaths`. You must manually decode them yourself if needed.

#### What should I do?

[Section titled What should I do?](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#what-should-i-do-26)

If you were previously relying on the automatic decoding, use `decodeURI` when passing `params`.

```
---export function getStaticPaths() {  return [    { params: { id: "%5Bpage%5D" } },    { params: { id: decodeURI("%5Bpage%5D") } },  ]}const { id } = Astro.params;---
```

Note that the use of [`decodeURIComponent`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent)) is discouraged for `getStaticPaths` because it decodes more characters than it should, for example `/`, `?`, `#` and more.

### Changed: `RouteData` type replaced by `IntegrationsRouteData` (Integrations API)

[Section titled Changed: RouteData type replaced by IntegrationsRouteData (Integrations API)](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#changed-routedata-type-replaced-by-integrationsroutedata-integrations-api)

In Astro v4.x, the `entryPoints` type inside the `astro:build:ssr` and `astro.build.done` hooks was `RouteData`.

Astro v5.0 the `entryPoints` type is now `IntegrationRouteData`, which contains a subset of the `RouteData` type. The fields `isIndex` and `fallbackRoutes` were removed.

#### What should I do?

[Section titled What should I do?](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#what-should-i-do-27)

Update your adapter to change the type of `entryPoints` from `RouteData` to `IntegrationRouteData`.

```
import type {RouteData} from 'astro';import type {IntegrationRouteData} from "astro"function useRoute(route: RouteData) {function useRoute(route: IntegrationRouteData) {}
```

### Changed: `distURL` is now an array (Integrations API)

[Section titled Changed: distURL is now an array (Integrations API)](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#changed-disturl-is-now-an-array-integrations-api)

In Astro v4.x, `RouteData.distURL` was `undefined` or a `URL`

Astro v5.0 updates the shape of `IntegrationRouteData.distURL` to be `undefined` or an array of `URL`s. This fixes a previous error because a route can generate multiple files on disk, especially when using dynamic routes such as `[slug]` or `[...slug]`.

#### What should I do?

[Section titled What should I do?](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#what-should-i-do-28)

Update your code to handle `IntegrationRouteData.distURL` as an array.

```
if (route.distURL) {  if (route.distURL.endsWith('index.html')) {    // do something  }  for (const url of route.distURL) {    if (url.endsWith('index.html')) {      // do something    }  }}
```

### Changed: Arguments passed to `app.render()` (Adapter API)

[Section titled Changed: Arguments passed to app.render() (Adapter API)](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#changed-arguments-passed-to-apprender-adapter-api)

In Astro 4.x, The Adapter API method `app.render()` could receive three arguments: a mandatory `request`, an object of options or a `routeData` object, and `locals`.

Astro 5.0 combines these last two arguments into a single options argument named `renderOptions`.

#### What should I do?

[Section titled What should I do?](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#what-should-i-do-29)

Pass an object as the second argument to `app.render()`, which can include `routeData` and `locals` as properties.

```
const response = await app.render(request, routeData, locals);const response = await app.render(request, {routeData, locals});
```

### Changed: Properties on `supportedAstroFeatures` (Adapter API)

[Section titled Changed: Properties on supportedAstroFeatures (Adapter API)](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#changed-properties-on-supportedastrofeatures-adapter-api)

In Astro 4.x, `supportedAstroFeatures`, which allows adapter authors to specify which features their integration supports, included an `assets` property to specify which of Astro’s image services were supported.

Astro 5.0 replaces this property with a dedicated `sharpImageService` property, used to determine whether the adapter is compatible with the built-in sharp image service.

v5.0 also adds a new `limited` value for the different properties of `supportedAstroFeatures` for adapters, which indicates that the adapter is compatible with the feature, but with some limitations. This is useful for adapters that support a feature, but not in all cases or with all options.

Additionally, the value of the different properties on `supportedAstroFeatures` for adapters can now be objects, with `support` and `message` properties. The content of the `message` property will show a helpful message in the Astro CLI when the adapter is not compatible with a feature. This is notably useful with the new `limited` value, to explain to the user why support is limited.

#### What should I do?

[Section titled What should I do?](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#what-should-i-do-30)

If you were using the `assets` property, remove this as it is no longer available. To specify that your adapter supports the built-in sharp image service, replace this with `sharpImageService`.

You may also wish to update your supported features with the new `limited` option and include a message about your adapter’s support.

```
supportedAstroFeatures: {  assets: {    supportKind: "stable",    isSharpCompatible: true,    isSquooshCompatible: true,  },  sharpImageService: {    support: "limited",    message: 'This adapter supports the built-in sharp image service, but with some limitations.'  }}
```

### Removed: Deprecated definition shape for dev toolbar apps (Dev Toolbar API)

[Section titled Removed: Deprecated definition shape for dev toolbar apps (Dev Toolbar API)](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#removed-deprecated-definition-shape-for-dev-toolbar-apps-dev-toolbar-api)

In Astro 4.x, when building a dev toolbar app, it was still possible to use the previously deprecated `addDevToolbarApp(string);` signature. The `id`, `title`, and `icon` properties to define the app were then made available through the default export of the app’s `entrypoint`.

Astro 5.0 completely removes this option entirely in favor of the current object shape when defining a dev toolbar app in an integration that’s more intuitive and allows Astro to provide better errors when toolbar apps fail to load correctly.

#### What should I do?

[Section titled What should I do?](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#what-should-i-do-31)

If you were using the deprecated shape, update your dev toolbar app to use the new shape:

```
// Old shapeaddDevToolbarApp("./my-app.js");// New shapeaddDevToolbarApp({  id: "my-app",  name: "My App",  icon: "<svg>...</svg>",  entrypoint: "./my-app.js",});
```

```
export default {  id: 'my-dev-toolbar-app',  title: 'My Dev Toolbar App',  icon: '🚀',  init() {    // ...  }}
```

Know a good resource for Astro v5.0? [Edit this page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/upgrade-to/v5.mdx) and add a link below!

Please check [Astro’s issues on GitHub](https://github.com/withastro/astro/issues/) for any reported issues, or to file an issue yourself.

#### What should I do?

[Section titled What should I do?](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/#what-should-i-do-32)

In most cases, ensuring that your locally-linked dependencies are built to JS before running the Astro project, the config loading should work as before.
