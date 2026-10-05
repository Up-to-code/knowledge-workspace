# Compact research workspace UI

- Avoid inline thread-action panels that change sidebar row heights. Keep the thread list readable when a menu is open.
- Avoid presenting destructive actions with the same color and grouping as ordinary actions. Keep Delete separate and confirmed.
- Avoid nested textarea borders, browser focus rectangles, and an additional outer frame. Show focus through the composer container.
- Avoid long model labels that consume input space or fixed-height menu rows that overlap when labels wrap.
- Avoid floating resource previews, invented thumbnails, badges without source evidence, or decorative covers. Use actual source assets and readable text.
- Avoid marketing language in source controls. Use Open original source, Ask about this, Edit, Pin, and Delete.
- Avoid duplicating the agent transport or persistence layer to add UI primitives. Adapt the existing Eve stream and Neon state through assistant-ui's external-store runtime.
- Keep keyboard navigation, visible focus, confirmation, loading states, and source attribution intact.

Review limitation: generated unslop samples and automated before/after comparison were unavailable; this profile was written from the supplied references and implementation review.

## Account and selector refinement
- Use neutral #EFEFEF light surfaces with black primary actions; dark mode reverses the contrast.
- Keep one search entry point and omit technical database and provider configuration labels from the working view.
- Fit user messages to their content, capped at 80% of the conversation width.
- Group settings in a split panel with Profile, Appearance, Models, and Sources sections.
- Use media links within prose instead of embedded content images; retain source media in the library and files.
