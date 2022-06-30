import './main.css';
import { Player } from './components/player/player';
import { Playlist } from './components/playlist/playlist';
import { useRef, useState, useEffect } from 'react';

export function App() {
	const [songs, setSongs] = useState();
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentSongIndex, setCurrentSongIndex] = useState(0);

	const audioElement = useRef();

	useEffect(() => {
		fetchSongs();
	}, []);

	// keeps the state of the player (playing/paused)
	useEffect(() => {
		if (!audioElement.current) return;
		isPlaying ? audioElement.current.play() : audioElement.current.pause();
	}, [isPlaying]);

	// resets current song progress
	useEffect(() => {
		setSongs((currentSongs) => {
			if (!currentSongs) return;
			return currentSongs.map((song, index) => {
				if (index === currentSongIndex) {
					return {
						...song,
						progress: 0,
					};
				}
				return song;
			});
		});
	}, [currentSongIndex, setSongs]);

	async function fetchSongs() {
		const res = await fetch('http://0.0.0.0:8000/song');
		const data = await res.json();

		const formattedSongs = data.map((dataSong) => ({
			...dataSong,
			progress: 0,
		}));

		setSongs(formattedSongs);
	}

	function onPlaying() {
		const newSongs = songs.map((song, index) => {
			if (index === currentSongIndex) {
				return {
					...song,
					progress:
						(audioElement.current.currentTime / audioElement.current.duration) *
						100,
				};
			}
			return song;
		});
		setSongs(newSongs);
	}

	if (!songs) {
		return <div>Loading...</div>;
	}

	return (
		<div className='AppWrapper'>
			<div className='App'>
				<Playlist
					songs={songs}
					currentSongIndex={currentSongIndex}
					setCurrentSongIndex={setCurrentSongIndex}
				/>
				<audio
					src={songs[currentSongIndex].public_url}
					ref={audioElement}
					onTimeUpdate={onPlaying}
				/>
				<Player
					songs={songs}
					setSongs={setSongs}
					isPlaying={isPlaying}
					setIsPlaying={setIsPlaying}
					audioElement={audioElement}
					currentSongIndex={currentSongIndex}
					setCurrentSongIndex={setCurrentSongIndex}
				/>
			</div>
		</div>
	);
}
