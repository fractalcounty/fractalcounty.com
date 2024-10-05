# fractalcounty.com

A minimalist, content-driven personal website built with Astro.

## Project Overview

This project is a personal website featuring:

- Homepage
- Blog (/blog)
- Portfolio page (/projects)
- Social media links collection (/links)

## Key Technologies

- Framework: Astro
- CSS: Tailwind CSS with DaisyUI
- Markdown: MDX
- Language: TypeScript
- Package Manager: bun
- Deployment: Cloudflare Pages (Static)

## Project Structure

Key directories and files:

```txt
fractalcounty.com/
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Head.astro
│   │   └── [etc...]
│   ├── content/
│   │   ├── blog/                       # mdx content for fractalcounty.com/blog
│   │   │   └── example-post/
│   │   │       ├── index.mdx
│   │   │       └── example-image.webp
│   │   ├── projects/                   # mdx content for fractalcounty.com/projects
│   │   └── config.ts                   # schemas for blog and project content objects
│   ├── icons/                          # icons used by astro-icon package
│   ├── layouts/
│   │   └── PageLayout.astro            # global page layout
│   ├── lib/
│   │   └── utils.ts                    # global utility functions
│   ├── pages/
│   │   ├── blog/                       # fractalcounty.com/blog
│   │   │   ├── [...slug].astro
│   │   │   └── index.astro
│   │   ├── projects/                   # fractalcounty.com/projects
│   │   │   └── [...slug].astro
│   │   │   └── index.astro
│   │   ├── links/                      # fractalcounty.com/links
│   │   │   └── index.astro
│   │   ├── index.astro                 # fractalcounty.com (homepage)
│   │   ├── robots.txt.ts
│   │   └── rss.xml.ts
│   ├── consts.ts                       # global constants
│   ├── env.d.ts                        # global references
│   ├── global.css                      # global stylesheet
│   └── types.ts                        # global types
├── public/
│   ├── fonts/
│   │   ├── AlteHaasGroteskBold.woff2
│   │   ├── AlteHaasGroteskRegular.woff2
│   │   └── CommitMono.woff2
│   ├── favicon-dark.svg
│   └── favicon-light.svg
├── astro.config.mjs
├── eslint.config.mjs
├── package.json
└── tailwind.config.mjs
```

## Deployment

This project is configured for deployment on Cloudflare Pages, built directly from the GitHub repository.
