import { db } from "../db.js";

const args = process.argv.slice(2);
const target = args[0];

if (target === "cards") {
  db.prepare("DELETE FROM cards").run();
  console.log("Cleared all cards.");
} else if (target === "users") {
  db.prepare("DELETE FROM users WHERE is_admin = 0").run();
  db.prepare("DELETE FROM session").run();
  console.log("Cleared all non-admin users and sessions.");
} else if (target === "all") {
  db.prepare("DELETE FROM cards").run();
  db.prepare("DELETE FROM users WHERE is_admin = 1").run();
  db.prepare("DELETE FROM session").run();
  console.log("Cleared all cards, non-admin users and sessions.");
} else {
  console.log("Usage: node delete_data.js <target>");
  console.log("  cards  — clears all cards");
  console.log("  users  — clears all non-admin users and sessions");
  console.log("  all    — clears everything");
}