import express from 'express';
const port = 8000;
const my_objects = {
  "Karcianka": {name:"Yu-Gi-Oh!",description:"Moja ulubiona karcianka TCG w którą gram na porządku dziennym"},
  "Komputer":{name:"Laptop HP OMEN 17",description:"Laptop którego używam w moim pokoju"}
};

const app = express();

app.set("view engine", "ejs");

app.use(express.static('public'));

app.get("/", (req, res) => {
  res.render("root", {
    title: "Zbiór wszystkich obecnych obiektów",
    objects: my_objects
  });
});



app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});