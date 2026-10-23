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

interface TrackProps {
  // nazwa utworu w typie string
  name?: string;

  // długość utworu w typie string
  length?: string;
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
    <div className="border">
      <b className="rec">
        {rating >= 8 ? "Polecane" : ""}
      </b>
      <img className="film-img" src={poster} alt={title} />
      <h2>{title}</h2>
      <p style={{ color: 'grey' }}>{releaseYear}</p>
      <p>Ocena: {rating}/10</p>
    </div>
  );
}

function Book({cover, title, releaseYear, pages}: BookProps) {
  return(
    <div className="border">
      <b className="rec">
        {releaseYear < 2000 ? "Klasyka" : ""}
      </b>
      <img className="book-img"src={cover} alt={title} />
      <h2>{title}</h2>
      <h3>{pages} stron</h3>
      <p style={{ color: 'grey' }}>{releaseYear}</p>
    </div>
  );
}

function Track({name, length}: TrackProps) {
  return (
      <p>{name} - {length}</p>
    );
  }

function Album({cover, title, artist, genre, releaseYear, tracks}: AlbumProps) {
  return (
    <div className="border">
      <img className="album-img"src={cover} alt={title} />
      <h2>{title}</h2>
      <b className="artist">{artist}</b>
      <h3>{genre}</h3>
      <p style={{ color: 'grey' }}>{releaseYear}</p>
      <div className="tracks">
      <ol className={`track-list ${tracks.length === 0 ? "empty" : ""}`}>
        {tracks.length === 0 ? (
          <li>Brak utworów</li>
        ) : (
          tracks.map((track, index) => (
            <li key={index}>
              <Track {...track} />
            </li>
          ))
        )}
      </ol>
      </div>
    </div>  
  );
}


function App() {

  return (
    <>
    <section className="film-container">
      <b style={{ fontSize: '30px' }}>Filmy</b>

      <section className="films">

      {movies.map((movie,index) => (
        <Film key={index} {...movie} />
      ))}

      </section>
    </section>

    <br/>

    <section className="book-container">
      <b style={{ fontSize: '30px' }}>Książki</b>

      <section className="books">

      {books.map((book,index) => (
        <Book key={index} {...book} />
      ))}

      </section>
    </section>

    <br/>

    <section className="album-container">
      <b style={{ fontSize: '30px' }}>Albumy</b>

      <section className="albums">

      {albums.map((album,index) => (
        <Album key={index} {...album} />
      ))}

      </section>
    </section>
    
    <br/>

    <section className="film-container">
        <b style={{ fontSize: '30px' }}>Filmy wydane po 2010</b>

      <section className="films">

      {newMovies.map((newMovie,index) => (
        <Film key={index} {...newMovie} />
      ))}

      </section>
    </section>

    <br/>

    <section className="book-container">
      <b style={{ fontSize: '30px' }}>Książki posortowane według roku wydania</b>

      <section className="books">
      {sortedBooks.map((book,index) => (
        <Book key={index} {...book} />
      ))}

      </section>
    </section>

    <br/>
    
    <section className="album-container">
      <b style={{ fontSize: '30px' }}>Album z największą liczbą utworów</b>

      <section className="albums">

      {biggestAlbum.map((album,index) => (
        <Album key={index} {...album} />
      ))}

      </section>
    </section>
    </>
  )
}

export default App