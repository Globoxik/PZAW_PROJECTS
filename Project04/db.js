import { DatabaseSync } from "node:sqlite";

const db_path = "./users.db";
export const db = new DatabaseSync(db_path, { readBigInts: true });

db.exec(`
  CREATE TABLE IF NOT EXISTS fc_session (
    id              INTEGER PRIMARY KEY,
    user_id         INTEGER,
    created_at      INTEGER
  ) STRICT;
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS fc_users (
    id              INTEGER PRIMARY KEY,
    username        TEXT UNIQUE,
    passhash        TEXT,
    created_at      INTEGER
  ) STRICT;
`);