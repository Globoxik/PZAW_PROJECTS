import express from 'express';
import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("cards.db");
console.log("Cards in DB:", db.prepare("SELECT COUNT(*) AS count FROM cards").get());
const port = 5943;

const app = express();
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));


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


app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});