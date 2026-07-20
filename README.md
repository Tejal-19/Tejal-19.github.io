# Tejal Bedmutha — Personal Site

Robotics researcher portfolio: about, experience, projects, publications,
skills, education, and an interactive A* path-planning demo. Built with
[Astro](https://astro.build) as a fully static site.

## Structure

```
src/
  content/
    projects/       — one Markdown file per project (frontmatter + write-up)
    publications/    — one Markdown file per publication (frontmatter + abstract)
  content.config.ts  — typed schemas for the collections above
  data/              — plain arrays for experience/skills/education (no detail pages needed)
  components/        — Nav, Hero, Timeline, SkillsGrid, ProjectCard, PublicationCard, ...
  lib/pathPlanning/  — the A* algorithm + canvas demo behind the "Lab" section
  pages/             — routes: /, /projects, /projects/[slug], /publications
public/              — served as-is: favicons, resume PDFs, project images
```

## Adding content

- **New project**: add a `.md` file to `src/content/projects/` with the
  frontmatter fields defined in `src/content.config.ts`, plus a write-up in
  the body. It'll automatically appear on `/projects` and get its own
  `/projects/<filename>` page.
- **New publication**: same idea, in `src/content/publications/`.
- **Experience / skills / education**: edit the arrays in `src/data/`.

## Development

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs to dist/
npm run preview   # serve the production build locally
```

## Deployment

Pushing to `master` triggers `.github/workflows/deploy.yml`, which builds
the site and publishes it via GitHub Pages (Actions-based deployment, not
branch-based) — see the repo's Settings → Pages, source must be set to
"GitHub Actions".

## License

MIT — see [LICENSE](./LICENSE).
