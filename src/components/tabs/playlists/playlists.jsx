import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { CurrentMusicListAtom } from "../../../atoms/currentMusicList.atom";
import { CurrentSongIdAtom } from "../../../atoms/currentSongId.atom";
import { HeaderBackFunctionAtom } from "../../../atoms/headerBackFunction.atom";
import { SongsAtom } from "../../../atoms/songs.atom";
import styles from "./playlists.module.css";

export function PlaylistsComponent() {
  const [playlists, setPlaylists] = useState({});
  const [currentPlaylistId, setCurrentPlaylistId] = useState("");

  const songs = useRecoilValue(SongsAtom);
  const [currentSongId, setCurrentSongId] = useRecoilState(CurrentSongIdAtom);

  const setHeaderOnReturn = useSetRecoilState(HeaderBackFunctionAtom);
  const setCurrentMusicList = useSetRecoilState(CurrentMusicListAtom);

  useEffect(() => {
    (async () => {
      // TODO: get playlists from server
      const response = await fetch("http://localhost:8000/playlist");
      const responsePlaylists = await response.json();
      const formattedPlaylists = formatPlaylists(responsePlaylists);

      setPlaylists(formattedPlaylists);
    })();
  }, []);

  function handlePlaylistClick(playlistId) {
    return () => {
      if (playlistId === currentPlaylistId) return;

      setCurrentPlaylistId(playlistId);
      setHeaderOnReturn(() => returnToPlaylists);
    };
  }

  function formatPlaylists(responsePlaylists) {
    const formattedPlaylists = responsePlaylists.reduce(
      (acc, responsePlaylist) => {
        const playlistId = responsePlaylist.id;

        const songsFormatted = responsePlaylist.songs.map(({ data }) => {
          return data.id;
        });

        return {
          ...acc,
          [playlistId]: { ...responsePlaylist, songs: songsFormatted },
        };
      },
      {}
    );

    return formattedPlaylists;
  }

  function handleSongClick(songId) {
    return () => {
      if (songId === currentSongId) return;
      setCurrentSongId(songId);

      const currentMusicListIds = playlists[currentPlaylistId].songs;
      setCurrentMusicList(currentMusicListIds);
    };
  }

  function returnToPlaylists() {
    setCurrentPlaylistId("");
    setHeaderOnReturn(null);
  }

  if (!currentPlaylistId) {
    return (
      <div className={styles.playlistsContainer}>
        <ul className={styles.playlistsList}>
          {Object.values(playlists).map((playlist, index) => (
            <li
              className={styles.playlistsItem}
              key={playlist.id}
              style={{
                backgroundColor:
                  currentSongId === index ? "black" : "transparent",
              }}
              onClick={handlePlaylistClick(playlist.id)}
            >
              {playlist.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className={styles.playlistsContainer}>
      <ul className={styles.playlistsList}>
        {playlists[currentPlaylistId].songs.map((songId) => (
          <li
            className={styles.playlistsItem}
            key={songs[songId].title}
            style={{
              backgroundColor:
                currentSongId === songId ? "black" : "transparent",
            }}
            onClick={handleSongClick(songId)}
          >
            {songs[songId].title}
          </li>
        ))}
      </ul>
    </div>
  );
}
