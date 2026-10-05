import { defineTool } from 'eve/tools';
import { z } from 'zod';
import { and, eq } from 'drizzle-orm';
import { getDb } from '../../src/lib/db';
import { resources } from '../../src/lib/db/schema';
import { resourceMarkdown } from '../../src/data/resources';

export default defineTool({
  description: 'Read a saved article or uploaded file in chunks. Follow nextOffset to read more source text.',
  inputSchema: z.object({
    id: z.string().max(100),
    offset: z.number().int().min(0).max(3000000).default(0),
    pageChars: z.number().int().min(1000).max(12000).default(6000),
  }),
  async execute({ id, offset, pageChars }, ctx) {
    const ownerId = ctx.session.auth.current?.principalId;
    if (!ownerId) throw new Error('Unauthorized');
    const [row] = await getDb().select().from(resources).where(and(
      eq(resources.ownerId, ownerId), eq(resources.id, id),
    ));
    if (!row||row.data.deleted) throw new Error('Resource not found');
    const text = resourceMarkdown(row.data);
    return {
      id, title: row.data.title, url: row.data.url, tags: row.data.tags,
      related: row.data.related, status: row.data.status,
      text: text.slice(offset, offset + pageChars), offset,
      totalCharacters: text.length,
      nextOffset: offset + pageChars < text.length ? offset + pageChars : null,
    };
  },
});
