import { sql } from 'drizzle-orm';
import { pgTable, text, jsonb, timestamp, primaryKey, index } from 'drizzle-orm/pg-core';
import type { Resource } from '../../data/resources';
export const resources = pgTable('resources', {
 ownerId: text('owner_id').notNull(), id:text('id').notNull(), title:text('title').notNull(),
 searchText:text('search_text').notNull(), data:jsonb('data').$type<Resource>().notNull(),
 updatedAt:timestamp('updated_at',{withTimezone:true}).defaultNow().notNull(),
},t=>[primaryKey({columns:[t.ownerId,t.id]}),index('resources_owner_idx').on(t.ownerId),index('resources_search_idx').using('gin',sql`to_tsvector('simple', ${t.searchText})`)]);
export const workspaces = pgTable('workspaces', {
 ownerId:text('owner_id').primaryKey(), threads:jsonb('threads').$type<unknown[]>().default([]).notNull(),
 drafts:jsonb('drafts').$type<Record<string,string>>().default({}).notNull(),
 updatedAt:timestamp('updated_at',{withTimezone:true}).defaultNow().notNull(),
});

export const agentSessions=pgTable('agent_sessions',{id:text('id').primaryKey(),ownerId:text('owner_id').notNull(),createdAt:timestamp('created_at',{withTimezone:true}).defaultNow().notNull()},t=>[index('agent_sessions_owner_idx').on(t.ownerId)]);
