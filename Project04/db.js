import { DatabaseSync } from "node:sqlite";
import argon2 from "argon2";

const db_path = "./data.db";
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
    is_admin        INTEGER DEFAULT 0,
    created_at      INTEGER
  ) STRICT;
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS cards (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id   INTEGER NOT NULL,
    name      VARCHAR NOT NULL,
    attribute VARCHAR,
    level     INTEGER,
    type      VARCHAR,
    atk       VARCHAR,
    def       VARCHAR,
    quantity  INTEGER
  );
`);

const ADMIN_USERNAME = "admin";
const adminPassword = "admin" + Math.random().toString(36).slice(2, 8);

const existing = db.prepare("SELECT id FROM fc_users WHERE username = ?").get(ADMIN_USERNAME);
if (!existing) {
  const passhash = await argon2.hash(adminPassword);
  db.prepare("INSERT INTO fc_users (username, passhash, is_admin, created_at) VALUES (?, ?, 1, ?)")
    .run(ADMIN_USERNAME, passhash, Date.now());
  console.log(`Admin account created — username: admin, password: ${adminPassword}`);
  console.log("Save this password, it will not be shown again!");
}