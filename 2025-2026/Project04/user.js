import { DatabaseSync } from "node:sqlite";
import argon2 from "argon2";
import { db } from "./db.js";


const db_ops = {
  create_user: db.prepare(
    "INSERT INTO users (username, passhash, created_at) VALUES (?, ?, ?);",
  ),
  get_user: db.prepare(
    "SELECT id, username, is_admin, created_at FROM users WHERE id = ?;",
  ),
  find_by_username: db.prepare(
    "SELECT id, username, created_at FROM users WHERE username = ?;",
  ),
  get_auth_data: db.prepare(
    "SELECT id, passhash FROM users WHERE username = ?;",
  ),
  last_insert_id: db.prepare("SELECT last_insert_rowid() as id;"),
};

export async function createUser(username, password) {
  let existing_user = db_ops.find_by_username.get(username);

  if (existing_user != null) {
    return null;
  }
  let createdAt = Date.now();
  let passhash = await argon2.hash(password);

  db_ops.create_user.run(username, passhash, createdAt);
  const row = db_ops.last_insert_id.get();
  return { id: row.id };
}

export async function validatePassword(username, password) {
  let auth_data = db_ops.get_auth_data.get(username);
  if (auth_data != null) {
    if (await argon2.verify(auth_data.passhash, password)) {
      return auth_data.id;
    }
  }
  return null;  
}

export function getUser(user_id) {
  return db_ops.get_user.get(user_id);
}

export default {
  createUser,
  validatePassword,
  getUser,
};