import {useState} from 'react';

interface FilmProps {
  // poster zawiera scieżke w typie string do pliku ze zdjeciem w folderze public
  poster: string;

  // tytuł filmu w typie string
  title: string;

  // rok wydania filmu w typie number
  releaseYear: number;

  // ocena filmu w typie number
  rating: number;
}

var movies:FilmProps[] = 
[
  {poster:"StarWars.jpg", title:"Star Wars: Zemsta Sithów", releaseYear:2005, rating:9},
  {poster:"ChlopakiNiePlacza.jpg", title:"Chłopaki nie płaczą", releaseYear:2000, rating:10},
  {poster:"Lalka.jpg", title:"Lalka", releaseYear:2026, rating:5},
]

movies.sort((a,b) => {
  const titleA = a.title.toUpperCase();
  const titleB = b.title.toUpperCase(); 
  if (titleA < titleB) {
    return -1;
  }
  if (titleA > titleB) {
    return 1;
  }

  return 0;
});

const newMovies:FilmProps[] = movies.filter(movie => movie.releaseYear >= 2010);

interface FilmContainerProps {
  // czy wyświetlać tylko nowe filmy
  newerMovies: boolean;
}

interface BookProps {
  // cover zawiera scieżke w typie string do pliku ze zdjeciem w folderze public
  cover: string;

  // tytuł książki w typie string
  title: string;

  // rok wydania książki w typie number
  releaseYear: number;

  // liczba stron książki w typie number
  pages: number;
}

interface BookContainerProps {
  //czy wyświetlać posortowane książki
  sorted: boolean;
}

var books:BookProps[] =
[
  {cover:"Chlopi.jpg", title:"Chłopi", releaseYear:1904, pages:350},
  {cover:"Dziady.jpg", title:"Dziady", releaseYear:1822, pages:600},
  {cover:"ZbrodniaKara.jpg", title:"Zbrodnia i kara", releaseYear:1866, pages:500},
  
]

const sortedBooks:BookProps[] = [...books].sort((a,b) => b.releaseYear - a.releaseYear);

interface AlbumProps {
  //
  cover: string;

  //
  title: string;

  //
  artist: string;

  //
  genre: string;

  // rok wydania albumu w typie number
  releaseYear: number;

  // lista utworów w typie TrackProps[]
  tracks: TrackProps[];

}

interface AlbumContainerProps {
  // czy wyświetlac album o największej liczbie utworów
  biggest: boolean;
}

interface TrackProps {
  // nazwa utworu w typie string
  name: string;

  // długość utworu w typie string
  length: string;
}

var albums:AlbumProps[] =
[
  {
    cover:"LinkinPark.jpg",
    title:"Minutes to Midnight",
    artist:"Linkin Park",
    genre:"Rock",
    releaseYear:2007,
    tracks:[
      { name: "Wake", length: "1:40" },
      { name: "Given Up", length: "3:09" },
      { name: "Leave Out All the Rest", length: "3:29" },
      { name: "Bleed It Out", length: "2:44" },
      { name: "Shadow of the Day", length: "4:49" },
      { name: "What I've Done", length: "3:25" },
      { name: "Hands Held High", length: "3:53" },
      { name: "No More Sorrow", length: "3:41" },
      { name: "Valentine's Day", length: "3:16" },
      { name: "In Between", length: "3:16" },
      { name: "In Pieces", length: "3:38" },
      { name: "The Little Things Give You Away", length: "6:23" },
        ],
  },

  {
        cover:"Eminem.jpg",
        title:"The Eminem Show",
        artist:"Eminem",
        genre:"hip-hop",
        releaseYear:2002,
        tracks:[
          { name: "Curtains Up (Skit)", length: "0:29" },
          { name: "White America", length: "5:24" },
          { name: "Business", length: "4:11" },
          { name: "Cleanin' Out My Closet", length: "4:57" },
          { name: "Square Dance", length: "5:23" },
          { name: "The Kiss (Skit)", length: "1:15" },
          { name: "Soldier", length: "3:46" },
          { name: "Say Goodbye Hollywood", length: "4:32" },
          { name: "Drips", length: "4:45" },
          { name: "Without Me", length: "4:50" },
          { name: "Paul Rosenberg (Skit)", length: "0:22" },
          { name: "Sing for the Moment", length: "5:39" },
          { name: "Superman", length: "5:50" },
          { name: "Hailie's Song", length: "5:20" },
          { name: "Steve Berman (Skit)", length: "0:33" },
          { name: "When the Music Stops", length: "4:29" },
          { name: "Say What You Say", length: "5:09" },
          { name: "'Till I Collapse", length: "4:57" },
          { name: "My Dad's Gone Crazy", length: "4:27" },
          { name: "Curtains Close (Skit)", length: "1:01" },
        ]
  },

    {
        cover:"Skillet.jpg",
        title:"Awake",
        artist:"Skillet",
        genre:"rock",
        releaseYear:2009,
        tracks:[]
  },

  
]

const biggestAlbum = albums.filter(
  album => album.tracks.length === Math.max(...albums.map(album => album.tracks.length))
);

