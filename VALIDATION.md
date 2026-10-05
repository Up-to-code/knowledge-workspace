# Verification — 2026-10-04

## Latest landing and model checks

- Cursor marketing reference inspected in Chrome at `https://cursor.com/home`, with desktop/tablet/mobile screenshots and DOM measurements. Landing implemented at `/`, existing workspace moved to `/app`; auth redirects lead to `/app`.
- Static QA passed after fixing settings/CTA wording. Real source images preserve provenance. Editable examples stay outside the user library. Routes `/`, `/app`, `/auth/sign-in` and four source JPEGs returned HTTP 200.
- Supplied OpenRouter key saved only in private `.env.local` (0600) and verified through OpenRouter's key endpoint. No secret is included in source or archive. Models are checked for zero pricing and required capabilities; SDK requests enforce zero-price caps.
- Live Cohere North Mini Code and OpenRouter free router both completed a two-step function-call test. A real Eve turn authenticated with the development service token for the existing app owner called library search against Neon and reported 0 results. The smoke session was retired and its owner mapping removed; no resource/workspace test data was saved. This validates the backend agent pipeline, not browser sign-in.
- Qwen 3.8 27B generated validated tags and a summary from fetched example.com text, and read the actual BoardUI source screenshot with validated description/tags. Random free routing returned malformed structured data, so extractor/vision roles now use the individually tested Qwen model. Provider failures remain explicit warnings, without paid fallback.
- A running agent does not reload environment secrets on artifact hot reload; restart the dev server after changing private provider credentials or role variables.
- Typecheck, five tests, and production Eve/Next build passed with the landing and model connection. The final model-role refinements also pass typecheck, all five tests, and a second production build. After restarting, a second Eve check without an explicit model confirmed the default role pipeline and real search_knowledge tool result.

## Confirmed

- Requested app user created in Neon Auth through Chrome; the user row and database count were verified. No password was set. The remote application database has zero resources and zero workspace records at this verification point.
- Starter resource content and canned chat removed. Anonymous state loads empty; existing starter IDs are filtered with a recovery archive. Original image uploads no longer rely on a sample resource. Empty cloud accounts can activate persistence without importing sample content.
- Warm neutral styling, focus/press feedback, menu transitions, and reduced-motion support added. TypeScript, production build, and all five existing tests pass. Password request/reset pages compile; the email request is left to the account holder.

- Light and dark palettes share CSS variables across library, threads, composer, dialogs and sign-in. Header toggle and Settings Appearance controls persist preferences locally; source media has no theme filters. Theme build/type checks pass. Rendered theme verification remains blocked by the cached in-app browser error page.

- Next.js App Router migration replaces Vite; runtime route inventory has no Pages Router entries.
- TypeScript checks and production Eve/Next build pass.
- Drizzle migration applied successfully to the new remote `knowledge_workspace` database. A direct Postgres query verified all three application tables, the migration ledger, owner indexes, and the full-text GIN index.
- Chrome provisioning verified the selected organization, schema-only `knowledge-workspace` branch, new database, fixed 0.25 CU compute, and five-minute idle suspension. Neon Auth is enabled with the local app origin trusted. Credentials are saved privately with file mode 0600 and `sslmode=verify-full`.
- Live public source fetching works for example.com; extraction preserves source text, metadata and links and removes script/navigation content.
- Private, loopback, mapped IPv6, reserved, credential-bearing, and non-HTTP URLs are rejected in tests.
- Live OpenRouter catalog discovery works. Pricing tests reject missing token prices, paid prices, and hidden fees. An SDK request interception test confirms the actual hosted request body sets zero prompt/completion/image/request price caps and disables provider fallback; five tests pass.
- Next.js development compilation diagnostics report no issues.
- Direct unauthenticated Eve session creation returns HTTP 401. After Neon setup, `/api/auth/get-session` returns HTTP 200 with a null anonymous session, `/api/workspace` returns HTTP 401, and `/auth/sign-in` returns HTTP 200 with the sign-in page. The app server was restarted with its completed database/auth configuration.
- Local auth cookie and internal agent secrets generated without printing them; secrets are excluded from the source archive.
- Chromium installed; screenshot feature enabled locally. Capture through a signed-in agent is not yet tested.
- Patched guarded-fetch's transitive Undici dependency. Remaining audit advisories concern Drizzle Kit's development-only esbuild dependency; no esbuild development server is used by this app.

