import { useEffect, useRef, useState } from "react";
import styles from "./player.module.css";
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsFillSkipStartCircleFill,
  BsFillSkipEndCircleFill,
} from "react-icons/bs";
import { useRecoilState, useRecoilValue } from "recoil";
import { SongsAtom } from "../../atoms/songs.atom";
import { CurrentSongIdAtom } from "../../atoms/currentSongId.atom";
import { CurrentMusicListAtom } from "../../atoms/currentMusicList.atom";

export const Player = () => {
  const [songs, setSongs] = useRecoilState(SongsAtom);
  const currentMusicList = useRecoilValue(CurrentMusicListAtom);
  const [currentSongId, setCurrentSongId] = useRecoilState(CurrentSongIdAtom);

  const [isPlaying, setIsPlaying] = useState(false);

  const audioElement = useRef();
  const clickRef = useRef();

  useEffect(() => {
    isPlaying ? audioElement.current.play() : audioElement.current.pause();
  }, [currentSongId, audioElement, isPlaying]);

  // reset the music progress when the song changes
  useEffect(() => {
    setSongs((currentSongs) => {
      if (!currentSongs) return;
      return {
        ...currentSongs,
        [currentSongId]: {
          ...currentSongs[currentSongId],
          progress: 0,
        },
      };
    });
  }, [setSongs, currentSongId]);

  function PlayPause() {
    setIsPlaying(!isPlaying);
  }

  function checkWidth(e) {
    let width = clickRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;
    const progressBar = (offset / width) * 100;
    audioElement.current.currentTime =
      (progressBar / 100) * songs[currentSongId].duration;
  }

  function skiptoNext() {
    const firstSongId = currentMusicList[0];
    const lastSongId = currentMusicList[currentMusicList.length - 1];
    const songsLength = currentMusicList.length;

    const currentMusicIndex = currentMusicList.indexOf(currentSongId);

    if (!songsLength) return;

    if (currentSongId === lastSongId) {
      setCurrentSongId(firstSongId);
    } else setCurrentSongId(currentMusicList[currentMusicIndex + 1]);
  }

  function skipBack() {
    const firstSongId = currentMusicList[0];
    const lastSongId = currentMusicList[currentMusicList.length - 1];
    const songsLength = currentMusicList.length;

    const currentMusicIndex = currentMusicList.indexOf(currentSongId);

    if (!songsLength) return;

    if (currentSongId === firstSongId) {
      setCurrentSongId(lastSongId);
    } else setCurrentSongId(currentMusicList[currentMusicIndex - 1]);
  }

  function onPlaying() {
    const newSongs = {
      ...songs,
      [currentSongId]: {
        ...songs[currentSongId],
        progress:
          (audioElement.current.currentTime / audioElement.current.duration) *
          100,
      },
    };
    setSongs(newSongs);
  }

  return (
    <>
      <div className={styles.player_container}>
        <div className={styles.title}>
          <p>{songs[currentSongId].title}</p>
        </div>
        <div className={styles.navigation}>
          <div
            className={styles.navigation_wrapper}
            onClick={checkWidth}
            ref={clickRef}
          >
            <div
              className={styles.seek_bar}
              style={{ width: `${songs[currentSongId].progress + "%"}` }}
            ></div>
          </div>
        </div>
        <div className={styles.controls}>
          <BsFillSkipStartCircleFill
            className={styles.btn_action}
            onClick={skipBack}
          />
          {isPlaying ? (
            <BsFillPauseCircleFill
              className={`${styles.btn_action}  ${styles.pp}`}
              onClick={PlayPause}
            />
          ) : (
            <BsFillPlayCircleFill
              className={`${styles.btn_action} ${styles.pp}`}
              onClick={PlayPause}
            />
          )}
          <BsFillSkipEndCircleFill
            className={styles.btn_action}
            onClick={skiptoNext}
          />
        </div>
      </div>
      <audio
        src={songs[currentSongId].public_url}
        ref={audioElement}
        onTimeUpdate={onPlaying}
      />
    </>
  );
};
