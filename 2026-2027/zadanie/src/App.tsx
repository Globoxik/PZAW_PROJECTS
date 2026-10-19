interface FilmProps {
  // poster zawiera scieżke w typie string do pliku ze zdjeciem w folderze public
  poster: string;

  // tytuł filmu w typie string
  title: string;

  // rok wydania filmu w typie number
  releaseYear:number;
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
  name: string

  // długość utworu w typie string
  length: string
}


function Film({poster, title, releaseYear}: FilmProps) {
  return (
    <div className="border">
      <img className="film-img" src={poster} alt={title} />
      <h2>{title}</h2>
      <p style={{ color: 'grey' }}>{releaseYear}</p>
    </div>
  );
}

function Book({cover, title, releaseYear, pages}: BookProps) {
  return(
    <div className="border">
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
      <h2>{artist}, {title}</h2>
      <h3>{genre}</h3>
      <p style={{ color: 'grey' }}>{releaseYear}</p>
      <div className="tracks">
        {/* AI nie zostało użyte do stworzenia pętli, informacja o implementacji pozyskana z dokumentacji Reacta: https://react.dev/learn/rendering-lists */}
        <ol className="track-list">
        {tracks.map((track, index) => (
          <li><Track key={index} name={track.name} length={track.length} /></li>
        ))}
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

        <Film poster="StarWars.jpg" title="Star Wars: Zemsta Sithów" releaseYear={2005} />
        <Film poster="ChlopakiNiePlacza.jpg" title="Chłopaki nie płaczą" releaseYear={2000} />
        <Film poster="Lalka.jpg" title="Lalka" releaseYear={2026} />

      </section>
    </section>

    <section className="book-container">
      <b style={{ fontSize: '30px' }}>Książki</b>

      <section className="books">

        <Book cover="Chlopi.jpg" title="Chłopi" releaseYear={1904} pages={350} />
        <Book cover="Dziady.jpg" title="Dziady" releaseYear={1822} pages={600} />
        <Book cover="ZbrodniaKara.jpg" title="Zbrodnia i kara" releaseYear={1866} pages={500} />

      </section>
    </section>

    <section className="album-container">
      <b style={{ fontSize: '30px' }}>Albumy</b>

      <section className="albums">
      <Album
        cover="LinkinPark.jpg"
        title="Minutes to Midnight"
        artist="Linkin Park"
        genre="Rock"
        releaseYear={2007}
        tracks={[
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
        ]}
      />
      <Album
        cover="Eminem.jpg"
        title="The Eminem Show"
        artist="Eminem"
        genre="hip-hop"
        releaseYear={2002}
        tracks={[
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
        ]}
      />
      </section>
    </section>

    </>
  )
}

export default App