-- HEXA Steel® private RFQ intake schema — migration 001
-- Execute on a restricted PostgreSQL database before enabling RFQ_SUBMISSIONS_ENABLED.
-- Restrict the website principal to SELECT/INSERT on rfq_submissions, INSERT on
-- rfq_outbox. Only the outbox worker needs UPDATE/SELECT on rfq_outbox.
BEGIN;
CREATE TABLE IF NOT EXISTS rfq_submissions (
 reference text PRIMARY KEY CHECK (reference ~ '^HX-RFQ-[0-9]{8}-[A-F0-9]{12}$'),
 idempotency_key uuid NOT NULL UNIQUE,
 fingerprint char(64) NOT NULL,
 status text NOT NULL DEFAULT 'Received'
  CHECK (status IN ('Received','Technical Review','Clarification','Estimating','Quoted','Won','Lost')),
 lead_data jsonb NOT NULL,
 documents jsonb NOT NULL DEFAULT '[]'::jsonb,
 consent_at timestamptz NOT NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS rfq_outbox (
 id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 reference text NOT NULL REFERENCES rfq_submissions(reference) ON DELETE RESTRICT,
 kind text NOT NULL CHECK (kind IN ('sales','customer')),
 recipient text NOT NULL,
 reply_to text NOT NULL,
 subject text NOT NULL,
 body text NOT NULL,
 status text NOT NULL DEFAULT 'queued' CHECK (status IN ('queued','sending','sent','failed')),
 attempts integer NOT NULL DEFAULT 0,
 next_attempt_at timestamptz NOT NULL DEFAULT now(),
 lease_until timestamptz,
 claim_token uuid,
 provider_message_id text,
 last_error text,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(reference,kind)
);
CREATE INDEX IF NOT EXISTS rfq_outbox_pending ON rfq_outbox (next_attempt_at,id)
 WHERE status IN ('queued','sending');
COMMIT;
