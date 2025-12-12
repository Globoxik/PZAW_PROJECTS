import express from 'express';

const port = 5943;

const app = express();
app.set("view engine", "ejs");


app.get("/", (req, res) => {
    res.render("main", {
        title: "Strona Główna"
  });
});

app.get("/card_db", (req, res) => {
    res.render("card_db", {
        title: "Wyszkukiwarka kart"
  });
});

app.get("/card_db/search", (req, res) => {
  const cardName = req.query.name;
  res.redirect(`/card_db/${encodeURIComponent(cardName)}`);
});


app.get("/card_db/:name", async (req, res) => {
  const cardName = req.params.name;

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

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch YGO card data" });
  }
});



app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});