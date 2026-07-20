// Content collections: instead of one long HTML file with every project's
// markup inlined, each project/publication is its own Markdown file with
// typed "frontmatter" (the --- block at the top). Astro validates that
// frontmatter against the `schema` below at build time — get a field wrong
// (wrong type, missing required key) and the build fails with a clear error
// instead of silently rendering something broken. This is the seam where
// Phase 2 content work happens: adding a project becomes "add a .md file",
// not "edit HTML in five places."
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    cover: z.string(),
    coverAlt: z.string(),
    tags: z.array(z.string()),
    period: z.string(),
    links: z
      .object({
        github: z.string().url().optional(),
        demo: z.string().url().optional(),
      })
      .optional(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

const publications = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/publications' }),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    venue: z.string(),
    status: z.enum(['submitted', 'in-prep', 'published', 'thesis']),
    date: z.coerce.date(),
    link: z.string().url().optional(),
  }),
});

export const collections = { projects, publications };
