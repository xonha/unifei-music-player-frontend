import './main.css';
import { Player } from './components/player/player';
import { Playlist } from './components/playlist/playlist';
import { useRef, useState, useEffect } from 'react';

export function App() {
	const [songs, setSongs] = useState();
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentSong, setCurrentSong] = useState();

	const audioElement = useRef();

	useEffect(() => {
		fetchSongs();
	}, []);

	useEffect(() => {
		if (!audioElement.current) return;
		isPlaying ? audioElement.current.play() : audioElement.current.pause();
	}, [isPlaying]);

	async function fetchSongs() {
		const res = await fetch('http://0.0.0.0:8000/song');
		const data = await res.json();

		const formattedSongs = data.map((dataSong) => ({
			...dataSong,
			progress: 0,
		}));

		setSongs(formattedSongs);
		setCurrentSong(formattedSongs[0]);
	}

	function getCurrentSongIndex() {
		if (!songs || !currentSong) return;
		return songs.findIndex((song) => song.title === currentSong.title);
	}

	function onPlaying() {
		setCurrentSong({
			...currentSong,
			progress:
				(audioElement.current.currentTime / audioElement.current.duration) *
				100,
			duration: audioElement.current.duration,
		});
	}

	if (!songs || !currentSong) {
		return <div>Loading...</div>;
	}

	return (
		<div className='AppWrapper'>
			<div className='App'>
				<Playlist
					songs={songs}
					currentSongIndex={getCurrentSongIndex()}
					setCurrentSong={setCurrentSong}
					audioElement={audioElement}
				/>
				<audio
					src={currentSong.public_url}
					ref={audioElement}
					onTimeUpdate={onPlaying}
				/>
				<Player
					songs={songs}
					setSongs={setSongs}
					isPlaying={isPlaying}
					setIsPlaying={setIsPlaying}
					audioElement={audioElement}
					currentSong={currentSong}
					setCurrentSong={setCurrentSong}
				/>
			</div>
		</div>
	);
}
