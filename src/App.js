import './main.css';
import { Player } from './components/player/player';
import { Playlist } from './components/playlist/playlist';
import { Songs } from './songs';
import { useRef, useState, useEffect } from 'react';

export function App() {
	const [songs, setSongs] = useState(Songs);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentSong, setCurrentSong] = useState(songs[0]);

	const audioElement = useRef();

	useEffect(() => {
		isPlaying ? audioElement.current.play() : audioElement.current.pause();
	}, [isPlaying]);

	function getCurrentSongIndex() {
		return songs.findIndex((song) => song.title === currentSong.title);
	}

	function onPlaying() {
		setCurrentSong({
			...currentSong,
			progress:
				(audioElement.current.currentTime / audioElement.current.duration) *
				100,
			length: audioElement.current.duration,
		});
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
					src={currentSong.url}
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
