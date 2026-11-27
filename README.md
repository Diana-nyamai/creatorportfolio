# Ndinda Codes

Diana Ndinda’s creator portfolio. The homepage brings together software engineering, Reels, brand work, and collaboration inquiries. The dedicated media kit includes an audience snapshot, services, rates and booking terms, and the supplied PDF.

## Run locally

Use Node.js 22.13 or newer. The site runs with the included content and without service credentials.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Open [the homepage](http://localhost:3000) or [the media kit](http://localhost:3000/media-kit).

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

The production script uses Next.js’s Webpack compiler. The development server uses Turbopack.

## Animation components

Motion is already listed in `package.json`. To add the same version to another project, run `npm install motion@12.43.0`.

- `BlurFade` wraps hero text and the About photos and pillars. Set `onScroll` for a one-time viewport entrance and `delay` to stagger adjacent elements.
- `Marquee` renders the ticker and brand strip with CSS motion that pauses on hover or keyboard focus.
- `CountUp` receives the follower count as a number from the server. The server HTML and screen readers get the final value.
- `TypingCode` uses CSS steps for the terminal line. The whole snippet is available as text as soon as the page renders.

The homepage and media kit remain Server Components. Import these wrappers where they are needed and pass server-rendered content as children, as in `src/components/about.tsx`.

## Edit content

| File | What to change |
| --- | --- |
| [`src/data/site-config.ts`](src/data/site-config.ts) | Bio, headline, social links, email, photos, audience metrics, services, rates, terms, and the PDF link |
| [`src/data/reels.ts`](src/data/reels.ts) | Reels, categories, thumbnails, exact Instagram URLs, dates, views, display order, and opt-in playback |
| [`src/data/brands.ts`](src/data/brands.ts) | Brand names, approved logos, campaign titles, Reel references, and supplied results |
| [`public/images/`](public/images/) | Local portraits, workspace photos, future Reel covers, and the Open Graph image |
| [`public/media-kit/`](public/media-kit/) | The downloadable PDF |

- **Photos.** The portrait and workspace images came from the supplied media kit. Replace `site.media.hero`, `about`, `workspace`, `studio`, or `darcy` with a local image path and useful alt text. A `null` path renders a labeled placeholder. Update `public/images/ndinda-social.jpg` when changing the portrait or social branding.
- **Reels.** Replace each labeled sample entry with a real title, vertical thumbnail, exact public Instagram Reel permalink, and any published date or performance data you want to show. Remove `sample: true` to activate the link. The display follows array order. For on-site playback, add a captioned, web-optimized MP4 to `public/videos/` and set `videoSrc`. Set `embed: true` for a public Reel that supports Instagram embedding. The visitor explicitly loads the optional player, and the external link stays available.
- **Brand work.** Link a campaign to a real Reel by setting `campaign.reelId` to the matching entry’s ID. Add a `campaign` object for details and results as they become available. Text treatments are used where no logo is configured.
- **Media kit.** Set `mediaKit.showRates` to change pricing visibility on the page. Keep the rate card, booking terms, and PDF in sync. The bundled PDF is the original supplied document. It includes a phone number and its own historical audience figures. Replace it with the version you want visitors to download before deployment. Set `mediaKit.pdfUrl` to `null` and remove the file from `public/` if you want the download unavailable.

## Connect Instagram

1. In the Meta app dashboard, set up **Instagram API with Instagram Login** and connect the Instagram Creator or Business account for `@ndinda_codes`. In development mode, add the appropriate app role or Instagram tester and accept the invitation. Choose the access level Meta requires for the accounts your app serves.
2. Authorize only `instagram_business_basic` for the profile lookup. Generate an Instagram User access token through the dashboard’s account setup or follow Meta’s Business Login flow to obtain and exchange a short-lived token for a long-lived one. Keep track of token expiry and refresh the long-lived token with Meta before it expires. Replace the saved secret when Meta issues a new token. [Meta’s Instagram Login documentation](https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-instagram-login)
3. Set `INSTAGRAM_ACCESS_TOKEN` locally or in your deployment’s server environment. Leave `INSTAGRAM_USER_ID` empty for `/me`, or set the Instagram-scoped ID from your connected account. The default `INSTAGRAM_API_VERSION` is `v26.0`. [Meta’s supported API versions](https://developers.facebook.com/docs/graph-api/changelog/versions/)
4. Restart or redeploy, then open `/api/instagram/stats`. A successful lookup returns the follower count with `source: "instagram"`. A fresh install without credentials returns `26500` with `source: "manual"`.

The server requests `username,followers_count` from `graph.instagram.com` and verifies the account handle before caching the result. The default refresh window is six hours. The first request after expiry triggers background revalidation, and a failed refresh preserves the last successful snapshot. Set `INSTAGRAM_REVALIDATE_SECONDS` to change the window (minimum 60) or `SHOW_INSTAGRAM_UPDATED_AT=false` to hide the timestamp. The fallbacks and audience placeholders work independently of Meta. Never prefix the token with `NEXT_PUBLIC_` or commit it.

## Enable inquiry delivery

1. Verify a sending domain in Resend and create an API key with sending access. [Resend domain setup](https://resend.com/docs/dashboard/domains/introduction)
2. Set `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` to a sender on that domain. Optionally set `CONTACT_TO_EMAIL` if the inbox differs from the portfolio’s contact address.
3. Restart or redeploy and submit a test inquiry to your own inbox. The visitor’s address is the reply-to. The app confirms delivery only after Resend accepts the request. [Resend email API](https://resend.com/docs/api-reference/emails/send-email)

Without a provider, the form validates the fields and offers a prefilled email draft. The server endpoint returns an unavailable status. Validation is shared between the browser and server, and the server caps request size and uses an invisible spam trap and idempotency keys.

## Deploy on Vercel

Import the project as a standard Next.js application. Set `SITE_URL` to the production origin so both pages have canonical URLs, social previews, and sitemap entries. The Vercel production URL is used if it is available and `SITE_URL` is empty. Add any Instagram and Resend variables from [`.env.example`](.env.example) to the intended environments and redeploy. The production app needs a Next.js runtime for the two server routes. [Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs)

The site and PDF download work immediately. Replace the remaining sample Reels and supply current audience metrics and campaign details when available. Live follower updates and automatic form delivery require the connections above.

The visual references were [Jeca Martinez](https://jecamartinez.com/) and [Lumen & Fox](https://lumenandfoxwords.com/). The site’s collage, sticker artwork, and motion are original. Font licenses are bundled in [`src/app/fonts/`](src/app/fonts/).
