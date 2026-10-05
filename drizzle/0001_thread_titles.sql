CREATE TABLE IF NOT EXISTS threads(owner_id text NOT NULL,id text NOT NULL,title text NOT NULL,metadata jsonb NOT NULL,messages jsonb NOT NULL DEFAULT '[]',updated_at timestamptz NOT NULL DEFAULT now(),PRIMARY KEY(owner_id,id));
CREATE INDEX IF NOT EXISTS threads_owner_updated_idx ON threads(owner_id,updated_at);
CREATE INDEX IF NOT EXISTS threads_title_idx ON threads USING gin(to_tsvector('simple',title));
INSERT INTO threads(owner_id,id,title,metadata,messages) SELECT owner_id,t->>'id',coalesce(t->>'title','New chat'),t-'messages',coalesce(t->'messages','[]'::jsonb) FROM workspaces CROSS JOIN LATERAL jsonb_array_elements(threads) AS t WHERE t->>'id' IS NOT NULL ON CONFLICT DO NOTHING;
