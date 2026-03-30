import { db as userDb } from "../db.js";
import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("cards.db");

const args = process.argv.slice(2);
const target = args[0];

if (target === "cards") {
  db.prepare("DELETE FROM cards").run();
  console.log("Cleared all cards.");
} else if (target === "users") {
  userDb.prepare("DELETE FROM fc_users WHERE is_admin = 0").run();
  userDb.prepare("DELETE FROM fc_session").run();
  console.log("Cleared all non-admin users and sessions.");
} else if (target === "all") {
  db.prepare("DELETE FROM cards").run();
  userDb.prepare("DELETE FROM fc_users WHERE is_admin = 0").run();
  userDb.prepare("DELETE FROM fc_session").run();
  console.log("Cleared all cards, non-admin users and sessions.");
} else {
  console.log("Usage: node cleardb.js <target>");
  console.log("  cards  — clears all cards");
  console.log("  users  — clears all non-admin users and sessions");
  console.log("  all    — clears everything");
}