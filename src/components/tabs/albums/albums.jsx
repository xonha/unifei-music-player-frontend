import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { CurrentMusicListAtom } from "../../../atoms/currentMusicList.atom";
import { CurrentSongIdAtom } from "../../../atoms/currentSongId.atom";
import { HeaderBackFunctionAtom } from "../../../atoms/headerBackFunction.atom";
import { SongsAtom } from "../../../atoms/songs.atom";
import styles from "./albums.module.css";

export function AlbumsComponent() {
  const [albums, setAlbums] = useState({});
  const [currentAlbum, setCurrentAlbum] = useState("");

  const songs = useRecoilValue(SongsAtom);
  const [currentSongId, setCurrentSongId] = useRecoilState(CurrentSongIdAtom);

  const setHeaderOnReturn = useSetRecoilState(HeaderBackFunctionAtom);

  const setCurrentMusicList = useSetRecoilState(CurrentMusicListAtom);

  useEffect(() => {
    groupSongsByAlbum(songs);
  }, [songs]);

  function handleAlbumClick(album) {
    return () => {
      if (album === currentAlbum) return;

      setCurrentAlbum(album);
      setHeaderOnReturn(() => returnToAlbums);
    };
  }

  function handleSongClick(songId) {
    return () => {
      if (songId === currentSongId) return;
      setCurrentSongId(songId);

      const currentMusicListIds = albums[currentAlbum].map(({ id }) => id);
      setCurrentMusicList(currentMusicListIds);
    };
  }

  function returnToAlbums() {
    setCurrentAlbum("");
    setHeaderOnReturn(null);
  }

  function groupSongsByAlbum(songs) {
    const filteredAlbums = Object.values(songs).reduce((acc, song) => {
      const album = song.album;

      if (!acc[album]) {
        return { ...acc, [album]: [song] };
      }

      return {
        ...acc,
        [album]: [...acc[album], song],
      };
    }, {});

    setAlbums(filteredAlbums);
  }

  if (!currentAlbum) {
    return (
      <div className={styles.albumsContainer}>
        <ul className={styles.albumsList}>
          {Object.keys(albums).map((album, index) => (
            <li
              className={styles.albumsItem}
              key={album}
              style={{
                backgroundColor:
                  currentSongId === index ? "black" : "transparent",
              }}
              onClick={handleAlbumClick(album)}
            >
              {album}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className={styles.albumsContainer}>
      <ul className={styles.albumsList}>
        {albums[currentAlbum].map((song) => (
          <li
            className={styles.albumsItem}
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
