import { defineTool } from 'eve/tools';
import { z } from 'zod';
import { and, eq, inArray } from 'drizzle-orm';
import { getDb } from '../../src/lib/db';
import { resources } from '../../src/lib/db/schema';

export default defineTool({
  description: 'Read the resources attached to the current composer, including source text and links.',
  inputSchema: z.object({}),
  async execute(_input, ctx) {
    const identity = ctx.session.auth.current;
    if (!identity?.principalId) throw new Error('Unauthorized');
    const selected = identity.attributes.contextIds;
    const ids = Array.isArray(selected)
      ? selected.filter((id): id is string => typeof id === 'string').slice(0, 20)
      : [];
    if (!ids.length) return [];
    const rows = await getDb().select().from(resources).where(and(
      eq(resources.ownerId, identity.principalId), inArray(resources.id, ids),
    ));
    const excerptLength = Math.floor(18000 / Math.max(rows.length, 1));
    return rows.map(({ data }) => ({
      id: data.id, title: data.title, url: data.url, tags: data.tags,
      summary: data.summary.slice(0, 600), related: data.related,
      excerpt: data.sections.map(section => `${section.title}\n${section.paragraphs.join('\n')}`).join('\n\n').slice(0, excerptLength),
      continueWith: 'Use read_resource with this ID and offset for the complete article or file.',
    }));
  },
});