## Earlier UI/media checks retained

Original BoardUI, Whistle, Needle, and Phonon-2 source screenshots were captured and inspected during UI development. Nero's X post and linked BoardUI website are separate resources, with the original video thumbnail and source-player link. Decorative SVG covers were removed. Library/article navigation, local edits, templates, exports, keyboard search, and narrow layout were checked before migration.

## Pending live verification

The database and managed auth are provisioned through the selected Chrome account. The unrelated CLI account was not used. Sign-up/sign-in with an actual app account, two-user resource/session isolation, and authenticated cloud persistence still need end-to-end verification. Live free-model inference, schema summaries, screenshot reading, and a Neon-backed Eve search have passed backend checks. Browser sign-in, linked-source imports/persistence, and the agent screenshot capture/save operation still require end-to-end verification. Provider quotas and availability remain external constraints.

Post-migration browser interaction testing is pending: the existing in-app tab is stuck on a cached data-URL error page. Browser policy blocks automated navigation from that tab; the user tried to reopen it, but the browser inventory still shows `ERR_CONNECTION_REFUSED` in a cached data-URL error page. Local server and auth HTTP checks return 200; the user was asked to identify the exact sign-in error. HTTP/build/compile checks do not substitute for rendered browser verification.

## Access fix — 2026-10-05

- Safari's user-opened `/app` page is reachable. Verified the updated header and sidebar Sign in controls and the browser-library explanation in the rendered UI. Clicking the header Sign in link opens `/auth/sign-in` with the email/password form.
- Anonymous sidebar account control now opens sign-in directly, rather than Settings. Account and model discovery run independently, so catalog latency no longer delays session discovery. Session/cloud-load errors are visible instead of silently discarding them.
- Prepared the existing account email in Safari. The account holder must enter their existing password, or complete password setup via the email link. No password was entered, generated, read, or submitted by the agent. Authenticated sign-in/cloud behavior remains pending the human handoff.
- Typecheck and production Eve/Next build pass. Screenshot evidence: `../library-sign-in-fixed.png`. No source resources were added or changed.


## Session and profile fix — 2026-10-05

- Confirmed the real user's signup created a credential account and a session; the prior HTTP Safari preview did not retain the secure cookie. No passwords or session tokens were read.
- Added loopback HTTPS development launcher and HTTP bookmark redirect. User approved trusting the 90-day localhost-only SSL certificate. Safari rendered the sign-in page as secure without an interstitial.
- Added session confirmation before auth redirect and persisted mode navigation, plus profile name editing and actual email/verification state. Sign-out errors are handled. Empty cloud workspaces no longer leave sync permanently disabled.
- TypeScript, five existing tests, and production build passed before the final sync/sign-out correction. Final typecheck recorded separately below.
- Authenticated browser/profile persistence check remains pending the user entering their existing password.

Final typecheck passed after the sync/sign-out correction. Default `npm run dev` now starts HTTPS; `dev:http` is reserved for non-auth UI work.


## Required authentication — 2026-10-05

- `/app` checks the Neon session on the server before rendering; unauthenticated GET returned HTTP 307 to `/auth/sign-in`, with no workspace markup.
- Unauthenticated `/api/workspace` and `/api/search` returned 401. Public `/` and `/auth/sign-in` returned 200.
- Safari visibly redirected the signed-out library tab to sign-in.
- Authenticated identity is passed from the server; browser resources and drafts read/write only the signed-in account's cache. Sign-out returns to sign-in.
- Removed the public landing page's live workspace iframe and guest-access claims. No account or saved resource was deleted.
- Typecheck and production build passed; `/app` is now dynamically rendered.


## Agent workflow repair — 2026-10-05

- Reproduced server-side `DEPTH_ZERO_SELF_SIGNED_CERT`; fixed the Next.js child CA configuration without disabling TLS verification.
- Reproduced missing `x-eve-stream-version`; the authenticated proxy now preserves all four Eve stream headers. Added a regression test that also verifies cookies are not forwarded.
- Confirmed authenticated Safari chat streamed real model replies and `search_knowledge` results.
- Agent read the real Whistle source and saved a Neon resource with 12 generated tags and 10 source/summary sections. Resource survived reopening the workspace.
- Screenshot tool completed; caught and fixed an impure React updater and stale autosave acknowledgement that overwrote the image. Pure merge regression tests cover repeated evaluation and unsaved edits. Final screenshot persistence verification recorded below.
- Nine tests, TypeScript and production build passed. Free price filtering/provider-policy checks remain enforced. No new credential was read or logged.

