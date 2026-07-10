# MASTER CURSOR PROMPT — ORGULJARSTVO KVATERNIK

Build a complete, production-ready, premium website for a Croatian organ-building workshop named **Orguljarstvo Kvaternik**.

Read and follow the supplied files:

- `PRD.md`
- `CONTENT.md`
- `IMAGE_MANIFEST.md`
- `siteContent.ts`

The company/workshop is the main brand. Alen Kvaternik should have only a smaller “master organ builder behind the workshop” section. Do not turn this into a personal portfolio.

## Non-negotiable visual direction

Match the approved visual concept:

- luxurious black and charcoal base
- warm wood photography
- subtle gold and bronze accents
- ivory sections for contrast
- Playfair Display headings
- Montserrat body text
- elegant editorial spacing
- premium heritage craftsmanship feel
- slow subtle animations
- no generic startup aesthetic
- no bright blue
- no oversized rounded cards
- no excessive gradients
- no autoplay audio

## Tech

- latest stable Next.js with App Router
- TypeScript
- Tailwind CSS
- shadcn/ui only where it improves quality
- Framer Motion
- React Hook Form
- Zod
- Resend
- Lucide React
- next/image
- next/font

## Required routes

- `/`
- `/o-nama`
- `/orgulje`
- `/usluge`
- `/projekti`
- `/projekti/[slug]`
- `/galerija`
- `/kontakt`
- `/pravila-privatnosti`
- `/impressum`

## Content rules

- Use Croatian content from `CONTENT.md`.
- Centralize editable content in `src/data`.
- Use the temporary images from `IMAGE_MANIFEST.md`.
- Mark all temporary images and placeholder projects in data.
- Never invent years, locations, qualifications, addresses, phone numbers, project names or awards.
- Display placeholders only in development mode where appropriate.
- Keep contact details in one `siteConfig` object.

## Required homepage sections

1. sticky transparent navigation
2. cinematic hero
3. light ivory services section
4. split about/workshop section
5. featured projects
6. four-step process
7. quote/CTA
8. premium footer

## Contact form

The form must work, not only look functional.

Fields:

- ime i prezime
- email
- telefon
- vrsta upita
- lokacija instrumenta
- poruka
- privola
- hidden honeypot

Requirements:

- client and server validation
- Resend integration
- accessible labels
- loading state
- success state
- failure state
- rate limiting
- server-side sanitization
- reply-to user email
- Croatian validation messages
- graceful behavior if env variables are missing

Create:

- `src/app/api/contact/route.ts`
- `src/components/forms/contact-form.tsx`
- `src/lib/contact-schema.ts`
- `src/lib/resend.ts`
- `src/emails/contact-email.tsx`
- `.env.example`

## Required quality

- responsive at 360, 768, 1024, 1440 and 1920 widths
- keyboard accessible
- reduced motion support
- Lighthouse-oriented
- valid metadata on every page
- sitemap and robots
- Open Graph
- JSON-LD without fake business data
- dynamic project pages generated from data
- gallery lightbox with keyboard support
- no hydration errors
- `npm run build` must pass

## Delivery process

First:

1. propose the complete folder structure
2. create design tokens and global styles
3. create data models and content files
4. implement shared layout
5. implement homepage
6. implement inner pages
7. implement contact form
8. implement SEO and polish

After implementation, provide:

- setup instructions
- required env values
- how to replace temporary images
- how to update contact information
- how to add a new project
- remaining placeholder checklist