function Film({poster, title, releaseYear, rating}: FilmProps) {
  return (
    <div className="border-5 card text-bg-dark text-center h-100" onClick={() => {console.log(`Wybrano film: ${title}`)}}>
      <img src={poster} className="card-img-top" alt={title}/>
      <div className="card-body">
      <b className="card-text">{rating >= 8 ? "Polecane" : ""}</b>
      <h2 className="card-title">{title}</h2>
      <p className="card-text">{releaseYear}</p>
      <button className="btn btn-light" onClick={(e) => {e.stopPropagation(); console.log(`Nacisąłeś przycisk dla filmu: ${title}`)}}>Pokaż szczegóły</button>
      <p className="card-text">Ocena: {rating}/10</p> 
      </div>
    </div>
  );
}

function FilmContainer({newerMovies}: FilmContainerProps) {
  const [showFilms, setShowFilms] = useState(true);
  const [textValue, setTextValue] = useState("");
  return (
    <div className="mb-4">
      <b onClick={() => setShowFilms(!showFilms)}>{newerMovies ? (showFilms ? "Filmy wydane po 2010⏷" : "Filmy wydane po 2010⏵") : (showFilms ? "Filmy⏷" : "Filmy⏵")}</b>
      {showFilms && (
      <div className="row g-3 mt-1">
      <input id="movie-search" type="text" className="form-control" placeholder="Wpisz tytuł" onChange={(e) => { setTextValue(e.target.value); console.log(e.target.value);}} />
      {(newerMovies ? newMovies : movies).map((movie,index) => (
        <div className="col-12 col-md-6 col-lg-4" key={index}>
          <Film {...movie} />
        </div>
       ))}
      </div>)}
    </div>
  );
}

function Book({cover, title, releaseYear, pages}: BookProps) {
  return(
    <div className="border-5 card text-bg-dark text-center">
      <img src={cover} className="card-img-top" alt={title} />
      <b className="card-text">{releaseYear < 2000 ? "Klasyka" : ""}</b>
      <h2 className="card-title">{title}</h2>
      <h3 className="card-text">{pages} stron</h3>
      <p className="card-text">{releaseYear}</p>
    </div>
  );
}

function BookContainer({sorted}: BookContainerProps) {
  const [showBooks, setShowBooks] = useState(true);
  const [textValue, setTextValue] = useState("");
  return (
      <div>
      <b onClick={() => setShowBooks(!showBooks)}>{sorted ? (showBooks ? "Książki posortowane według roku wydania⏷" : "Książki posortowane według roku wydania⏵") : (showBooks ? "Książki⏷" : "Książki⏵")}</b>
      
      {showBooks && (
      <div className="row g-3 mt-1">
      <input id="book-search" type="text" className="form-control" placeholder="Wpisz tytuł" onChange={(e) => { setTextValue(e.target.value); console.log(e.target.value);}} />
      {(sorted ? sortedBooks : books).map((book,index) => (
        <div className="col-12 col-md-6 col-lg-4" key={index}>
          <Book key={index} {...book} />
        </div>
      ))}

      </div>)}
    </div>
  );
}

function handleSongClick(songName:string , albumName:string)
{
  console.log(`Wybrano utwór: ${songName} z albumu: ${albumName}`);
}

function Track({name, length}: TrackProps) {
  return (
      <>
      <td className="text-start">{name}</td>
      <td className="text-end">{length}</td>
      </>
    );
  }

function Album({cover, title, artist, genre, releaseYear, tracks}: AlbumProps) {
  return (
    <div className="border-5 card text-bg-dark text-center">
      <img className="card-img-top" src={cover} alt={title} />
      <h2 className="card-">{title}</h2>
      <b className="card-text">{artist}</b>
      <h3 className="card-text">{genre}</h3>
      <p className="card-text">{releaseYear}</p>
      {tracks.length === 0 
      ?(
      <div className="alert alert-dark" role="alert">
        Brak utworów w albumie
      </div>
      )
     :(
      <div className="table-responsive" style={{ maxHeight: "300px", overflowY: "auto" }}>
      <table className="table  table-dark table-striped table-hover">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col" className="text-start">Nazwa</th>
          <th scope="col" className="text-end">Długość</th>
        </tr>
        </thead>
        <tbody>
          {tracks.map((track, index) => (
              <tr onClick={() => {handleSongClick(track.name, title);}}>
                <th scope="row" key={index}>{index + 1}</th>
                <Track {...track} />
              </tr>
          ))}
        </tbody>
      </table>
      </div>
      )}

    </div>  
  );
}

function AlbumContainer({biggest}: AlbumContainerProps) {
  const [showAlbums, setShowAlbums] = useState(true);
  const [textValue, setTextValue] = useState("");
  return(
      <div>
      <b onClick={() => setShowAlbums(!showAlbums)}>{biggest ? (showAlbums ? "Album z największą liczbą utworów⏷" : "Album z największą liczbą utworów⏵") :(showAlbums ? "Albumy⏷" : "Albumy⏵")}</b>
      {showAlbums && (
      <div className="row g-3 mt-1">
      <input id="album-search" type="text" className="form-control" placeholder="Wpisz tytuł" onChange={(e) => { setTextValue(e.target.value); console.log(e.target.value);}} />
      {(biggest ? biggestAlbum : albums).map((album,index) => (
        <div className="col-12 col-md-6 col-lg-4">
        <Album key={index} {...album} />
        </div>
      ))}
      </div>)}
    </div>
  );
}

function App() {
  return (
    <div className="container">
    <FilmContainer newerMovies={false} />
    <BookContainer sorted={false} />
    <AlbumContainer biggest={false} />
    <FilmContainer newerMovies={true} />
    <BookContainer sorted={true} />
    <AlbumContainer biggest={true} />
    </div>
  )
}

export default App