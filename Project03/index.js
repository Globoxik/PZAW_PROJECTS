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

app.get("/card_db/:name", async (req, res) => {
  const cardName = req.params.name;

  try {
    const response = await fetch(
      `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${encodeURIComponent(cardName)}`
    );

    const data = await response.json();

    res.json(data); // return to browser
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch YGO card data" });
  }
});


app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});