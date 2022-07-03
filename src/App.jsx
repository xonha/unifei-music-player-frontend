import { useEffect } from "react";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import { CurrentSongIdAtom } from "./atoms/currentSongId.atom";
import { HeaderBackFunctionAtom } from "./atoms/headerBackFunction.atom";
import { SelectedTabAtom } from "./atoms/selectedTab.atom";
import { SongsAtom } from "./atoms/songs.atom";
import { Footer } from "./components/footer/footer";
import { Header } from "./components/header/header";
import { Player } from "./components/player/player";
import { Tabs } from "./components/tabs/tabs";
import "./main.css";

export function App() {
  const [songs, setSongs] = useRecoilState(SongsAtom);
  const selectedTab = useRecoilValue(SelectedTabAtom);
  const setCurrentSongId = useSetRecoilState(CurrentSongIdAtom);
  const resetHeaderFunction = useResetRecoilState(HeaderBackFunctionAtom);

  useEffect(() => {
    resetHeaderFunction();
  }, [resetHeaderFunction, selectedTab]);

  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:8000/song");
      const data = await res.json();

      const formattedSongs = formatSongsById(data);

      setSongs(formattedSongs);
      setCurrentSongId(data[0].id);
    })();
  }, [setSongs, setCurrentSongId]);

  function formatSongsById(songs) {
    const formattedSongs = songs.reduce((acc, song) => {
      const songId = song.id;

      return {
        ...acc,
        [songId]: { ...song },
      };
    }, {});

    return formattedSongs;
  }

  if (!songs) {
    return <div>Loading...</div>;
  }

  return (
    <div className="AppWrapper">
      <div className="App">
        <Header />
        <Tabs />

        <div className="Layout">
          <Player />
          <Footer />
        </div>
      </div>
    </div>
  );
}
