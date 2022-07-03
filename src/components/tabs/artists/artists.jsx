import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { CurrentMusicListAtom } from "../../../atoms/currentMusicList.atom";
import { CurrentSongIdAtom } from "../../../atoms/currentSongId.atom";
import { HeaderBackFunctionAtom } from "../../../atoms/headerBackFunction.atom";
import { SongsAtom } from "../../../atoms/songs.atom";
import styles from "./artists.module.css";

export function ArtistsComponent() {
  const songs = useRecoilValue(SongsAtom);
  const [currentSongId, setCurrentSongId] = useRecoilState(CurrentSongIdAtom);

  const setHeaderOnReturn = useSetRecoilState(HeaderBackFunctionAtom);

  const setCurrentMusicList = useSetRecoilState(CurrentMusicListAtom);

  const [currentArtist, setCurrentArtist] = useState("");
  const [artists, setArtists] = useState({});

  useEffect(() => {
    groupByArtist(songs);
  }, [songs]);

  function handleArtistClick(artist) {
    return () => {
      if (artist === currentArtist) return;

      setCurrentArtist(artist);
      setHeaderOnReturn(() => returnToArtists);
    };
  }

  function handleSongClick(songId) {
    return () => {
      if (songId === currentSongId) return;
      setCurrentSongId(songId);

      const currentMusicListIds = artists[currentArtist].map(({ id }) => id);
      setCurrentMusicList(currentMusicListIds);
    };
  }

  function returnToArtists() {
    setCurrentArtist("");
    setHeaderOnReturn(null);
  }

  function groupByArtist(songs) {
    const filteredArtists = Object.values(songs).reduce((acc, song) => {
      const artist = song.artist;

      if (!acc[artist]) {
        return { ...acc, [artist]: [song] };
      }

      return {
        ...acc,
        [artist]: [...acc[artist], song],
      };
    }, {});

    setArtists(filteredArtists);
  }

  if (!currentArtist) {
    return (
      <div className={styles.artistsContainer}>
        <ul className={styles.artistsList}>
          {Object.keys(artists).map((artist, index) => (
            <li
              className={styles.artistsItem}
              key={artist}
              style={{
                backgroundColor:
                  currentSongId === index ? "black" : "transparent",
              }}
              onClick={handleArtistClick(artist)}
            >
              {artist}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className={styles.artistsContainer}>
      <ul className={styles.artistsList}>
        {artists[currentArtist].map((song, index) => (
          <li
            className={styles.artistsItem}
            key={song.title}
            style={{
              backgroundColor:
                currentSongId === song.id ? "black" : "transparent",
            }}
            onClick={handleSongClick(song.id)}
          >
            {song.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
