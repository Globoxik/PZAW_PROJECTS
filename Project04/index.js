import express from 'express';
import { sessionHandler } from "./session.js";
import auth from "./auth.js";
import cookieParser from 'cookie-parser';
import { db } from "./db.js";

const port = 5943;

const app = express();
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(sessionHandler);

function requireLogin(req, res, next) {
  if (res.locals.session?.user_id == null) {
    return res.status(401).render("unauthorized", { title: "Brak dostępu" });
  }
  next();
}

app.get("/", (req, res) => {
  res.render("main", {
    title: "Strona Główna"
  });
});

app.get("/card_db", (req, res) => {
  res.render("card_db", {
    title: "Wyszukiwarka kart",
    card: null,
    error: null,
    success: null
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
      error: null,
      success: null
    });

  } catch (err) {
    res.render("card_db", {
      title: "Wyszukiwarka kart",
      card: null,
      error: "Nie znaleziono takiej karty.",
      success: null
    });
  }
});

app.get("/owned", requireLogin, (req, res) => {
  try {
    const cards = res.locals.user.is_admin
      ? db.prepare(`SELECT * FROM cards ORDER BY id ASC`).all().map(card => ({
          ...card,
          owner: db.prepare("SELECT username FROM fc_users WHERE id = ?").get(card.user_id)?.username ?? "Unknown"
        }))
      : db.prepare(`SELECT * FROM cards WHERE user_id = ? ORDER BY id ASC`).all(res.locals.session.user_id);

    res.render("owned_cards", {
      title: "Wszystkie karty",
      cards
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error: " + err.message);
  }
});

app.get("/owned/edit/:id", requireLogin, (req, res) => {
  const id = req.params.id;

  const card = res.locals.user.is_admin
    ? db.prepare("SELECT * FROM cards WHERE id = ?").get(id)
    : db.prepare("SELECT * FROM cards WHERE id = ? AND user_id = ?").get(id, res.locals.session.user_id);

  if (!card) {
    return res.redirect("/owned");
  }

  res.render("edit_card", {
    title: "Edytuj kartę",
    card
  });
});

app.post("/owned/edit/:id", requireLogin, (req, res) => {
  const id = req.params.id;
  const quantity = req.body.quantity;

  if (res.locals.user.is_admin) {
    db.prepare("UPDATE cards SET quantity = ? WHERE id = ?").run(quantity, id);
  } else {
    db.prepare("UPDATE cards SET quantity = ? WHERE id = ? AND user_id = ?").run(quantity, id, res.locals.session.user_id);
  }

  res.redirect("/owned");
});

app.post("/owned/delete/:id", requireLogin, (req, res) => {
  const id = req.params.id;

  if (res.locals.user.is_admin) {
    db.prepare("DELETE FROM cards WHERE id = ?").run(id);
  } else {
    db.prepare("DELETE FROM cards WHERE id = ? AND user_id = ?").run(id, res.locals.session.user_id);
  }

  res.redirect("/owned");
});

app.get("/owned/add", requireLogin, (req, res) => {
  res.render("add_card", {
    title: "Dodaj kartę",
    error: null,
    success: null
  });
});

app.post("/card/add", requireLogin, async (req, res) => {
  const { name, quantity, redirectTo } = req.body;

  const isCardDb = redirectTo === "/card_db";

  try {
    const response = await fetch(
      `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${encodeURIComponent(name)}`
    );
    const json = await response.json();

    if (!json.data || !json.data[0]) {
      return res.render(
        isCardDb ? "card_db" : "add_card",
        {
          title: isCardDb ? "Wyszukiwarka kart" : "Dodaj kartę",
          card: null,
          error: "Nie znaleziono takiej karty.",
          success: null
        }
      );
    }

    const card = json.data[0];

    const level = card.level != null ? String(card.level) : null;
    const atk = card.atk != null ? String(card.atk) : null;
    const def = card.def != null ? String(card.def) : null;

    const existing = db.prepare(
      "SELECT id FROM cards WHERE name = ? AND user_id = ?"
    ).get(card.name, res.locals.session.user_id);

    if (existing) {
      db.prepare(`
        UPDATE cards SET quantity = quantity + ? WHERE id = ? AND user_id = ?
      `).run(Number(quantity), existing.id, res.locals.session.user_id);
    } else {
      db.prepare(`
        INSERT INTO cards (user_id, name, attribute, level, type, atk, def, quantity)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        res.locals.session.user_id,
        card.name,
        card.attribute || null,
        level,
        card.race + " " + card.type,
        atk,
        def,
        Number(quantity)
      );
    }

    return res.render(
      isCardDb ? "card_db" : "add_card",
      {
        title: isCardDb ? "Wyszukiwarka kart" : "Dodaj kartę",
        card: isCardDb ? {
          name: card.name,
          type: card.type,
          description: card.desc,
          attack: card.atk,
          defense: card.def,
          level: card.level,
          race: card.race,
          attribute: card.attribute,
          image: card.card_images[0].image_url
        } : null,
        error: null,
        success: "Karta została dodana do kolekcji."
      }
    );

  } catch (err) {
    console.error(err);
    res.render(
      isCardDb ? "card_db" : "add_card",
      {
        title: isCardDb ? "Wyszukiwarka kart" : "Dodaj kartę",
        card: null,
        error: "Karta nie istnieje bądź nazwa jest niepoprawna.",
        success: null
      }
    );
  }
});

const authRouter = express.Router();
authRouter.get("/signup", auth.signup_get);
authRouter.post("/signup", auth.signup_post);
authRouter.get("/login", auth.login_get);
authRouter.post("/login", auth.login_post);
authRouter.get("/logout", auth.logout);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});