import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { CurrentMusicListAtom } from "../../../atoms/currentMusicList.atom";
import { CurrentSongIdAtom } from "../../../atoms/currentSongId.atom";
import { SongsAtom } from "../../../atoms/songs.atom";
import styles from "./songs.module.css";

export function SongsComponent() {
  const songs = useRecoilValue(SongsAtom);
  const [currentSongId, setCurrentSongId] = useRecoilState(CurrentSongIdAtom);
  const setCurrentMusicList = useSetRecoilState(CurrentMusicListAtom);

  useEffect(() => {
    const currentMusicListIds = Object.keys(songs);
    setCurrentMusicList(currentMusicListIds);
  }, [songs, setCurrentMusicList]);

  function handleSongClick(songId) {
    return () => {
      if (songId === currentSongId) return;
      setCurrentSongId(songId);
    };
  }

  return (
    <div className={styles.songsContainer}>
      <ul className={styles.songsList}>
        {Object.values(songs).map((song) => (
          <li
            className={styles.songsItem}
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
