# Canyon Springs website mockup

A clickable mockup of a new site for Canyon Springs Christian Church (Middleton, Idaho), made to help the team pick a direction. Not the live site: that's https://www.canyonspringschristian.com/.

Live mockup: https://escherize.com/canyon-springs-mockup/

## What it shows

- **Real content.** Copy, staff, beliefs, times and photos come from the current site. Farmland photos are USDA NRCS public-domain shots taken near Middleton (`public/photos/SOURCES.txt`).
- **Sermons from YouTube.** `src/data/messages.json` is a snapshot of the channel feed. The real site would refresh it automatically.
- **Events from Church Center.** `src/data/events.json` is a snapshot of the public calendar, minus rentals and internal meetings.
- **Sermon notes from Word files.** Drop `YYYY-MM-DD-name.docx` into `notes-inbox/` and run `npm run notes`. It writes Markdown to `src/content/notes/`, and the sermon page turns the blanks into fill-in fields. The deploy runs it too.
- **A change-request form** (`/request/`). It doesn't send anything yet.

## Run it

```sh
npm install
npm run dev      # http://localhost:4321/canyon-springs-mockup/
npm run build    # static site in dist/
```

Pushing to `main` deploys to GitHub Pages (`.github/workflows/deploy.yml`).

## Where things live

- Church facts (address, times, links): `src/data/site.ts`
- Statement of faith: `src/text/beliefs.md`
- Look and feel: `src/styles/global.css` (Mona Sans; cobalt on white)
