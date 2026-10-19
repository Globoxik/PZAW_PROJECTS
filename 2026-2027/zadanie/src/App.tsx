interface FilmProps {
  // poster zawiera scieżke w typie string do pliku ze zdjeciem w folderze public
  poster: string;

  // tytuł filmu w typie stringu
  title: string;

  // rok wydania filmu w typie number
  releaseYear:number;
}

function Film({poster, title, releaseYear}: FilmProps) {
  return (
    <div id="film">
      <img src={poster} alt={title} />
      <h2>{title}</h2>
      <p id="releaseYear">{releaseYear}</p>
    </div>
  );
}

function App() {

  return (
    <>
      <b>Filmy</b>
      <Film poster="StarWars.jpg" title="Star Wars: Zemsta Sithów" releaseYear={2005} />
      <Film poster="ChlopakiNiePlacza.jpg" title="Chłopaki nie płaczą" releaseYear={2000} />
      <Film poster="Lalka.jpg" title="Lalka" releaseYear={2026} />
    </>
  )
}

export default App