Final screenshot persistence check: authenticated agent searched the existing Whistle resource and captured its original page. Neon stored a 99,019-character image with screenshot provenance and capture timestamp. Safari displayed the actual source screenshot, and a full reload retained it. An atomic upsert transaction check verified that missing or older media cannot erase newer media. Evidence: ../agent-source-verified.png.

## Composer, threads and resource responses — 2026-10-05

- Model rows wrap with variable height; composer removes native text-area outline and bounds model label width.
- Safari verified rename, custom group, reversible deletion and restoration on a new Research workspace thread.
- Live agent search returned a Markdown heading, source link, and card displaying the saved original screenshot. Tool actions are collapsed by default.
- Added source-supported tag/Markdown-note organization tool. Markdown renders GFM tables, lists, code, links and HTTPS source images.
- Source loading placeholders trigger a browser-rendered retry; Type Garden still yielded insufficient readable text and was rejected instead of saved as a new useful summary. Existing saved resource was retained.
- Eleven tests and production build passed.

## Indexed thread loading and source chat — 2026-10-05

- Applied the additive thread-table migration to Neon. Thread messages now live separately from indexed title/metadata rows; initial workspace response includes at most 100 titles and no thread-message blob. The single-thread API loads messages on demand.
- A rolled-back transaction verified that renaming an unloaded thread preserves its full messages. Thread sync batches writes rather than issuing one query per title.
- Added AI search command and indexed database title lookup, conversation-loading skeleton, and pagination.
- Safari verified the source chat opens beside Whistle and the agent reads attached context and returns a real source link. Agent source edits preserve original evidence. Delete confirmations are implemented for sources and threads. Sources retain database rows; thread Trash supports restore.
- Eleven tests, typecheck and production build passed before the final batch-write change; final verification follows. Browser activity interrupted final screenshot/resize and delete-dialog visual checks.

Final typecheck/build and batched thread-preservation transaction passed. Signed-out `/api/threads` returned 401. Deleted source markers are retained against stale-tab upserts.

## Reference UI and assistant-ui — 2026-10-05

- Integrated @assistant-ui/react external-store runtime with Eve; source chat uses Thread/Message/Composer primitives and the main composer uses the same runtime and input/send primitives. Neon state and Eve session ownership remain authoritative.
- Safari verified restored source messages, Send through the source composer, main Send and Enter submission, and the floating thread menu with Open new tab, Rename, Pin, Group, and red Delete. Saved visual evidence: ../assistant-ui-verified.png.
- Removed the inner native textarea frame, bounded composer input height, and hid inactive Stop controls. Source link controls keep compact subdued styling.
- Unslop CLI was attempted in an isolated work checkout and failed at the Claude subprocess. No generated samples or automated comparison are claimed. A direct three-reference review and reusable profile are recorded in design/unslop.
- Eleven tests and production build passed; final typecheck followed the keyboard-form correction.

### System UI refinement — 2026-10-05
Light theme uses #EFEFEF canvas/sidebar and black primary actions. Verified account menu, split Profile/Appearance/Models/Sources settings, compact search with loading state, and simplified model menu in Safari. Removed redundant AI search entry, pinned heading, technical status labels, and article/agent image embeds. User messages fit content up to 80% width. Agent instructions request readable Markdown and linked media. Existing confirmation modals remain in place for deletion. Typecheck, 11 tests, and production build pass. Proof: ../workspace-settings-verified.png and ../system-ui-models-verified.png. Refinement follows the documented manual unslop reference profile; automated unslop generation remains unavailable as recorded previously.

### Modular chat UI follow-up — 2026-10-05
Isolated Next development output in .next-dev so production builds cannot overwrite live CSS. Restarted the HTTPS preview and verified its black controls, #EFEFEF canvas, padded chat rows, flat chat list with group filter, Rename saved by Enter without Save, compact provider-filtered model picker, right-aligned user messages, and account directly opening profile settings in Safari. General cards are text-only; source covers remain expandable inside the resource. Removed sidebar Images/Automations and import workflow hints. Thread deletion now uses a centered confirmation modal. Typecheck, all 11 tests, production build pass. Proof: ../modular-chat-verified.png and ../modular-settings-verified.png. Unslop profile updated from supplied references; automated generation remains unavailable.
