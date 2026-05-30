import { db } from "../db.js";

const cardPool = [
  ["Dark Magician", "DARK", 7, "Spellcaster Effect Monster", "2500", "2100"],
  ["Blue-Eyes White Dragon", "LIGHT", 8, "Dragon Normal Monster", "3000", "2500"],
  ["Red-Eyes Black Dragon", "DARK", 7, "Dragon Normal Monster", "2400", "2000"],
  ["Summoned Skull", "DARK", 6, "Fiend Normal Monster", "2500", "1200"],
  ["Celtic Guardian", "EARTH", 4, "Warrior Normal Monster", "1400", "1200"],
  ["Kuriboh", "DARK", 1, "Fiend Effect Monster", "300", "200"],
  ["Jinzo", "DARK", 6, "Machine Effect Monster", "2400", "1500"],
  ["Dark Magician Girl", "DARK", 6, "Spellcaster Effect Monster", "2000", "1700"],
  ["Elemental HERO Neos", "LIGHT", 7, "Warrior Effect Monster", "2500", "2000"],
  ["Blue-Eyes Chaos MAX Dragon", "LIGHT", 8, "Dragon Effect Monster", "4000", "0"],
  ["Exodia the Forbidden One", "DARK", 3, "Spellcaster Effect Monster", "1000", "1000"],
  ["Mirror Force", null, null, "Trap Card", null, null],
  ["Pot of Greed", null, null, "Spell Card", null, null],
  ["Monster Reborn", null, null, "Spell Card", null, null],
  ["Swords of Revealing Light", null, null, "Spell Card", null, null],
];

const users = db.prepare("SELECT id, username FROM fc_users WHERE is_admin = 0").all();

if (users.length === 0) {
  console.error("No non-admin users found. Create some accounts first.");
  process.exit(1);
}

const insert = db.prepare(`
  INSERT INTO cards (user_id, name, attribute, level, type, atk, def, quantity)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`);

const count = 20;
for (let i = 0; i < count; i++) {
  const user = users[Math.floor(Math.random() * users.length)];
  const card = cardPool[Math.floor(Math.random() * cardPool.length)];

  const existing = db.prepare(
    "SELECT id FROM cards WHERE name = ? AND user_id = ?"
  ).get(card[0], user.id);

  if (existing) {
    db.prepare("UPDATE cards SET quantity = quantity + ? WHERE id = ?")
      .run(Math.floor(Math.random() * 3) + 1, existing.id);
  } else {
    insert.run(
      user.id,
      card[0],
      card[1],
      card[2],
      card[3],
      card[4],
      card[5],
      Math.floor(Math.random() * 5) + 1
    );
  }
}

console.log(`Inserted random cards`);