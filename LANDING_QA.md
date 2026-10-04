# Knowledge landing QA

Status: STATIC_QA_PASS — no remaining material code findings. Rendered visual and interaction QA is unverified.

## Review boundary

Read project `AGENTS.md` and website-cloner skill and references. No `.env` files or secrets read. No local browser automation attempted.

Rendered local visual QA is pending human action: the existing localhost IAB tab is policy blocked and has a poisoned `data:text/html` state. The human must manually reopen a valid local tab before automation can resume. Opening alternate browsers or tabs, using CDP/Playwright, or otherwise bypassing the block is prohibited. Static checks and plain HTTP checks are allowed and do not establish pixel fidelity.

## Reference evidence

Source `https://cursor.com/home`, captured through CUA Chrome by the reference agent on 2026-10-04. Screenshots and computed metrics are in `work/landing-reference/`.

Observed reference scale: desktop 52px header, 1300px maximum content width, 20px gutters, hero top padding 112px, 26px/32.5px regular heading, 43px pill CTA, dark background `#14120b` and foreground `#edecec`. Mobile viewport 375px with 360px content: 56px header, 18.75px gutters, hero top padding 105px, 24.375px/30.47px heading. Reference adaptation may use the knowledge product's established light theme and actual source assets.

## Checks performed

- HTTP GET `/`, `/app`, `/auth/sign-in`, and all four landing preview JPEG paths returned 200. Root HTML contains the marketing heading, root-specific metadata, and an iframe targeting `/app`.
- Independently ran `npm run typecheck`: passed.
- Workspace route remains a client component wrapper around the existing knowledge workspace.
- Sign-in success and sign-up success navigate to `/app`; the auth return link also points to `/app`.
- Original preview assets have source provenance in `public/previews/sources.json`; all four landing screenshots are actually 1265×709, matching declared dimensions. Page captions retain source owner, media kind, URL, and capture date.
- Live hero iframe uses the actual workspace. Source screenshots are clearly isolated examples; the editable note is explicitly an example and uses component state only. No fake customer logos, endorsements, statistics, seeded library content, or claims of a model operation that did not run were introduced.
- Verified local link destinations and section anchors. Mobile menu toggles and closes on link selection; source tabs have ARIA relationships, selected state, and left/right keyboard movement; FAQ uses native disclosures; example reset restores the note. Interaction logic is reviewed but has not been exercised in a rendered local browser.
- Tailwind classes implement mobile stacking and desktop alternating feature layouts. Source desktop max content width, hero spacing, card colors, pill CTAs, and 756px hero frame height match the captured design scale. Established system typography and actual light workspace remain product-specific adaptations.
- Security/scope review: no new API handlers, secret reads, external script injection, model calls, or data insertion. External source links use `rel="noreferrer"`; iframe targets the same-origin app. Eve tool source confirms search/read/save source capabilities described on the landing.

## Findings resolved

- Material factual mismatch: step 02 promised users could connect OpenRouter in Settings, although Settings offers model selection/status rather than a connection form. Updated to choosing an available free model using the configured workspace connection.
- Destination mismatch: “Open model settings” and “Connection settings” linked only to the library. Relabeled to “Open workspace.”
- Returning-user copy: “Your library starts empty” incorrectly described an existing user's live library. Updated to “New libraries start empty” / “A new library starts empty.”

## Small known reference differences

- Mobile landing gutters are 20px versus the reference's 18.75px; mobile heading is 24px versus 24.375px. These are minor static differences and do not establish the final rendered appearance.
- Desktop feature cards have a 700px minimum height versus the source's approximately 715px outer card. Knowledge content and real media replace Cursor marketing demos, so this is a design adaptation rather than an assertion of pixel equivalence.

## Remaining verification

- Production build result is owned by the primary/implementation agent.
- Rendered desktop/tablet/mobile comparison and interactive visual QA after the human reopens the local tab.
