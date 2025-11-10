import express from "express";
const port = 8000;

const my_objects = {
  "Yu-Gi-Oh!": {
    name: "Yu-Gi-Oh!",
    description: "Moja ulubiona karcianka TCG w którą gram na porządku dziennym",
  },
  "Laptop HP OMEN 17": {
    name: "Laptop HP OMEN 17",
    description: "Laptop którego używam w moim pokoju",
  },
};

function hasObject(id) {
  return my_objects.hasOwnProperty(id);
}

function getObject(id) {
  const fixedId = id.replace(/_/g, " ");
  if (hasObject(fixedId)) {
    return { id: fixedId, ...my_objects[fixedId] };
  }
  return null;
}

function addObject(id, obj) {
  my_objects[id] = obj;
}


const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.render("root", {
    title: "Zbiór wszystkich obecnych obiektów",
    objects: Object.entries(my_objects).map(([id, category]) => ({
      id: id.replace(/\s+/g, "_"),
      ...category,
    })),
  });
});

app.get("/:id", (req, res) => {
  const details = getObject(req.params.id);
  if (details != null) {
    res.render("details", {
      title: details.name,
      details,
    });
  } else {
    res.sendStatus(404);
  }
});

app.post("/new", (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).send("Wszystkie pola są wymagane");
  }

  if (hasObject(name)) {
    return res.status(400).send("Obiekt o tej nazwie już istnieje");
  }

  addObject(name, { name, description });
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
