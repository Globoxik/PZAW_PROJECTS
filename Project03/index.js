import express from 'express';
import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("cards.db");
const port = 5943;

const app = express();
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


function insertRandomCards(db) {
  const cards = [
    ["Dark Magician", "DARK", 7, "Spellcaster", "2500", "2100"],
    ["Blue-Eyes White Dragon", "LIGHT", 8, "Dragon", "3000", "2500"],
    ["Red-Eyes Black Dragon", "DARK", 7, "Dragon", "2400", "2000"],
    ["Summoned Skull", "DARK", 6, "Fiend", "2500", "1200"],
    ["Celtic Guardian", "EARTH", 4, "Warrior", "1400", "1200"],
    ["Kuriboh", "DARK", 1, "Fiend", "300", "200"],
    ["Jinzo", "DARK", 6, "Machine", "2400", "1500"],
    ["Dark Magician Girl", "DARK", 6, "Spellcaster", "2000", "1700"],
    ["Elemental HERO Neos", "LIGHT", 7, "Warrior", "2500", "2000"],
    ["Blue-Eyes Chaos MAX Dragon", "LIGHT", 8, "Dragon", "4000", "0"]
  ];

  const insert = db.prepare(`
    INSERT INTO cards (name, attribute, level, type, atk, def, quantity)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  for (let i = 0; i < 10; i++) {
    const card = cards[Math.floor(Math.random() * cards.length)];
    const quantity = Math.floor(Math.random() * 5) + 1;

    insert.run(
      card[0],
      card[1],
      card[2],
      card[3],
      card[4],
      card[5],
      quantity
    );
  }
}

function deleteAllCards(db) {
  db.prepare("DELETE  FROM cards").run();
}

//deleteAllCards(db);
//insertRandomCards(db);



app.get("/", (req, res) => {
    res.render("main", {
        title: "Strona Główna"
  });
});

app.get("/card_db", (req, res) => {
  res.render("card_db", {
    title: "Wyszukiwarka kart",
    card: null,
    error: null
  });
});


app.post("/card_db/search", async (req, res) => {
  const cardName = req.body.name;

  try {
    const response = await fetch(
      `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${encodeURIComponent(cardName)}`
    );

    const json = await response.json();
    const card = json.data[0];

    const result = {
      name: card.name,
      type: card.type,
      description: card.desc,
      attack: card.atk,
      defense: card.def,
      level: card.level,
      race: card.race,
      attribute: card.attribute,
      image: card.card_images[0].image_url
    };


      res.render("card_db", {
        title: "Wyszukiwarka kart",
        card: result,
        error: null
      });


  } catch (err) {
    res.render("card_db", {
      title: "Wyszukiwarka kart",
      card: null,
      error: "Nie znaleziono takiej karty."
    });
  }
});

app.get("/owned", (req, res) => {
  try {
    const cards = db.prepare(`
      SELECT id, name, attribute, level, type, atk, def, quantity
      FROM cards
      ORDER BY id ASC
    `).all();

    res.render("owned_cards", {
      title: "Wszystkie karty",
      cards
    });
  } catch (err) {
    res.status(500).send("Database error");
  }
});

app.get("/owned/edit/:id", (req, res) => {
  const id = req.params.id;

  const card = db.prepare(
    "SELECT * FROM cards WHERE id = ?"
  ).get(id);

  if (!card) {
    return res.redirect("/owned");
  }

  res.render("edit_card", {
    title: "Edytuj kartę",
    card
  });
});

app.post("/owned/edit/:id", (req, res) => {
  const id = req.params.id;
  const quantity = req.body.quantity;

  db.prepare(
    "UPDATE cards SET quantity = ? WHERE id = ?"
  ).run(quantity, id);

  res.redirect("/owned");
});

app.post("/owned/delete/:id", (req, res) => {
  const id = req.params.id;

  db.prepare(
    "DELETE FROM cards WHERE id = ?"
  ).run(id);

  res.redirect("/owned");
});

app.get("/owned/add", (req, res) => {
  res.render("add_card", {
    title: "Dodaj kartę",
    error: null
  });
});


app.post("/card/add", async (req, res) => {
  const { name, quantity, redirectTo } = req.body;

  try {
    const response = await fetch(
      `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${encodeURIComponent(name)}`
    );

    const json = await response.json();

    if (!json.data || !json.data[0]) {
      return res.redirect(redirectTo || "/card_db");
    }

    const card = json.data[0];

    const level = card.level != null ? String(card.level) : null;
    const atk = card.atk != null ? String(card.atk) : null;
    const def = card.def != null ? String(card.def) : null;

    const existing = db.prepare(
      "SELECT id FROM cards WHERE name = ?"
    ).get(card.name);

    if (existing) {
      db.prepare(`
        UPDATE cards
        SET quantity = quantity + ?
        WHERE id = ?
      `).run(Number(quantity), existing.id);
    } else {
      db.prepare(`
        INSERT INTO cards (name, attribute, level, type, atk, def, quantity)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run(
        card.name,
        card.attribute || null,
        level,
        card.race + ' ' + card.type,
        atk,
        def,
        Number(quantity)
      );
    }

    res.redirect(redirectTo || "/owned");

  } catch (err) {
    console.error(err);
    res.redirect(redirectTo || "/owned");
  }
});



app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});